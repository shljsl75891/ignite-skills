/**
 * @param {number[]} arr
 * @param {number} k
 * @param {number} x
 * @return {number[]}
 */
var findClosestElements = function (arr, k, x) {
  let low = 0,
    high = arr.length - k; // to prevent overflow
  while (low < high) {
    let mid = low + Math.floor((high - low) / 2);
    // Don't use abs(), because it doesn't tell the direction if difference is same
    // Always do => Greater number - Smaller number
    if (x - arr[mid] <= arr[mid + k] - x) {
      high = mid;
    } else {
      // we already found more closer elements on the right side, so middle element for sure can be ignored
      low = mid + 1;
    }
  }
  return arr.slice(low, low + k);
};
