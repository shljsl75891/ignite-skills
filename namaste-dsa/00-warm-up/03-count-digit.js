// Write a function which returns the count of digits in a number
function countDigits(num) {
  let count = 0;
  if (num < 0) num *= -1;
  while (num > 0) {
    num = parseInt(num / 10);
    count++;
  }
  return count;
}

console.log(countDigits(-1)); // 1
console.log(countDigits()); // 0
console.log(countDigits(2039)); // 4
console.log(countDigits(-103)); // 3
console.log(countDigits(76)); // 2
console.log(countDigits(13848585959498)); // 14
