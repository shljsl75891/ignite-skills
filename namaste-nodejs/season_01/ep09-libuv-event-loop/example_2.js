const a = 100;
const fs = require("node:fs");
const https = require("node:https");

setImmediate(() => console.log("setImmediate"));

Promise.resolve("Promise resolved").then(console.log);

https.get("https://dummyjson.com/users", () => {
  console.log("API successfully completed");
});

fs.readFile("./file.txt", { encoding: "utf8" }, () =>
  console.log("File read successfully"),
);

setTimeout(() => console.log("Timer expired"), 0);

function printA() {
  console.log("a: ", a);
}

process.nextTick(() => console.log("process.nextTick() called"));

printA();
console.log("Last line of the file");

/**
 * OUTPUT:
 *
 * a:  100
 * Last line of the file
 * process.nextTick() called
 * Promise resolved
 * Timer expired
 * setImmediate
 * File read successfully
 * API successfully completed
 */
