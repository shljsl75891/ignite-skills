function sum(N) {
  if (N === 0) return 0;
  return N + sum(N - 1);
}
console.log(sum(10));
