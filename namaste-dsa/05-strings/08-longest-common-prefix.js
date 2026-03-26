/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  let currentChar,
    i = 0,
    result = "";
  while (true) {
    currentChar = strs[0][i];
    for (const str of strs) {
      if (!str[i] || currentChar !== str[i]) {
        return result;
      }
    }
    result += currentChar;
    i++;
  }
};
