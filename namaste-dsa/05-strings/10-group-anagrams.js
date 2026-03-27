/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
  let N = strs.length,
    PLACEHOLDER = "$#%@";
  for (let i = 0; i < N; i++) {
    if (strs[i] === PLACEHOLDER) continue;
    let currentAnagramPair = [strs[i]];
    for (let j = i + 1; j < strs.length; j++) {
      if (isAnagramPair(strs[i], strs[j])) {
        currentAnagramPair.push(strs[j]);
        strs[j] = PLACEHOLDER;
      }
    }
    strs.push(currentAnagramPair);
  }
  return strs.slice(N);
};

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
