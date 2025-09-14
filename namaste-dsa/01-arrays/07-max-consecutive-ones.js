/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxConsecutiveOnes = function (nums) {
  let result = 0;
  let i = 0,
    j = 0;
  while (i < nums.length) {
    if (nums[i] === 0) {
      result = Math.max(result, i - j - 1);
      // if first element was 1, as otherwise nums[j] will always be zero
      if (nums[j] === 1) ++result;
      j = i;
    }
    i++;
  }

  // if all elements of array are 1's
  if (j === 0 && nums[j] === 1) {
    return nums.length;
  }

  // if last element will be 1
  return Math.max(result, i - j - 1);
};

console.log(findMaxConsecutiveOnes([0]));
console.log(findMaxConsecutiveOnes([1, 1, 0, 1]));
console.log(findMaxConsecutiveOnes([1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1]));
console.log(findMaxConsecutiveOnes([1, 1, 0, 1, 1, 1]));
console.log(findMaxConsecutiveOnes([1, 1, 1, 1, 1, 1, 1]));
console.log(findMaxConsecutiveOnes([0, 0, 0, 0, 0, 0, 0]));
