const a = 100;
const fs = require("node:fs");

setImmediate(() => console.log("setImmediate"));

fs.readFile("./file.txt", { encoding: "utf8" }, () =>
  console.log("File read successfully"),
);

setTimeout(() => console.log("Timer expired"), 0);

function printA() {
  console.log("a: ", a);
}

printA();
console.log("Last line of the file");

/**
 * OUTPUT:
 *
 * a:  100
 * Last line of the file
 * Timer expired
 * setImmediate
 * File read successfully
 */
