function findSecondLargest(arr) {
  if (arr.length < 2) return null;

  let largest = arr[0],
    secondLargest = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > largest) {
      secondLargest = largest;
      largest = arr[i];
    } else if (arr[i] > secondLargest && arr[i] != largest) {
      secondLargest = arr[i];
    } else {
      // DO NOTHING
    }
  }

  return secondLargest;
}

// UPDATED SOLUTION OF CHANGED PROBLEM STATEMENT 😡
function getSecondLargest(arr) {
  if (arr.length < 2) return null;
  let largest = arr[0],
    secondLargest = Number.MIN_SAFE_INTEGER;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > largest) {
      secondLargest = largest;
      largest = arr[i];
    } else {
      secondLargest = Math.max(secondLargest, arr[i]);
    }
  }
  return largest === secondLargest ? null : secondLargest;
}

// Happy flow
console.log(findSecondLargest([28, 103, 45, 12, 67, 89, 23, 56, 78, 90]));
console.log(findSecondLargest([5, -3, 0, 7, 10, 8, 17, 1]));
console.log(findSecondLargest([2, 19, 17, 13, 92, 48, 56, 32]));

// Corner cases
console.log(findSecondLargest([10]));
console.log(findSecondLargest([]));
console.log(findSecondLargest([-1, -4, -5, -3, -2]));
console.log(findSecondLargest([10, 20, 20]));

// LEETCODE PROBLEM SOLUTION
function isNumericCharacter(s) {
  const numericAscii = new Set([48, 49, 50, 51, 52, 53, 54, 55, 56, 57]);
  return numericAscii.has(s.charCodeAt(0));
}

/**
 * @param {string} s
 * @return {number}
 */
var secondHighest = function (s) {
  let largest = "-1",
    secondLargest = "-1";
  for (let i = 0; i < s.length; i++) {
    let isNumeric = isNumericCharacter(s[i]);
    if (!isNumeric) continue;
    if (s[i] > largest) {
      secondLargest = largest;
      largest = s[i];
    } else if (secondLargest < s[i] && s[i] !== largest) {
      secondLargest = s[i];
    }
  }

  return +secondLargest;
};
