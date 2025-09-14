/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function (nums) {
  const numsSet = new Set(nums);
  for (let i = 0; i <= nums.length; i++) {
    if (!numsSet.has(i)) return i;
  }
};

console.log(missingNumber([3, 0, 1]));
console.log(missingNumber([0, 1]));
console.log(missingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1]));
