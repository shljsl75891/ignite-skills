const arr = [7, 1, 5, 4, 3, 2];

for (let i = 0; i < arr.length; i++) {
  let minimumIdx = i;
  for (let j = i + 1; j < arr.length; j++) {
    if (arr[j] < arr[minimumIdx]) {
      minimumIdx = j;
    }
  }
  let temp = arr[i];
  arr[i] = arr[minimumIdx];
  arr[minimumIdx] = temp;
}

console.log("Resulting Array: ", arr);
