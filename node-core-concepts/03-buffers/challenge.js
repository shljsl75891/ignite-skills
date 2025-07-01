// 0100 1000 0110 0010 0001 = 0x486921
//
// We need to allocate 3 bytes in memory

const { Buffer } = require("node:buffer");

const memoryContainer = Buffer.alloc(3);

memoryContainer[0] = 0x48;
memoryContainer[1] = 0x69;
memoryContainer[2] = 0x21;

console.log(memoryContainer.toString("utf8")); // Output: Hi!
