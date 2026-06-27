/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
  let low = 0,
    high = nums.length - 1;
  let result = [-1, -1];

  while (low < high) {
    let mid = low + Number.parseInt((high - low) / 2);
    // First = left most target found
    if (nums[mid] === target) {
      high = mid;
    } else if (nums[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  if (nums[low] === target) {
    result[0] = low;
  } else return result;

  high = nums.length - 1;
  while (high - low > 1) {
    let mid = low + Number.parseInt((high - low) / 2);
    // Second = left most target found
    if (nums[mid] === target) {
      low = mid;
    } else {
      high = mid - 1;
    }
  }

  result[1] = nums[high] === target ? high : low;
  return result;
};
