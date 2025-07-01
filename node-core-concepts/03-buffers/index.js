const { Buffer } = require("node:buffer");

const buff = Buffer.alloc(4);

console.log(buff); // <Buffer 00 00 00 00> Will be in hexadecimal as it is easier compared than showing binary

console.log(buff[0]); // 0 will be in decimal by default

/**
 * It can only store unsigned integers in the range of 0 to 255. As every element in the buffer can be of 8 bits.
 * The same binary value can be represented in different ways depending on how it is interpreted.
 */

buff[0] = -4; // It will be 2's complement of 4, which is 252 in decimal

/**
 * To handle such scenarios, `Buffer` provides methods to read and write values in different formats.
 * Example:
 * Buffer.writeInt8(value, offset) - Writes a signed 8-bit integer at the specified offset.
 * Buffer.readInt8(offset) - Reads a signed 8-bit integer from the specified offset.
 * Buffer.writeUInt8(value, offset) - Writes an unsigned 8-bit integer at the specified offset.
 * Buffer.readUInt8(offset) - Reads an unsigned 8-bit integer from the specified offset.
 */

// Hexadecimal ======> UTF-8 Encoding
console.log(Buffer.from("F09F9887", "hex").toString("utf8")); // 😇
