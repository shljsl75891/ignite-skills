## DeepDive into NodeJS

#### What is an IIFE ?

> IIFE = Immeditately Invoked Function Expression

It is a JS function which is executed as soon as it is defined.

```js
// IIFE
(function () {
  const msg = "private variable";

  // private function
  function xyz() {}
  console.log("I am IIFE (iffy)");
})();

console.log(msg); // Reference Error: msg is not defined
xyz(); // Reference Error: xyz is not defined
```

- It executes the code immeditately
- It keeps the declared variables and functions private and safe from outside.

> NodeJS also does use them behind the scenes for our modules. It wraps our module into IIFEs and then give to JS Engine for execution. The code we write is not directly passed into JS Engine.

#### `require()` working behind the scenes

- That's how module works in NodeJS.
- NodeJS takes our code, wraps into IIFE and then give to JS Engine to execute.
- That's why, no other modules can access other module's variable and function by default.
- Our modules has access to `require()` and `module.exports` because it is passed as arguments by NodeJS in IIFE.

###### 5 steps mechansim done by this function

1. **_Resolving the module_** - Checks the type of module using extensions such as `.js`, `node:<>`, `.json` etc.
2. **_Loading the module_** - Loading the source code from file system using `fs` according to the type resolved in first step.
3. **_Compiling the module_** - It wraps the source code into IIFE.
4. **_Code Evaluation_** - The IIFE is executed and `module.exports` is return in this step.
5. **_Caching the module_** - The module is cached for further `require()` of same module.

###### Wrapping the module's code into IIFE by NodeJS

- This code snippet belongs to official node.js repository [link](https://github.com/nodejs/node).
- It wraps our module's code into IIFE which is further passed into JS Engine.

```js
/**
 * Add the CommonJS wrapper around a module's source code.
 * @param {string} script Module source code
 */
let wrap = function (script) {
  return Module.wrapper[0] + script + Module.wrapper[1];
};

const wrapper = [
  "(function (exports, require, module, __filename, __dirname) { ",
  "\n});",
];

// Actually is called like below
var args = [self.exports, require, self, filename, dirname];
return compiledWrapper.apply(self.exports, args);
```

So, `this` refers to `module.exports` on module level.
