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

/**
 * This is the faster but risky way of allocating a buffer in memory
 * It is unsafe because this method doesn't do initializing of the buffer with 0.
 * It may contain some data including sensitive information such as API keys, credentials, etc.
 * It uses the pre-allocated memory pool of size `Buffer.poolSize` which is 8 KB by default, but
 * only when specified size is less than or equal to `Buffer.poolSize >>> 1`
 */
const unsafeBuffer = Buffer.allocUnsafe(1e4);

console.log(Buffer.poolSize); // 8 * 1024 = 8192 bytes = 8 KB
console.log(Buffer.poolSize >>> 1); // 4096 bytes = 4 KB

for (let i = 0; i < unsafeBuffer.length; i++) {
  if (unsafeBuffer[i] !== 0) {
    // Some elements may contain some data which may be sensitive
    console.log(unsafeBuffer[i].toString(2)); // printing binary representation
  }
}
