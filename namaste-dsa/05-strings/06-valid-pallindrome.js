/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
  let i = 0,
    j = s.length - 1;

  while (i <= j) {
    let c1 = convert(s[i]);
    let c2 = convert(s[j]);

    if (!c1) {
      i++;
      continue;
    }
    if (!c2) {
      j--;
      continue;
    }
    if (c1 !== c2) {
      return false;
    }

    i++;
    j--;
  }
  return true;
};

function convert(s) {
  let ascii = s.charCodeAt(0);
  if ((ascii <= 57 && ascii >= 48) || (ascii >= 97 && ascii <= 122)) {
    return s;
  } else if (ascii >= 65 && ascii <= 90) {
    return String.fromCharCode(ascii + 32);
  } else {
    return "";
  }
}
