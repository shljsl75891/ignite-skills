const N = 10;

function printNTo1(N) {
  if (N === 0) return;
  console.log(N);
  printNTo1(N - 1);
}

function print1ToN(N) {
  if (N === 0) return;
  print1ToN(N - 1);
  console.log(N);
}

console.log(`Printing from ${N} to 1`);
printNTo1(N);
console.log(`Printing from 1 to ${N}`);
print1ToN(N);
