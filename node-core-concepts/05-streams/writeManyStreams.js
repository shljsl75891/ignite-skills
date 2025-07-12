import fs from "node:fs/promises";

/**
 * Benchmarking same
 * 18.794ms = 200 MB RAM = 100 % CPU (1 core)
 * We're using a bad way to use streams
 */

const filePath = `${import.meta.dirname}/test-file.txt`;
const fileHandle = await fs.open(filePath, "w");

const stream = fileHandle.createWriteStream();
for (let i = 0; i < 1e6; i++) {
  stream.write(`${i}\n`);
}

await fileHandle.close();
