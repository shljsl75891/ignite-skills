# Angular Change Detection

> **Heads up (Angular v21+):** Angular now works without zone.js by default. What we cover here is how zone.js-based apps work — which is still the majority of apps in the wild. [More info](https://angular.dev/guide/zoneless)

---

## How Angular knows when to update

When data changes, Angular does not automatically know about it. It needs a trigger. The process of checking what changed and updating the DOM is called **change detection**.

---

## zone.js — the trigger mechanism

Angular uses [`zone.js`](https://github.com/angular/angular/tree/main/packages/zone.js) to watch for activity in the app: button clicks, timers, HTTP requests. When any of these occur, zone.js notifies Angular to run change detection.

---

## Default behavior — checking everything

![](/assets/2026-06-30-21-08-51.png)

When Angular runs change detection, it checks **every component** in the app — not just the one where something changed. It compares values in each template and updates the DOM where anything changed.

```
User clicks a button
     ↓
zone.js notifies Angular
     ↓
Angular checks every component
     ↓
Updates the DOM where values changed
```

---

## Template expressions run on every check

Every value shown in a template — via `{{ }}` or property binding — is re-evaluated on every change detection run. If that value comes from a function or getter, that code runs every time.

```typescript
// Runs on every change detection cycle, even for unrelated events
get activeUsers() {
  return this.users.filter(u => u.active).map(u => u.name).join(', ');
}
```

Keep template expressions simple. Pipes are the exception — Angular caches their results and only reruns them when the input actually changes.

---

## Double-checking in dev mode

In development, Angular runs change detection **twice** after every event to catch values that change between checks. If a getter returns different values on each run, Angular throws:

```
ExpressionChangedAfterItHasBeenCheckedError
Previous value: '0.73'. Current value: '0.21'
```

This only happens in dev mode. When this error appears, it almost always points to a real bug — something is changing a value after Angular has already read it.

---

## Zone pollution — unnecessary check triggers

Zone.js watches every async operation, including ones that never change any UI data. A timer that only logs to the console still triggers a full change detection run. This is called **zone pollution**.

Inject `NgZone` and use `runOutsideAngular` to wrap code that should not trigger change detection:

```typescript
import { Component, OnInit, NgZone, inject } from "@angular/core";

export class CounterComponent implements OnInit {
  private zone = inject(NgZone);

  ngOnInit() {
    setTimeout(() => {
      this.count = 0; // Angular needs to know about this
    }, 4000);

    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        console.log("timer expired"); // Angular does not need to know about this
      }, 5000);
    });
  }
}
```

The second timer fires and logs without triggering change detection at all.

---

## OnPush — opt a component out of default checking

`OnPush` tells Angular to skip a component during change detection unless something specific happens to it.

```typescript
import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagesComponent {}
```

Angular will only check an OnPush component when:

1. An event fires inside that component or one of its children
2. An `@Input()` value changes
3. Change detection is triggered manually via `ChangeDetectorRef`
4. A signal read in the template changes

For example, if `MessagesComponent` and `CounterComponent` sit side by side, enabling OnPush on messages means that clicking the counter no longer causes Angular to check the messages component at all.

---

### Events bubble up — apply OnPush in the right place

An event inside an OnPush component still bubbles up through parent components to the root. Typing in a text box inside `MessagesComponent` can still trigger checks on `CounterComponent` above it.

To prevent this, apply OnPush to the component that should be _protected_ from unnecessary checks — not the one where the event originates.

---

### OnPush + shared services — where things silently break

If `MessagesListComponent` reads from a shared service and has OnPush enabled, adding a message through the service can cause the component to never update:

```
MessagesListComponent is OnPush. A message was just saved:

  ✗ No event inside this component
  ✗ No @Input() changed
  ✗ Not triggered manually
  ✗ No signal changed (plain array, not a signal)

  → Angular skips this component → message never appears on screen
```

The component's data is correct, but the screen never refreshes. This only happens when OnPush is combined with a plain (non-signal) service. If the service uses a signal instead, trigger #4 fires automatically.

---

### Fixing it manually — `BehaviorSubject` + `markForCheck`

To handle non-signal services, use `BehaviorSubject` from RxJS to emit new values, and `ChangeDetectorRef.markForCheck()` to tell Angular to re-check the component.

In the service:

```typescript
import { BehaviorSubject } from "rxjs";

export class MessagesService {
  private messages: string[] = [];
  messages$ = new BehaviorSubject<string[]>([]);

  addMessage(msg: string) {
    this.messages = [...this.messages, msg];
    this.messages$.next([...this.messages]);
  }
}
```

In the component:

```typescript
import {
  Component,
  OnInit,
  inject,
  ChangeDetectorRef,
  DestroyRef,
} from "@angular/core";

export class MessagesListComponent implements OnInit {
  private messagesService = inject(MessagesService);
  private cdRef = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);

  messages: string[] = [];

  ngOnInit() {
    const sub = this.messagesService.messages$.subscribe((messages) => {
      this.messages = messages;
      this.cdRef.markForCheck();
    });

    this.destroyRef.onDestroy(() => sub.unsubscribe()); // prevents stale subscriptions after the component is removed
  }
}
```

The `$` suffix on `messages$` is a naming convention for RxJS observables — not required, but widely used.

---

### The async pipe — the shorter path

Angular's built-in `async` pipe replaces all of the manual subscription code. It subscribes to an observable, reads values as they arrive, triggers change detection, and cleans up automatically when the component is removed.

```typescript
messages$ = this.messagesService.messages$;
```

```html
<li *ngFor="let msg of messages$ | async">{{ msg }}</li>
```

Import `AsyncPipe` from `@angular/common` and add it to the component's `imports` array. Use the manual approach when the subscription needs to do more than display values directly in the template — such as transforming, storing, or combining data.

---

## Going zoneless

Zone.js watches everything — timers, HTTP, browser events — and tells Angular "something might have changed, go check." It does not know _what_ changed, just that _something_ did. That is why Angular checks every component by default.

Signals change this. Because `signal()` is an Angular function, Angular knows exactly when a signal's value changes and which templates are reading it. It checks only those components. Event bindings work the same way — Angular handles them natively, so it already knows when they fire.

If all changing data is managed through signals, zone.js is no longer needed. The benefits are a smaller app bundle (zone.js code is removed), more precise updates (only components that read a changed signal are re-checked), and fewer background listeners.

---

### The rule that makes zoneless work

Any async operation that should update the screen must update a signal. A plain property changed inside a `setTimeout` is invisible to Angular in zoneless mode.

```typescript
// Will NOT update the screen in zoneless mode
setTimeout(() => {
  this.count = 0; // plain property — Angular cannot see this change
}, 4000);

// Will work
setTimeout(() => {
  this.count.set(0); // signal — Angular is notified
}, 4000);
```

---

### How to enable zoneless

**Angular v21+:** zoneless is the default for new projects created with `ng new`. Nothing to configure.

**Angular v18–v20:** two steps.

Remove `zone.js` from `polyfills` in `angular.json`:

```json
"polyfills": []
```

Add the provider in `main.ts`:

```typescript
import { provideZonelessChangeDetection } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";

bootstrapApplication(AppComponent, {
  providers: [provideZonelessChangeDetection()],
});
```

> In Angular 18 the provider was called `provideExperimentalZonelessChangeDetection()`. It was renamed to `provideZonelessChangeDetection()` in later versions.

With that, zone.js is completely removed. Change detection runs only when signals change or when Angular-handled events fire.

---

**References**

- [zone.js source (Angular monorepo)](https://github.com/angular/angular/tree/main/packages/zone.js)
- [Zone pollution — Angular docs](https://angular.dev/best-practices/zone-pollution)
- [Zoneless Angular — Angular docs](https://angular.dev/guide/zoneless)
