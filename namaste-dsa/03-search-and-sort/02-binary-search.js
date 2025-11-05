/**
 *
 * @param {Array<number>} searchSpace
 * @param {number} target
 */
function binarySearch(searchSpace, target) {
  let left = 0;
  let right = searchSpace.length - 1;

  while (left <= right) {
    const mid = parseInt((right - left) / 2 + left);
    const element = searchSpace.at(mid);
    if (target === element) return mid;
    else if (target > element) left = mid + 1;
    else right = mid - 1;
  }

  return -1;
}

const arr = [-1, 0, 3, 5, 9, 12];
console.log(binarySearch(arr, 9)); // 4
console.log(binarySearch(arr, 0)); // 1
console.log(binarySearch(arr, 10)); // -1
console.log(binarySearch(arr, 12)); // 5
