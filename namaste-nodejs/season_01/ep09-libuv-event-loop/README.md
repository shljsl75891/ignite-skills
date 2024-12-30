# Libuv - Event Loop or I/O Loop

As far we understood, there are two most important core things in Node.js:-

1. **V8 JS Engine** for executing synchronous code. It consists of call stack, heap and garbage collector.
2. **libuv** for offloading asynchronous I/O. It consists of event loop, callback queues and thread pool.

##### Callback queues

Meanwhile JS Engine executes the synchronous code, all completed asynchronous tasks's callbacks wait for their turn in these queues.

##### Event Loop

- It is a while semi-infinite loop which keeps checking callstack in JS Engine and callback queues in libuv. Once JS Engine becomes idle, it will quickly give callback to JS Engine for execution.
- In case of race conditions of different type of asynchronous tasks, there is a seperate mechanism to prioritize the callbacks and execute at correct time in correct order.

> Idle JS Engine = Callstack empty = Main thread is free

##### How the event loop orchestrates the flow ?

The event loop works in 4 major phases:-

![](/assets/2024-12-30-13-59-04.png)

- **Timer Phase:** In this, all callbacks of setTimer and setInterval are executed.
- **Poll Phase:** Most of the asynchronous tasks are executed in this pase such as file operations, incoming connections, network requests, crypto operations etc.
- **Check Phase:** In this, all callbacks of setImmediate are executed.
- **Close Phase:** In this, all cleanup and closing connections such as `socket.on('close')` are executed.

Before each phase, the event loop also monitors and prioritize the callbacks of `process.nextTick()` and promises. It is a kind of inner priority cycle which is executed before each phase.

> All of the phases have their own callback queues. This everything is written in C Language in libuv library.

##### Why it is a semi-infinite loop ?

- The implementation of event loop in the browser is very different then that of in Node.js.
- The event loop runs infinitely in the browser and keep checking the callstack as well as microtask and task queues.
- The event loop in Node.js wait in **Poll** phase, if all callback queues will be empty and it comes in IDLE state.
