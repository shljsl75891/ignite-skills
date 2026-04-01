/**
 * @param {number[]} nums
 * @return {number[]}
 */
var nextGreaterElements = function (nums) {
  let result = Array(nums.length).fill(null),
    stack = [nums[nums.length - 1]];
  for (let i = nums.length - 2; i >= 0; i--) {
    while (stack.length > 0) {
      const top = stack[stack.length - 1];
      if (top > nums[i]) {
        result[i] = top;
        break;
      }
      stack.pop();
    }
    stack.push(nums[i]);
  }

  let i = nums.length - 1;
  while (stack.length > 0) {
    const top = stack[stack.length - 1];
    if (result[i] !== null) {
      i--;
      continue;
    }
    if (top > nums[i]) {
      result[i--] = top;
      continue;
    }
    stack.pop();
  }

  for (let i = 0; i < result.length; i++) {
    if (result[i] === null) {
      result[i] = -1;
    }
  }
  return result;
};
