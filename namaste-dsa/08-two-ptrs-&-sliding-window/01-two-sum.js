/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  const numberIndexMap = new Map();

  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i];
    if (numberIndexMap.get(diff) >= 0) {
      return [numberIndexMap.get(diff), i];
    }
    numberIndexMap.set(nums[i], i);
  }

  return [];
};
