/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  const stack = [];
  const map = new Map([
    [")", "("],
    ["]", "["],
    ["}", "{"],
  ]);

  for (let i = 0; i < s.length; i++) {
    const mapValue = map.get(s[i]);
    if (!mapValue) {
      stack.push(s[i]);
    } else if (mapValue !== stack[stack.length - 1]) {
      return false;
    } else {
      stack.pop();
    }
  }

  return stack.length === 0;
};
