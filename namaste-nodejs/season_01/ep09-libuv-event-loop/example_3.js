const fs = require("node:fs");

setImmediate(() => console.log("setImmediate"));

setTimeout(() => console.log("Timer expired"), 0);

Promise.resolve("Promise resolved").then(console.log);

fs.readFile("./file.txt", { encoding: "utf8" }, () => {
  setTimeout(() => console.log("2nd timer"), 0);

  process.nextTick(() => console.log("2nd nextTick"));

  setImmediate(() => console.log("2nd setImmediate"));

  console.log("File read successfully");
});

process.nextTick(() => console.log("nextTick"));

console.log("Last line of the file");

/**
 * OUTPUT:
 *
 * Last line of the file
 * nextTick
 * Promise resolved
 * Timer expired
 * setImmediate
 * File read successfully
 * 2nd nextTick
 * 2nd setImmediate
 * 2nd timer
 */
