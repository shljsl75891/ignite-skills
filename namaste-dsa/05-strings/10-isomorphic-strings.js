/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isIsomorphic = function (s, t) {
  let charMap = new Map();
  for (let i = 0; i < s.length; i++) {
    if (!charMap.has(s[i])) {
      charMap.set(s[i], t[i]);
    } else if (charMap.get(s[i]) !== t[i]) {
      return false;
    }
  }
  charMap.clear();
  for (let i = 0; i < t.length; i++) {
    if (!charMap.has(t[i])) {
      charMap.set(t[i], s[i]);
    } else if (charMap.get(t[i]) !== s[i]) {
      return false;
    }
  }
  return true;
};
