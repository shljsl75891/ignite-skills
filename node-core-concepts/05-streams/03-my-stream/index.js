import fs from "node:fs/promises";

const readHandler = await fs.open("src.txt", "r");
const writeHandler = await fs.open("dest.txt", "w");

let bytesRead = -1;

const DEFAULT_BUFFER_SIZE = 16384;

while (bytesRead !== 0) {
  const chunk = await readHandler.read();
  bytesRead = chunk.bytesRead;
  if (bytesRead !== DEFAULT_BUFFER_SIZE) {
    // means last chunk is smaller
    const smallerBuffer = Buffer.alloc(bytesRead);
    const lastIndex = chunk.buffer.indexOf(0);
    chunk.buffer.copy(smallerBuffer, 0, 0, lastIndex);
    writeHandler.write(smallerBuffer);
  } else {
    writeHandler.write(chunk.buffer);
  }
}
