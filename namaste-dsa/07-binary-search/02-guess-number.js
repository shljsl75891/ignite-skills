/**
 * Forward declaration of guess API.
 * @param {number} num   your guess
 * @return 	     -1 if num is higher than the picked number
 *			      1 if num is lower than the picked number
 *               otherwise return 0
 * var guess = function(num) {}
 */

/**
 * @param {number} n
 * @return {number}
 */
var guessNumber = function (n) {
  let low = 1,
    high = n;
  while (low <= high) {
    let mid = low + parseInt((high - low) / 2);
    let guessedNum = guess(mid);
    if (guessedNum === 0) return mid;
    else if (guessedNum === 1) low = mid + 1;
    else high = mid - 1;
  }
};
