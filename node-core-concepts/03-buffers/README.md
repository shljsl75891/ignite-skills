# Buffers

> Low level programming is good for programer's soul
> -- John Carmack

**Binary Data** = Two possible values. OFF = 0 and ON = 1.

Everything we see in the computer is binary data.

- Files
- Applications
- Network Requests
- Whole operating system
- Text, Images, Videos, Audio

These all are binary data nothing else. Each system has its own way of representing binary data.

- **Transistors** = M1 hs 16 billion transistors. All can be either in OFF state or ON state.
- **Light Bulb** = It can be either ON or OFF.
- **Routers, Wifi** = They all work with electromagnetic waves. They also have only two states 0 and 1.
- **USBs / Harddisks / RAM** = Everything is stored in 0 and 1s.

### Why `Buffers` are so important ?

- They help us to deal with this whole world of zeroes and ones. They connect `Node.js` with these binary data.
- Accessing filesystem, reading or writing network requests, communication b/w processes etc. everything is possible with the help of buffers.
- Without buffers, there would have no way to deal with binary data in `Node.js`.

## Before learning buffers, we need to understand about these important topics:

1. [Number Systems](./01-number-systems.md)
2. [Character Sets + Encoding](./02-character-sets-encoding.md)

![](/assets/2025-06-30-23-12-22.png)

- Buffers are containers in a memory allocated to us.
- They are data structures that allow us to work with binary data in a more manageable way.
- In Node.js, buffers act like array. They can have elements each of exactly 1 byte / 8 bits in size.
- Assigning a value that can be stored in more than 8 bits, will result in discarding of all rest of the left bits other than rightmost 8 bits. For example, if we try to assign (500)<sub>10</sub> to a buffer's element, which is (111110100)<sub>2</sub>, only the last 8 bits will be stored (11110100)<sub>2</sub> = (244)<sub>10</sub> and rest are discarded.
- Allocating a buffer require that much capcaity available in the memory. If we try to allocate more than available memory, the node program will crash.
- The operating system actually allocates that much memory for node application, and it is easily visible in the task manager or activity monitor.
- It is important to be careful while using resources of the machine through low level of programming, because it can lead to memory leaks and crash the application.

```js
const hugeBuffer = Buffer.alloc(1e9);
setInterval(() => {
  hugeBuffer.fill(1);
}, 1000);
```

- By default, we can allocate buffers of size up to 4294967296 bytes.

```js
const { constants } = require("node:buffer");
console.log(constants.MAX_LENGTH); // 4294967296 bytes
```

Thus, Buffers are very powerful concept in Node.js. We can take data from a file, network request or any other source, move around it or maybe do some operations on it, and then write it back to a file or send it over the network.

## Faster way to allocate buffers

- There is a faster way exist in node to allocate bufers, which is `Buffer.allocUnsafe(size)`.
- But, it is unsafe because it does not initialize the memory allocated to the buffer.
- It means the buffer may contain sensitive information from the previous process that used that memory such as API keys, credentials etc.
- Usage of this method is strongly discouraged for security sensitive applications.

#### Reasons why it is faster ?

![](/assets/2025-07-06-14-15-16.png)

- No pre-initialization of buffer, after allocation of memory.
- Uses the pre-allocated pool allocated by the node.js runtime.

> `Buffer.allocUnsafe(size)` is used by `Buffer.from()` and `Bugfer.concat()` methods internally, but they fill it as soon as possible.

As soon as our node application starts, it allocates a pool of memory for usage of future buffers. This pool is only used by `Buffer.allocUnsafe(size)` method (if size <= `Buffer.poolSize >>> 1`). `Buffer.alloc(size)` method always allocates a new memory outside this pool.

> - `>>> n` = Right shift the binary number by `n` bits. (Divide by 2<sup>n</sup>)
> - `<<< n` = Left shift the binary number by `n` bits. (Multiply by 2<sup>n</sup>)

`Buffer.allocUnsafeSlow(size)` is a slower version of `Buffer.allocUnsafe(size)`, which allocates the buffer outside the pre-allocated pool just like `Buffer.alloc(size)` method.

#### KiB vs KB

| Term    | Full Form | Base | Bytes               |
| ------- | --------- | ---- | ------------------- |
| **KB**  | Kilobyte  | 10   | 1 KB = 1,000 bytes  |
| **KiB** | Kibibyte  | 2    | 1 KiB = 1,024 bytes |

- Use KB for decimal (base 10) systems — common in storage (e.g., SSD sizes).
- Use KiB for binary (base 2) systems — common in programming and memory (e.g., RAM, buffer sizes).

## Homework

- Play with encodings of different characters by visiting [SymblC](https://symbl.cc)
