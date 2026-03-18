const arr = [8, 1, 2, 5, 4, 3, 7, 6, 9, 10];

for (let i = 1; i < arr.length; i++) {
  let curr = arr[i],
    p = i - 1;
  // If my previous element is larger, so I get my current element's correct position.
  while (p >= 0 && arr[p] > curr) {
    arr[p + 1] = arr[p--];
  }
  // Moving current element to its correct position
  arr[p + 1] = curr;
}

console.log("Resulting Array: ", arr);
