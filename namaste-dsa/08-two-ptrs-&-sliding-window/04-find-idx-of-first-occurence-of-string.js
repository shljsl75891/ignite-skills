/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {
  let i = 0,
    j = needle.length;
  while (j <= haystack.length) {
    if (haystack.slice(i, j) === needle) {
      return i;
    } else {
      i++;
      j++;
    }
  }
  return -1;
};
