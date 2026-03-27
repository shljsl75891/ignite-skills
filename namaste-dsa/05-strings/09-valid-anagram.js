/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
  if (s.length !== t.length) return false;
  let charCount1 = {},
    charCount2 = {};
  for (let i = 0; i < s.length; i++) {
    charCount1[s[i]] = (charCount1[s[i]] ?? 0) + 1;
    charCount2[t[i]] = (charCount2[t[i]] ?? 0) + 1;
  }

  for (const key in charCount1) {
    if (charCount1[key] !== charCount2[key]) {
      return false;
    }
  }
  return true;
};

/** Implementation using single map */
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
function isAnagramPair(s, t) {
  if (s.length !== t.length) return false;
  let charCountMap = {};
  for (let i = 0; i < s.length; i++) {
    charCountMap[s[i]] = (charCountMap[s[i]] ?? 0) + 1;
  }
  for (let i = 0; i < t.length; i++) {
    if (!charCountMap[t[i]] || charCountMap[t[i]] === 0) {
      return false;
    } else {
      charCountMap[t[i]]--;
    }
  }
  return true;
}
