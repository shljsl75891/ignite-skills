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

/** Optimized implementation in 1 binary search */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  let low = 0,
    high = nums.length - 1;
  while (low <= high) {
    let mid = low + parseInt((high - low) / 2);
    if (target === nums[mid]) return mid;
    if (nums[low] <= nums[mid]) {
      // left part is sorted
      if (target < nums[mid] && target >= nums[low]) {
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    } else {
      // right part is unsorted
      if (target <= nums[high] && target > nums[mid]) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
  }

  return -1;
};
