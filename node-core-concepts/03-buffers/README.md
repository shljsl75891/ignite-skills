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
