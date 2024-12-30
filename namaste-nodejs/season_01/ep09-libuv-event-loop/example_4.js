const fs = require("node:fs");

setImmediate(() => console.log("setImmediate"));

setTimeout(() => console.log("Timer expired"), 0);

Promise.resolve("Promise resolved").then(console.log);

fs.readFile("./file.txt", { encoding: "utf8" }, () => {
  console.log("File read successfully");
});

process.nextTick(() => {
  process.nextTick(() => console.log("inner nextTick"));
  console.log("nextTick");
});

console.log("Last line of the file");

/**
 * Last line of the file
 * nextTick
 * inner nextTick
 * Promise resolved
 * Timer expired
 * setImmediate
 * File read successfully
 */
