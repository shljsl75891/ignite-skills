import { Buffer } from "node:buffer";
import { pipeline } from "node:stream/promises";
import fs from "node:fs/promises";

const sourcePath = `${import.meta.dirname}/src.txt`;
const destinationPath = `${import.meta.dirname}/dest.txt`;

const readHanlder = await fs.open(sourcePath, "r");
const writeHandler = await fs.open(destinationPath, "w");

const readableStream = readHanlder.createReadStream();
const writableStream = writeHandler.createWriteStream();

/**
 * Pipe can only be applied on readable streams.
 * Pipe returns same stream that is passed to it.
 * Only writable streams can be passed to pipe method as argument. It means we can also pass duplex and transform streams.
 * Pipes can be chained only if returned stream is readable. It means pipes can only be chained if the argument passed is duplex or transform stream..
 */
// console.log(readableStream.pipe(writableStream) === writableStream); // true

console.time("copy");
pipeline(readableStream, writableStream)
  .then(() => {
    console.timeEnd("copy");
  })
  .catch((err) => {
    console.error("Pipeline failed", err);
  });

writableStream.on("finish", () => {
  Promise.all([readHanlder.close(), writeHandler.close()]);
});
