/**
 * Definition for isBadVersion()
 *
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
var solution = function (isBadVersion) {
  /**
   * @param {integer} n Total versions
   * @return {integer} The first bad version
   */
  return function (n) {
    let low = 1,
      right = n;
    while (low < right) {
      let mid = low + parseInt((right - low) / 2);
      if (isBadVersion(mid) === true) {
        right = mid;
      } else {
        low = mid + 1;
      }
    }
    return isBadVersion(low) ? low : -1;
  };
};
