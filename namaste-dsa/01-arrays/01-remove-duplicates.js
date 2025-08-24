/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  if (nums.length <= 1) {
    return nums.length;
  }

  let count = 1;
  for (let i = 0, j = 1; j < nums.length; j++) {
    if (nums[i] === nums[j]) continue;
    nums[++i] = nums[j];
    count++;
  }
  return count;
};
