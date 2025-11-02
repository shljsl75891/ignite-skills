function sumOfAllElements(arr) {
  if (!arr || arr.length === 0) return 0;
  return arr.pop() + sumOfAllElements(arr);
}

function sumOfOddElements(arr) {
  if (!arr || arr.length === 0) return 0;
  const element = arr.pop();
  return element % 2 ? element + sumOfOddElements(arr) : sumOfOddElements(arr);
}

console.log(sumOfAllElements([5, 2, 3, 8, 6, 9, 10, 7, 4, 1]));
console.log(sumOfOddElements([5, 3, 0, 2, 1]));
