/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var reverseStr = function (s, k) {
  if (!s.length || s.length < k) return reverseString(s);
  let reversedPart = reverseString(s.substring(0, k)) + s.substring(k, 2 * k);
  return reversedPart + reverseStr(s.substring(2 * k), k);
};

function reverseString(s) {
  s = s.split("");
  for (let i = 0, j = s.length - 1; i < j; i++, j--) {
    let temp = s[i];
    s[i] = s[j];
    s[j] = temp;
  }
  return s.join("");
}
