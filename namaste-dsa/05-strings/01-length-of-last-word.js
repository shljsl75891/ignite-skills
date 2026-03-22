/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function (s) {
  let i = s.length - 1;
  while (i > 0 && s.charCodeAt(i) === 32) {
    i--;
  }
  let lastNonSpaceIdx = i;
  while (i > 0 && s.charCodeAt(i) !== 32) {
    i--;
  }
  return s.charCodeAt(i) !== 32 ? lastNonSpaceIdx - i + 1 : lastNonSpaceIdx - i;
};
