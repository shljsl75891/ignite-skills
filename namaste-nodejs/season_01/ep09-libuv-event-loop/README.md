# Libuv - Event Loop or I/O Loop

As far we understood, there are two most important core things in Node.js:-

1. **V8 JS Engine** for executing synchronous code. It consists of call stack, heap and garbage collector.
2. **libuv** for offloading asynchronous I/O. It consists of event loop, callback queues and thread pool.

##### Callback queues

Meanwhile JS Engine executes the synchronous code, all completed asynchronous tasks's callbacks wait for their turn in these queues.

##### Event Loop

- It is a while semi-infinite loop which keeps checking callstack in JS Engine and callback queues in libuv. Once JS Engine becomes idle, it will quickly give callback to JS Engine for execution.
- In case of race conditions of different type of asynchronous tasks, there is a seperate mechanism to prioritize the callbacks and execute at correct time in correct order.

> Idle JS Engine = Callstack empty = Main thread is free. One cycle of event loop is called Tick.

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
- The event loop waits only if no callbacks are registered using `setImmediate()`.

### More phases in Node.js [docs](https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick)

There are two more phases - `pending callbacks` and `idle and prepare`.

- **Pending Callbacks:** In this phase, defered I/O callbacks of _poll_ phase are executed. It also execute callbacks for some system operations such as types of TCP errors.
- **Idle and Prepare:** This phases is used internally. It is a kind of preparation for most important _poll_ phase.

There is always a system dependant hard limit in **_libuv_** to avoid starvation of event loop due to a lot of callbacks in **Poll** phase. When event loop enters the poll phase:-

1. If there are callbacks in poll queue, it will start executing them in FIFO manner until queue is exhausted or hard limit is reached.
2. If there are no callbacks in poll queue as well as check queue, then it waits for I/O events until soonest timer expires.
3. If there are no callbacks in poll queue but exists in check queue, then it ends the poll phase and proceed to check phase.

Technically, _poll_ phase controls when the _timers_ should be executed. The I/O callbacks may delay the execution of callbacks of timers. So, `setTimeout()` have trust issues.

> Once the poll queue is empty the event loop will check for timers whose time thresholds have been reached. If one or more timers are ready, the event loop will wrap back to the timers phase to execute those timers' callbacks.

#### TOODs

- Read about [I/O Loop](https://docs.libuv.org/en/v1.x/design.html)
- Try to understand actual implementation [Code](https://github.com/libuv/libuv/blob/v1.x/src/unix/core.c#L425)
- Read from here [process.nextTick](https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick#processnexttick)
