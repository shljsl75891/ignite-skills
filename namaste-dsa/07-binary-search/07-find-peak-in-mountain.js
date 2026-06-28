/**
 * @param {number[]} arr
 * @return {number}
 */
var peakIndexInMountainArray = function (nums) {
  let low = 0,
    high = nums.length - 1;

  while (low < high) {
    let mid = low + Math.floor((high - low) / 2);

    if (nums[mid] > nums[mid + 1] && nums[mid] > nums[mid - 1]) {
      return mid;
    } else if (nums[mid + 1] > nums[mid]) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return low;
};
