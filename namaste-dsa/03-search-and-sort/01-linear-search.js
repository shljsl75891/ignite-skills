/**
 *
 * @param {Array<number>} searchSpace
 * @param {number} target
 */
function linearSearch(searchSpace, target) {
  for (let idx = 0; idx < searchSpace.length; idx++) {
    if (searchSpace.at(idx) === target) {
      return idx;
    }
  }
  return -1;
}

console.log(linearSearch([4, 9, 1, 0, 2], 9)); // 1
console.log(linearSearch([4, 9, 1, 0, 2], 0)); // 3
console.log(linearSearch([4, 9, 1, 0, 2], 10)); // -1
