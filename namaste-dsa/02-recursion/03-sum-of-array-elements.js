function sumOfAllElements(arr) {
  if (!arr || arr.length === 0) return 0;
  return arr.pop() + sumOfAllElements(arr);
}

console.log(sumOfAllElements([5, 2, 3, 8, 6, 9, 10, 7, 4, 1]));
