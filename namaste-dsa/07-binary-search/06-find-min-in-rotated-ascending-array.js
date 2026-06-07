/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function (nums) {
  let low = 0,
    high = nums.length - 1;
  while (low < high) {
    const mid = low + Math.floor((high - low) / 2);
    // The target is in right sorted array
    if (nums[mid] > nums[high]) {
      low = mid + 1;
    } // The target can be target, or at left of that
    else {
      high = mid;
    }
  }
  return nums[low];
};
