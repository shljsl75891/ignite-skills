# Deep Dive Into JS Engine

On High Level, it contains Call Stack, Memory Heap and Garbage collector.

![](/assets/2024-11-24-15-39-41.png)

- JS Engine is heart <3 of every JS Runtime that exists.
- It is the one which always executes JS Code for us at the end of the day whether in Browser, Node.js, IoT device etc.
- These all different engines has to implement the execution mechanism according to rule mentioned in ECMAScript standards.

#### What's really cool thing in JS ?

_Dynamically Typed Language_ = Javascript

```js
var a = 100;
var b = [1, 2, 3, 4, 5];
var c = [1, "Hello", 3, "World", 5];
var d = "I loves Javascript";
var e = { fName: "Ryan", lName: "Dahl" };
```

_Statically Typed Language_ = C++

```c
int a = 100;
int a[5] = {1, 2, 3, 4, 5};
string d = "I loves C++";
```

This is cool for developers but not for compilers. The compiler has very less information to generate Machine Code.

> C++ is statically typed not to make life of developers difficult but to generate very fast machine code from source code.

##### But then how JS execution is so fast ??

- It is because it is executed using **_JIT (Just in time) compilation_** not **_AOT (Ahead of Time) Compilation_**.
- The JS Source code is not first compiled into machine code and then executed. But the machine code is generated at runtime.
- In C++, the execution of source code needs 2 steps:-
  - Compilation of source code into executable
  - Running the executable.
- In JS, the execution is one step process - `node app.js`.

##### Is JS interpreted language or compiled language ?

|                     Interpreted Programming Languages                      |                         Compiled Programming Languages                          |
| :------------------------------------------------------------------------: | :-----------------------------------------------------------------------------: |
| As soon as code is run, interpreter starts executing the code line by line | The source code is compiled into machine code and then machine code is executed |
|                      Eg. Python, SQL, PHP, Ruby etc.                       |                           Eg. C++, C#, Rust, Go etc.                            |

- Javascript is both interpreted as well as compiled programming language.
- All modern JS Engines have an _Interpreter_ as well as an _Optimising Compiler_.
- In V8, Interpreter = **Ignition** and Optimising compiler = **TurboFan**.

> V8 previously used Crankshaft as compiler. In 1995, with SpiderMonkey, JS was interpreted language. But as JS Engines evolved, JS became JIT Compiled Language

### How JS Engine works ?

> Reference - [JS Conf Video](https://www.youtube.com/watch?v=5nmpokoRaZI)

![](/assets/2024-11-24-17-00-16.png)

- Firstly, the source code is broken down into tokens and then an AST is generated.
- The _Byte code generator_ generates **Byte Code** from AST which is executed by Ignition line by line.
- Ignition also collects profiling data based on code usage and type information. It passes this all information to TurboFan to trigger compilation for hot code after few executions.
- The TurboFan recompile **Hot functions with types information** from previous execution to generate optimized machine code. This process is known as **_Optimization._**
- Next time hot code is executed with same types of inputs, V8 switches to optimized machine code for execution.
- If the type will be changed in any execution, the compiler has to deoptimize, and V8 fallbacks to slow baseline bytecode for execution. This process is known as **_Deoptimization_**

#### Abstract Syntax Tree

- Please visit this [link](astexplorer.net) for exploring more.

![](/assets/2024-11-24-16-39-54.png)

#### Source Code, Byte Code and Machine Code

The machine code differs according to architecture of the CPU.

![](/assets/2024-11-24-16-53-15.png)

We should always construct same types for optimal performance and avoid deoptimization bailout. Statically typed JS is always best for optimizing compiler to do its job.

```js
function load(obj) {
  return obj.x;
}

load({ x: 4, a: 1, b: undefined, c: undefined, d: undefined });
load({ x: 4, a: undefined, b: 2, c: undefined, d: undefined });
load({ x: 4, a: undefined, b: undefined, c: 3, d: undefined });
load({ x: 4, a: undefined, b: undefined, c: undefined, d: 4 });
```

For optimizing compiler in above arguments, all objects will be of same types.

![](/assets/2024-11-24-17-31-55.png)

#### Garbage Collector

- This runs parallely and simultaneously with parsing, JIT Compilation and execution.
- It handles automatic memory allocation for variables, objects and functions.
- It automaically deallocates the memory for unused artifacts for us.
- There are different type of garbage collectors in V8 JS Engine:-
  - Orinoco
  - Oil Pane
  - Scavanger
  - MCompact
- There is an algroithm known as Mark and Sweep Algorithm, which is used for garbage collection.

We should appreciate JS Engine while writting JS code, that how some developers in Google are coding these beautiful things and maintaining as well to make JS fast and evolve the ecosystem. We shouldn't just write code and get the job done.

### TODOs

- Read about Inline caching, Copy Ellision.
- Learn more about [Parsing in V8](https://www.youtube.com/watch?v=Fg7niTmNNLg).
- Read about [Orinoco](https://v8.dev/blog/orinoco-parallel-scavenger).
- Watch this video - [Good parts of JS Engines](https://www.youtube.com/watch?v=5nmpokoRaZI)
