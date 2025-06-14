#### Learnings

- Always read the problem statement very carefully
- Always think about corner cases such as:
  - What if array is empty
  - What if array has only one element
  - What if array has duplicate elements
  - What if array has only negative numbers
- This is a key skill to learn while understanding DSA and problem solving
- Always first build a working solution, and then think about any missing corner cases for 2-3 minutes

##### [Pallindrome Question](https://leetcode.com/problems/palindrome-number/)

```javascript
/**
 * @param {number} num
 * @return {number} - The reversed number
 */
function reverseInteger(num) {
  let result = 0;
  while (num > 0) {
    const rem = num % 10;
    num = parseInt(num / 10);
    32;
    result = result * 10 + rem;
  }
  return result;
}

/**
 * @param {number} num
 * @return {boolean}
 */
var isPalindrome = function (num) {
  reversedNum = reverseInteger(num);
  if (reversedNum === num) return true;
  return false;
};
```

##### [Reverse Integer](https://leetcode.com/problems/reverse-integer/description/)

```javascript
function isOutsideRange(num) {
  const upperBound = 2 ** 31 - 1;
  const lowerBound = -(2 ** 31);
  return num < lowerBound || num > upperBound;
}

/**
 * @param {number} num
 * @return {number}
 */
var reverse = function (num) {
  const isNegative = num < 0;
  num = Math.abs(num);
  let rev = 0;

  while (num > 0) {
    const rem = num % 10;
    rev = rev * 10 + rem;
    num = parseInt(num / 10);
  }

  // if outside of 32 bit range
  if (isOutsideRange(rev)) return 0;
  return isNegative ? -rev : rev;
};
```
