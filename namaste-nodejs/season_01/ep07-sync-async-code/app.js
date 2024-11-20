const fs = require("node:fs");
const https = require("node:https");
const crypto = require("node:crypto");

console.log("Hello World");

// Synchronous - Blocks Main thread
crypto.pbkdf2Sync("password", "salt", 5000000, 50, "sha512")
console.log("Key generated synchronously");

const a = 294950;
const b = 37580193;
const URL = "https://dummyjson.com/users/1";

// Synchronous - Blocks Main Thread
console.log(fs.readFileSync("./file.txt", "utf-8"))

// Asynchronous - Non blocking nature
crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", (err, key) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Key Generated asynchronously");
  }
});


https.get(URL, () => console.log("Data fetched successfully"));

// Asynchronous - Non blocking nature
fs.readFile("./file.txt", "utf-8", (err, data) => {
  if (err) {
    console.error(err);
  } else {
    console.log(data);
  }
});

setTimeout(() => console.log("Callback executed after 5 seconds"), 5000);

function multiplyNumbers(a, b) {
  const result = a * b;
  return result;
}

const c = multiplyNumbers(a, b);
console.log(c);

/**
 * Output
 *
 * Hello World
 * Key generated synchronously
 * Namaste NodeJS from File contents
 * 11084277925350
 * Namaste NodeJS from File contents
 * Data fetched successfully
 * Key generated asynchronously
 * Callback executed after 5 seconds
 */
