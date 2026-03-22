function isVowel(c) {
  return ["a", "e", "i", "o", "u"].includes(c);
}
/**
 * @param {string} s
 * @return {number}
 */
var maxFreqSum = function (s) {
  let charCount = {},
    maxVowel = 0,
    maxConsonant = 0;
  for (let char of s) {
    charCount[char] = (charCount[char] ?? 0) + 1;
  }
  for (const char in charCount) {
    if (isVowel(char)) {
      maxVowel = Math.max(maxVowel, charCount[char]);
    } else {
      maxConsonant = Math.max(maxConsonant, charCount[char]);
    }
  }
  return maxVowel + maxConsonant;
};
