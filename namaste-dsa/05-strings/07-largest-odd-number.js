/**
 * @param {string} num
 * @return {string}
 */
var largestOddNumber = function(num) {
  while (num.length > 0) {
    if (num[num.length - 1] % 2 === 0) {
      num = num.substring(0, num.length - 1);
    } else {
      return num;
    }
  }
  return num;
};
