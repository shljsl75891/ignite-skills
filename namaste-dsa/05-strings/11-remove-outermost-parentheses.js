/**
 * @param {string} s
 * @return {string}
 */
var removeOuterParentheses = function (s) {
  let i = 1,
    count = 1,
    prevCount = 0,
    result = "";
  while (i < s.length) {
    prevCount = count;
    if (s[i] === "(") {
      ++count;
    } else {
      --count;
    }
    if ((prevCount === 0 && count === 1) || (prevCount === 1 && count === 0)) {
      ++i;
      continue;
    } else {
      result += s[i];
    }
    ++i;
  }
  return result;
};
