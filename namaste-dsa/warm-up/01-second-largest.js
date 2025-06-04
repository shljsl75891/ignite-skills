function findSecondLargest(arr) {
  let largest = arr[0],
    secondLargest = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > largest) {
      secondLargest = largest;
      largest = arr[i];
    } else if (arr[i] > secondLargest) {
      secondLargest = arr[i];
    } else {
      // DO NOTHING
    }
  }

  return secondLargest;
}

console.log(findSecondLargest([28, 103, 45, 12, 67, 89, 23, 56, 78, 90]));
console.log(findSecondLargest([5, -3, 0, 7, 10, 8, 17, 1]));
console.log(findSecondLargest([2, 19, 17, 13, 92, 48, 56, 32]));
console.log(findSecondLargest([4, 9, 0, 2, 8, 7, 1]));
