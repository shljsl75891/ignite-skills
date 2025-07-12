import { Buffer } from "node:buffer";
import fs from "node:fs";
import fsPromises from "node:fs/promises";

/**
 * Writing on a file 10 million times using different methods with benhmarking:
 *    sync: 1.060s = 48 MB RAM = 104% CPU 1 core
 *    promises: 8.729s = 52 MB RAM = 104% CPU 1 core
 *    callback: 848.194ms = 930 MB = 308% CPU almost 3 cores
 */

const filePath = `${import.meta.dirname}/test-file.txt`;

/** Opened file descriptor */
const fd = fs.openSync(filePath, "w");
const fileHandler = await fsPromises.open(filePath, "w");

// Sync method
for (let i = 0; i < 1e6; i++) {
  fs.writeSync(fd, Buffer.from(`${i} `, "utf-8"));
}

// Promises method
for (let i = 0; i < 1e6; i++) {
  await fileHandler.write(Buffer.from(`${i} `, "utf-8"));
}
await fileHandler.close();

// Async method
for (let i = 0; i < 1e6; i++) {
  fs.write(fd, Buffer.from(`${i} `, "utf-8"), () => {});
}
