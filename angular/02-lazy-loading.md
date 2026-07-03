# Lazy Loading

Lazy Loading is an optimization technique in Angular that allows you to load feature modules only when they are needed, rather than loading all modules upfront. This reduces the initial bundle size and can significantly improve the initial load time of your application, especially for large applications with many features.

Angular 17+ supports lazy loading through 2 methods:

1. **Route-based Lazy Loading**: This is the most common method where you define routes for your feature modules and load them only when the user navigates to that route. To implement route-based lazy loading, you can use the `loadChildren` or `loadComponent` property in your route configuration. By using this approach, we don't need to import the feature module in the root module, which helps in reducing the initial bundle size. Example of route-based lazy loading:

- `loadComponent` helps in lazy loading a single component. Example:

```ts
// app.routes.ts
import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "dashboard",
    // The component bundle is only downloaded when /dashboard is matched
    loadComponent: () =>
      import("./dashboard/dashboard.component").then(
        (m) => m.DashboardComponent,
      ),
  },
];
```

- If a feature area contains multiple sub-pages, you can move those routes into a separate file and load them together using `loadChildren`

```ts
// app.routes.ts
export const routes: Routes = [
  {
    path: "admin",
    // Loads the entire configuration file on-demand
    loadChildren: () =>
      import("./admin/admin.routes").then((m) => m.ADMIN_ROUTES),
  },
];

// admin/admin.routes.ts
import { Routes } from "@angular/router";
import { AdminOverviewComponent } from "./overview.component";

export const ADMIN_ROUTES: Routes = [
  { path: "", component: AdminOverviewComponent },
  {
    path: "settings",
    loadComponent: () =>
      import("./settings.component").then((m) => m.SettingsComponent),
  },
];
```

2. **Deferrable Views**: Deferrable views, also known as `@defer` blocks, help reduce the initial bundle size of your application by deferring the loading of code that is not strictly necessary for the initial rendering of a page. We can use these deferrable views to load components, directives, and pipes only when they are needed. The code for any components, directives, and pipes inside the @defer block is split into a separate JavaScript file and loaded only when necessary, after the rest of the template has been rendered.

```html
@defer {
<large-component />
}
```

- In order for the dependencies within a @defer block to be deferred, they need to meet two conditions:

1. They must be standalone. Non-standalone dependencies cannot be deferred and are still eagerly loaded, even if they are inside of @defer blocks.
2. They cannot be referenced outside of @defer blocks within the same file. If they are referenced outside the @defer block or referenced within ViewChild queries, the dependencies will be eagerly loaded.

> [!NOTE]
> Only the elements inside the @defer block must be stadalone. Their transitive dependencies can be non-standalone and will be deferred as well.
> Example: If a standalone component uses a non-standalone component, the non-standalone component will be deferred as well, as long as it is not referenced outside of the @defer block.

`@defer` supports different triggers for loading the deferred content. You can use `on` to specify a condition for when the `@defer` block should be loaded.

The available triggers are as follows:

| Trigger       | Description                                                             |
| ------------- | ----------------------------------------------------------------------- |
| `idle`        | Triggers when the browser is idle. Supports an optional timeout.        |
| `viewport`    | Triggers when specified content enters the viewport.                    |
| `interaction` | Triggers when the user interacts with a specified element.              |
| `hover`       | Triggers when the mouse hovers over a specified area.                   |
| `immediate`   | Triggers immediately after non-deferred content has finished rendering. |
| `timer`       | Triggers after a specific duration.                                     |

We can also use the `@defer` block with a `placeholder` to show a placeholder while the deferred content is being loaded.

```html
@defer {
<large-component />
} @placeholder {
<p>Placeholder content</p>
}
```

We can also use `@loading` to show any loading indication while deferred content is being loaded.

```html
@defer {
<large-component />
} @loading {
<img alt="loading..." src="loading.gif" />
} @placeholder {
<p>Placeholder content</p>
}
```
