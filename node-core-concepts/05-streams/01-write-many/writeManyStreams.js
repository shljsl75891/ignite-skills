import fs from "node:fs/promises";

/**
 * Benchmarking same
 * 154.786ms = 48 MB = 100% CPU (1 core)
 *
 * Now, it is very fast and memory efficient
 */

const filePath = `${import.meta.dirname}/test-file.txt`;
const fileHandle = await fs.open(filePath, "w");

/**
 * An abstract interface for writing streaming data to a destination in node.js
 * An object with events, properties and methods with an internal buffer of size 16 KiB.
 */
const stream = fileHandle.createWriteStream();

// Size of internal buffer (bytes)
const internalBufferSize = stream.writableHighWaterMark; // 16384 bytes

// How much internal buffer is filled (bytes)
const spaceLeftInInternalBuffer = stream.writableLength;

let i = 0;
const MAX_LIMIT = 100000;
const writeData = () => {
  for (; i < MAX_LIMIT; i++) {
    // This method return `false` if internal buffer is completely filled
    if (!stream.write(i + " ")) {
      // resume when internal buffer is drained
      break;
    }
  }

  if (i === MAX_LIMIT) {
    stream.end(); // fire the `finish` event
  }
};

writeData();

stream.on("drain", () => {
  // The stream will be drained (total content size / high watermark) times
  // the number of writes to destination also will be very less around same number
  writeData(); // resume the write operations
});

stream.on("finish", () => fileHandle.close());
