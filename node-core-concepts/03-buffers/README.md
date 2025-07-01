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

Thus, Buffers are very powerful concept in Node.js. We can take data from a file, network request or any other source, move around it or maybe do some operations on it, and then write it back to a file or send it over the network.

## Homework

- Play with encodings of different characters by visiting [SymblC](https://symbl.cc)
