# Javascript on Server

- After NodeJS, the full stack development become easier using just single developer.
- NodeJS enable us to write javascript on server side also. Although, NodeJS is not entirely written only in JS. It has also a lot of part written in C++ Language.
- Even Chrome's V8 JS Engine is also just a C++ program which is used to execute JS code [V8 Github](https://github.com/v8/v8) :o.
- [V8](https://v8.dev) JS Engine is not a physical machine or any motor, but a complex code majorily written in C++ Language.

![popular-js-engines](/assets/2024-11-06-11-21-55.png)

- Behind the scenes, JS code is converted to Machine Code using JS Engine.

> V8 can be embedded into any C++ application. This feature led to invention of NodeJS. At the end of the day, [NodeJS](https://github.com/nodejs/node) is also a C++ application with V8 embedded into it.

#### If V8 can execute JS code, then what was the need of NodeJS invention ?

![node-js](/assets/2024-11-06-11-36-23.png)

- There is something known as [ECMAScript](https://ecma-international.org/publications-and-standards/standards/ecma-262/) which is a standard for many scripting languages such as JavaScript, JScript, and ActionScript etc.
- There are a lot of JS Engines for different browsers, so JS has to follow some standard guidelines so that, every JS Engine can execute JS code in same way.
- JS Engine is just responsible for understanding JS code and converting it to machine code. It helps microprocessors like x86, ARM64 etc. to understand our JS code.

NodeJS has a lot more super powers written in JS along with V8 JS Engine which we will discuss in further episodes. For example, it knows how to connect to filesystem, databases etc. JS Engine can't do it.

> That's why NodeJS is called JS runtime as it runs JS code and has many superpowers baked in.

![different-types-of-code](/assets/2024-11-06-18-59-07.png)

We should appreciate while writing each line of code, that how much is written for us to make our life easier and is even open sourced by great developers. How we just need to write very simple code, and behind the scenes how complex things are already handled for us.
