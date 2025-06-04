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

// Happy flow
console.log(findSecondLargest([28, 103, 45, 12, 67, 89, 23, 56, 78, 90]));
console.log(findSecondLargest([5, -3, 0, 7, 10, 8, 17, 1]));
console.log(findSecondLargest([2, 19, 17, 13, 92, 48, 56, 32]));

// Corner cases
console.log(findSecondLargest([10]));
console.log(findSecondLargest([]));
console.log(findSecondLargest([-1, -4, -5, -3, -2]));
console.log(findSecondLargest([10, 20, 20]));
