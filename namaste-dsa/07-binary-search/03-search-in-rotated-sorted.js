/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  let low = 0,
    high = nums.length - 1;

  while (low + 1 < high) {
    let mid = low + parseInt((high - low) / 2);
    if (nums[mid] > nums[low]) {
      low = mid;
    } else {
      high = mid;
    }
  }

  if (nums[low] === target) return low;
  if (nums[high] === target) return high;

  // finding out, whether my target is in left sorted part or right sorted part
  if (nums[low] > target && target < nums[0]) {
    low = low + 1;
    high = nums.length - 1;
  } else {
    high = low;
    low = 0;
  }

  while (low <= high) {
    let mid = low + parseInt((high - low) / 2);
    if (nums[mid] === target) return mid;
    else if (nums[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return -1;
};
