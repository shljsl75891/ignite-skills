# Libuv - The Genie of Node.js

![](/assets/2024-11-20-09-44-39.png)

> Remember ? Node.js has an event driven architecture and asynchronous I/O capability.

- The libuv is responsible for asynchronous non-blocking I/O capability.
- It played very important role in reaching Node.js to where it is now.

#### What is Libuv - Unicorn Velociraptor ?

- It is a multi-platform C library with a focus on making asynchronous I/O simple.
- It is written in C because it is very easy and performant for a low level language to interact with OS for I/O operations.
- It has many features like Thread pool, Event Loop, Queues and many more...

#### JS Engine

- As we know, **_Javascript is synchronous and single threaded language._** It means JS Engine always runs on a single thread and executes the JS code line by line synchronously.
- JS Engine loves <3 to execute synchronous code in fraction of milliseconds. But, it hates waiting for any asynchronous tasks to be completed before proceeding further.
- This synchronous nature has limitations. Our server can handle only 1 request at a time, not multiple requests simulatenously using just JS Engine.
- The single thread will always be blocked while processing one request in that scenario. It can't proceed further to next line of code until previous's execution is completed.
- It has features like Call Stack for executing JS code, Memory Heap for storing variables and functions, Optimizing compilers for performant execution.
- It has garbage collector which automatically handles allocation and deallocations of memory for unused variables and functions.

In other programming languages, code chunks can be executed using multiple threads at same time. But, this can't be done by JS Engine. But, **Libuv** makes Node.js capable of handling such asynchronous tasks very easily in parallel to synchronous execution of code.

#### How Node.js is capable of asynchronous I/O ?

![](/assets/2024-11-20-09-56-03.png)

- When JS Engine encounters any asynchronous code while executing, it just offloads that task to libuv and let it do its magic.
- Like in chess, JS Engine = King and Libuv = Queen. It is an unsung hero in Node.js. It just takes callback of asynchronous tasks, and return them with data required after task is completed.
- The asynchronous tasks will take their own time to be completed while JS Engine will be chilling once synchronous code is executed completely.
- Libuv handles all asynchronous tasks parallely and efficiently. It registers them, executes them and returns the callback function with response of asynchronous tasks.
- The returned callback functions will then be executed by JS Engine synchronously. 
- The Libuv will return callback functions only when after JS Engine's the callstack is empty.

However, there are ways also for such asynchronous tasks to be handled synchronously. It will be offloaded to libuv, but JS Engine will wait for results before proceeding further. These equivalent corresponding APIs will have no parameter for callback. 

```js
// Synchronous - Blocks main single thread
fs.readFileSync("./file.txt", "utf-8"); // They must be avoided to be used

// Asynchronous - Non blocking nature
fs.readFile("./file.txt", "utf-8", (err, data) => {
  if (err) {
    console.error(err);
  } else {
    console.log(data);
  }
});

/* Both operations will be offloaded of libuv. It's developer's call to handle this synchronously or asynchronously. */
```
