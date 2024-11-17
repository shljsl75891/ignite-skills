const { calculateSum, calculateMultiply } = require("./calculator");
const data = require("./data.json"); // require() can also be used for importing json

console.log("Data: ", data);

console.log("Main module executed");

var numA = 20;
var numB = 10;

calculateSum(numA, numB);
calculateMultiply(numA, numB);
