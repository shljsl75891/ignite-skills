/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNonDuplicate = function (nums) {
  let low = 0,
    high = nums.length - 1;

  while (low < high) {
    let mid = low + Math.floor((high - low) / 2);

    let onLeft = nums[mid] === nums[mid - 1];
    let onRight = nums[mid] === nums[mid + 1];

    if (!onLeft && !onRight) {
      return nums[mid];
    }

    let isOdd = (mid - low) % 2 != 0;

    if (isOdd) {
      if (onLeft) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    } else {
      if (onLeft) {
        high = mid;
      } else {
        low = mid;
      }
    }
  }

  return nums[low];
};
