var mySqrt = function (x) {
  let left = 0,
    right = x;

  while (left <= right) {
    let middle = left + Math.floor((right - left) / 2);
    const middleSq = middle * middle;
    if (middleSq === x) {
      return middle;
    } else if (middleSq > x) {
      right = middle - 1;
    } else {
      left = middle + 1;
    }
  }

  return left - 1;
};
