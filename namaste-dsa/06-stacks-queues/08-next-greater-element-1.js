Array.prototype.top = function () {
  return this[this.length - 1];
};
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var nextGreaterElement = function (nums1, nums2) {
  const lastElement = nums2[nums2.length - 1];
  let stack = [lastElement],
    nextGreaterElMap = new Map();
  for (let i = nums2.length - 2; i >= 0; i--) {
    while (stack.length > 0) {
      if (stack.top() > nums2[i]) {
        nextGreaterElMap.set(nums2[i], stack.top());
        break;
      }
      stack.pop();
    }
    stack.push(nums2[i]);
  }

  for (let i = 0; i < nums1.length; i++) {
    nums1[i] = nextGreaterElMap.get(nums1[i]) ?? -1;
  }
  return nums1;
};
