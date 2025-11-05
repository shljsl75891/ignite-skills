let it1 = 0;
let it2 = 0;
let it3 = 0;

/** Unoptimized solution */
function bubbleSort1(arr) {
  const N = arr.length;
  if (N === 0) return;
  for (let i = 0; i < N - 1; ++i) {
    for (let j = 0; j < N - 1; ++j) {
      ++it1;
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
}

/** First Optimization (as with every iteration, largest element already is already at the end, no comparison needed for that) */
function bubbleSort2(arr) {
  const N = arr.length;
  if (N === 0) return;
  for (let i = 0; i < N - 1; ++i) {
    for (let j = 0; j < N - (i + 1); ++j) {
      ++it2;
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
}

/** Second Optimization (no further iteration is needed if array is already sorted or become sorted early) */
function bubbleSort3(arr) {
  const N = arr.length;
  if (N === 0) return;
  for (let i = 0; i < N - 1; ++i) {
    let swapped = false;
    for (let j = 0; j < N - (i + 1); ++j) {
      ++it3;
      if (arr[j] > arr[j + 1]) {
        swapped = true;
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
    if (!swapped) {
      break;
    }
  }
}

const arr = [8, 1, 2, 5, 4, 3, 7, 6, 9, 10];

console.log("Array Length: ", arr.length);

bubbleSort1([...arr]);
console.log("Unoptimized algo output: ", arr, ` in ${it1} iterations`);
bubbleSort2([...arr]);
console.log("After first optimization output: ", arr, ` in ${it2} iterations`);
bubbleSort3([...arr]);
console.log("After second optimization output: ", arr, ` in ${it3} iterations`);
