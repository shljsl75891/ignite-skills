/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function (nums, val) {
  let i = 0,
    j = nums.length - 1;
  while (i <= j) {
    if (nums[i] === val) {
      nums[i] = nums[j];
      nums[j--] = val;
    } else {
      ++i;
    }
  }

  return i;
};
