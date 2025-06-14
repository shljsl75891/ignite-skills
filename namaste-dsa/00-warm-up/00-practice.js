console.log("------------------- Searching an element -----------------------");
// Write a function searches for an element in an array and return the index, if the element is not present, then just return -1
function searchElement(arr, el) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === el) return i;
  }
  return -1;
}

const randomArray = [28, 3, 45, 12, 67, 89, 23, 56, 78, 90];

console.log(searchElement(randomArray, 89)); // 5
console.log(searchElement(randomArray, 34)); // -1
console.log(searchElement(randomArray, 12)); // 3

console.log(
  "------------------- Couting negative numbers -----------------------",
);
// Write a function to return the count of negative numbers in array of numbers
function countNegative(arr) {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < 0) count++;
  }
  return count;
}

console.log(countNegative([-1, -2, -3, -4, -5])); // 5
console.log(countNegative([1, 2, 3, 4, 5])); // 0
console.log(countNegative([1, 2, 3, -4, 5, -6])); // 2
console.log(countNegative([2, -9, 17, 0, 1, -10, -4, 8])); // 3

console.log(
  "------------------- Largest number in array -----------------------",
);

function findLargest(arr) {
  let result = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (result < arr[i]) {
      result = arr[i];
    }
  }
  return result;
}

console.log(findLargest([28, 103, 45, 12, 67, 89, 23, 56, 78, 90]));
console.log(findLargest([5, 0, 7, 10, 8, 17, 1]));

console.log(
  "------------------- Smallest number in array -----------------------",
);

function findSmallest(arr) {
  let result = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (result > arr[i]) {
      result = arr[i];
    }
  }
  return result;
}

console.log(findSmallest([28, 103, 45, 12, 67, 89, 23, 56, 78, 90]));
console.log(findSmallest([5, -3, 0, 7, 10, 8, 17, 1]));
