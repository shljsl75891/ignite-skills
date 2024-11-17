console.log("Sum Module Executed");

async function fetchData() {
  const response = await fetch("https://dummyjson.com/users/1");
  const data = await response.json();
  console.log(data);
}

fetchData();

/**
 * This function prints the sum of two input numbers
 * @param {number} a - Input A
 * @param {number} b - Input B
 */
export function calculateSum(a, b) {
  console.log(a + b);
}
