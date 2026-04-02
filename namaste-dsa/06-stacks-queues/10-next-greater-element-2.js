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

/** Circular Array ==> Always double the array, and the complexity of circular will be removed */
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var nextGreaterElements = function (nums) {
  let N = nums.length;
  let result = Array(N).fill(-1),
    stack = [nums[N - 1]];

  for (let i = N * 2 - 2; i >= 0; i--) {
    while (stack.length > 0) {
      let top = stack[stack.length - 1];
      if (nums[i % N] < top) {
        result[i % N] = top;
        break;
      } else {
        stack.pop();
      }
    }
    stack.push(nums[i % N]);
  }
  return result;
};
