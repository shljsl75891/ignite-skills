/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
  // Getting first zero index
  let i = 0;
  while (nums[i] !== 0 && i < nums.length) i++;
  for (let j = i + 1; j < nums.length; j++) {
    if (nums[j] === 0) continue;
    nums[i++] = nums[j];
  }

  while (i < nums.length) {
    nums[i++] = 0;
  }
};

let nums = [1, 5, 0, 3, 2, 0, 0, 4, 0, 6];

moveZeroes(nums);

console.log(nums); // expected: [1, 5, 3, 2, 4, 6, 0, 0, 0, 0]
