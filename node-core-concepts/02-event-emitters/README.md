# Event Emitter = A powerful and beautiful JS object given to us by Node.js

```js
const EventEmitter = require("node:events");

class Emitter extends EventEmitter {}

const emitter = new Emitter();
emitter.on("foo", () => console.log("foo occurred"));
emitter.emit("foo");
```

- It has nothing to do with C++, asynchronous nature, libuv, OS etc. When `emit(event)` is invoiced no command is issued to any OS or libuv at all.
- It is just a pattern written in form of big master object in JS by Node.js and given to us to write more readable and managable code.

```js
{
    'event1': [() => {}. (arg1) => {}, (arg1, arg2) => {}] // array of handlers
    'event2': [() => {}. (arg1) => {}, (arg1, arg2) => {}]
    'event3': [() => {}. (arg1) => {}, (arg1, arg2) => {}]
    'event4': [() => {}. (arg1) => {}, (arg1, arg2) => {}]
}
```

- `on(event)` method register (just pushes a) handler in array against an event.
- `once(event)` method register handler in array against an event to be executed once only. After first execution, that handler will be removed.
- `emit(event, ...args)` just invokes all registered handlers against the event synchronously in a loop with args passed to each handler.

> Operating system is also event driven in nature. It doesn't allocate a resource for listening to key presses. Instead, it keeps working, and interrupts on keypresses to handle those asynchronously which is more efficient and makes sense.
