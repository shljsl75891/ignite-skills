/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
  let originalNums = nums.slice();
  let k = 0;
  for (let i = 0; i < nums.length; i++) {
    if (originalNums[i] !== 0) {
      nums[k++] = originalNums[i];
    }
  }

  for (let i = k; i < originalNums.length; i++) {
    nums[i] = 0;
  }
};

let nums = [1, 5, 0, 3, 2, 0, 0, 4, 0, 6];

moveZeroes(nums);

console.log(nums); // expected: [1, 5, 3, 2, 4, 6, 0, 0, 0, 0]
