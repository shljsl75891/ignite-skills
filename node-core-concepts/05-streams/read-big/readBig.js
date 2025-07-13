import fs from "node:fs/promises";

/**
 * Very fast and memory efficient
 * 11.287s = 26 MB
 */
const sourcePath = `${import.meta.dirname}/src.txt`;
const destinationPath = `${import.meta.dirname}/dest.txt`;

const fileReadHandler = await fs.open(sourcePath, "r");
const fileWriteHandler = await fs.open(destinationPath, "w");

const readStream = fileReadHandler.createReadStream();
const writeStream = fileWriteHandler.createWriteStream();

readStream.on("data", (chunk) => {
  if (!writeStream.write(chunk)) {
    readStream.pause();
  }
});

writeStream.on("drain", () => readStream.resume());

readStream.on("end", (chunk) => {
  writeStream.end(chunk);
});
