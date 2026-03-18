let totalIterations = 0;
function merge(leftSorted, rightSorted) {
  const sortedMergedArray = [];
  let i = 0,
    j = 0;
  while (i < leftSorted.length && j < rightSorted.length) {
    totalIterations++;
    if (leftSorted[i] <= rightSorted[j]) {
      sortedMergedArray.push(leftSorted[i++]);
    } else {
      sortedMergedArray.push(rightSorted[j++]);
    }
  }

  return [
    ...sortedMergedArray,
    ...leftSorted.slice(i),
    ...rightSorted.slice(j),
  ];
}

function mergeSort(arr) {
  totalIterations++;
  if (arr.length == 1) return arr;
  let mid = Math.floor(arr.length / 2);
  let leftSorted = mergeSort(arr.slice(0, mid));
  let rightSorted = mergeSort(arr.slice(mid));
  return merge(leftSorted, rightSorted);
}

let arr = [5, 9, 8, 1, 2, 7, 3, 4, 10, 19, 18, 6, 12, 20];

console.log(mergeSort(arr), totalIterations);
