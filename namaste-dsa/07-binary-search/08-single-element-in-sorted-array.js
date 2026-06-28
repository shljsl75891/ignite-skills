/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNonDuplicate = function (nums) {
  let low = 0,
    high = nums.length - 1;
  while (low < high) {
    const mid = low + Number.parseInt(high - low) / 2;
    const isLeftRepeating = nums[mid - 1] === nums[mid];
    const isRightRepeating = nums[mid + 1] === nums[mid];
    const isEvenNeighbours = (high - mid) % 2 === 0;

    if (!isLeftRepeating && !isRightRepeating) {
      return nums[mid];
    }

    // This logic only works if search space has odd number of elements
    if (isEvenNeighbours) {
      if (isLeftRepeating) {
        high = mid;
      } else {
        low = mid;
      }
    } else {
      if (isLeftRepeating) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
  }

  return nums[low];
};
