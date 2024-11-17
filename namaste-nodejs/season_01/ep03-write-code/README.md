# Let's write code

We can write code on Node REPL => **Read Evaluate Print Loop**. It is very similar to browser console.

#### Global Object

The global object in JavaScript is an object which represents the _global scope._ This is not the part of V8 JS Engine.

```js
/**
 * In NodeJS, this don't points to global object just like browser
 */
console.log("Global Object: ", global); // Global Object

console.log("This: ", this); // {}

console.log("Global This: ", globalThis); // Global Object
```

- Every JS Runtime Environment has access to something known as global object, which gives APIs to connect with external environment outside JS Engine.
- In browser, this global object is known as `window`. It gives us access to web APIs such as `setTimeout`, `localStorage`, `alert` etc.
- In NodeJS, this global object is known as `global`.
- In web workers, global object can be accessed using `self`.

`globalThis` was introduced In ECMAScript 2020. It provides a consistent way to access global object regardless of JS Runtime environment.
