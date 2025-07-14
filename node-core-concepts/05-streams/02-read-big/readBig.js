import fs from "node:fs/promises";
console.time("readBig");

/**
 * Very fast and memory efficient
 * 15.355ms = 50 MB
 */
const sourcePath = `${import.meta.dirname}/src.txt`;
const destinationPath = `${import.meta.dirname}/dest.txt`;

const fileReadHandler = await fs.open(sourcePath, "r");
const fileWriteHandler = await fs.open(destinationPath, "w");

const readStream = fileReadHandler.createReadStream();
const writeStream = fileWriteHandler.createWriteStream();

let lostPart = "";
readStream.on("data", (chunk) => {
  const numbers = chunk.toString("utf-8").split(" ").filter(Boolean);

  const firstElement = Number(numbers[0]);
  const secondElement = Number(numbers[1]);
  const secondLastElement = Number(numbers[numbers.length - 2]);
  const lastElement = Number(numbers[numbers.length - 1]);

  // If first part is lost info of previous part
  if (firstElement + 1 !== secondElement) {
    numbers[0] = lostPart + numbers[0];
  }

  // If last part is lost, stored it for appending in next chunk
  if (secondLastElement + 1 !== lastElement) {
    lostPart = numbers.pop();
  }

  numbers.forEach((number) => {
    const num = Number(number);
    if (num % 10 === 0)
      if (!writeStream.write(number + " ")) {
        readStream.pause();
      }
  });
});

writeStream.on("drain", () => readStream.resume());

readStream.on("end", (chunk) => {
  writeStream.end(chunk);
  console.timeEnd("readBig");
});
