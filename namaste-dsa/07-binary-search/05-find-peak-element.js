var findPeakElement = function (arr) {
  let low = 0,
    high = arr.length - 1;

  while (low < high) {
    let mid = low + Math.floor((high - low) / 2);
    let prev = arr[mid - 1] ?? -Infinity;
    let next = arr[mid + 1] ?? -Infinity;

    if (arr[mid] > prev && arr[mid] > next) {
      return mid;
    }

    if (prev > arr[mid]) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return low;
};
