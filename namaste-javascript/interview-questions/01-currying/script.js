/**
 * The function currying is a technique in functional programming where a function is transformed into a sequence of functions, each taking a single argument.
 * It allows you to create specialized functions by partially applying arguments to a function.
 *
 * In javascript, it can be implemented in two ways:
 *
 * 1. Using bind method
 * 2. Using closures
 */

// ---------- BIND method ----------

function multiply(a, b) {
  return a * b;
}

const multiplyByTwo = multiply.bind(this, 2);
console.log(multiplyByTwo(5));

const multiplyByThree = multiply.bind(this, 3);
console.log(multiplyByThree(5));

// ---------- CLOSURE method ----------
const calculateTotal = (tax) => (discount) => (price) => {
  return (price - discount) * (1 + tax);
};

const calculateWithGST = calculateTotal(0.18);

const totalWithTaxAndDiscount = calculateTotal(0.1)(5)(100);
const totalWithGSTAndDiscount = calculateWithGST(10)(200);
