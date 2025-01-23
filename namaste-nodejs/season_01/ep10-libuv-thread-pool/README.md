# Libuv - Thread Pool

- As we know, JS Engine executes synchronous tasks and offloads all asynchronous tasks to Event loop in Libuv. All asynchronous tasks are handled by different subsytems.
- File operations, Crypto operations, DNS Lookup etc. are heavy blocking operations which are offloaded to **Threadpool**.
- Networking is handled by efficient mechanisms exist in OS Kernels:
  - `epoll` in linux
  - `kqueue` in MacOS
  - `IOCP` in windows.
- Timers are directly managed by libuv using _Min Heap_ and _Priority Queue_ using high resolution system clock.
- Non blocking I/O, Idle and Prepare are also handled without involvement of thread pool.

![](/assets/2025-01-12-11-00-32.png)

## What is Thread pool ?

The thread pool in libuv is a pool of worker threads used to execute blocking or computationally intensive asynchronous tasks such as `fs`, `crypto` methods, `dns.lookup` or user specified input.

> Size of Threadpool => UV_THREADPOOL_SIZE = 4 (Default) and can be changed by modifying the value of this env variable.

## Networking

##### How Node.js handle multiple incoming requests ? Does Node.js uses threadpool for handling those ?

![](/assets/2025-01-23-13-48-27.png)

- No, Node.js doesn't use threadpool for handling multiple incoming requests. It uses power of OS kernel.
- In Networking, we need to handle sockets and their `fds` (file descriptors).
- Writing data in connection is blocking operation, which means while writing data, the thread can't handle other requests.
- So, `Thread per connecion` model is not a good idea. To tackle this, Node.js use underlying OS kernel's scalable I/O event notification mechanisms.
- `epoll` descriptor manages all file descriptors, and uses Red-Black trees (operates in O(1) time). As soon as any activity happens in any of the file descriptor, `epoll` notifies `libuv`, and then `libuv` handles the callbacks in `poll` phase.
- The callbacks are then executed by `V8` JS Engine.

### Learnings

- Don't block the main thread. Don't do the following on main thread:-
  - Use async methods instead of sync methods.
  - Dealing with heavy JSON objects
  - Complex regular expressions
  - Computational expensive calculations
- Data structures are very important if we want to become very good developers.
  - Epoll uses red black trees and works in O(1) for managing file descriptors
  - Timers are managed using Min Heap and Priority Queue on the basis of expiration time.
- Naming is very important
  - Eg. [process.nextTick vs setImmediate](https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick#processnexttick-vs-setimmediate)
- There's still a lot more to learn.

> The more you learn, the more you will feel that you still know nothing.

### HOMEWORK

- epoll, sockets
- file descriptors
- system call
- streams, buffers and pipes
- event emitter
- red-black trees
