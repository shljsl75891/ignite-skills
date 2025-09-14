/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function (nums) {
  let n = nums.length;
  const expectedSum = (n * (n + 1)) / 2;
  let actualSum = nums.reduce((curr, sum) => curr + sum, 0);
  return expectedSum - actualSum;
};

console.log(missingNumber([3, 0, 1]));
console.log(missingNumber([0, 1]));
console.log(missingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1]));
