/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxConsecutiveOnes = function (nums) {
  let count = 0,
    maxCount = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 1) count++;
    else {
      maxCount = Math.max(count, maxCount);
      count = 0;
    }
  }
  return Math.max(count, maxCount);
};

console.log(findMaxConsecutiveOnes([0]));
console.log(findMaxConsecutiveOnes([1, 1, 0, 1]));
console.log(findMaxConsecutiveOnes([1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1]));
console.log(findMaxConsecutiveOnes([1, 1, 0, 1, 1, 1]));
console.log(findMaxConsecutiveOnes([1, 1, 1, 1, 1, 1, 1]));
console.log(findMaxConsecutiveOnes([0, 0, 0, 0, 0, 0, 0]));
