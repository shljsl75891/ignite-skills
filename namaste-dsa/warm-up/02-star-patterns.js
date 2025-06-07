const N = 5;
console.log("------------------ Pattern 1 -------------------");
/**
 * Write a program to print following pattern
 *             * * * * *
 *             * * * * *
 *             * * * * *
 *             * * * * *
 *             * * * * *
 */
for (let i = 0; i < N; i++) {
  let current = "";
  for (let j = 0; j < N; j++) {
    current += "* ";
  }
  console.log(current);
}

console.log("------------------ Pattern 2 -------------------");

/**
 * Write a program to print following pattern
 *             *
 *             * *
 *             * * *
 *             * * * *
 *             * * * * *
 */
for (let i = 0; i < N; i++) {
  let current = "";
  for (let j = 0; j <= i; j++) {
    current += "* ";
  }
  console.log(current);
}

console.log("------------------ Pattern 3 -------------------");

/**
 * Write a program to print following pattern
 *             1
 *             1 2
 *             1 2 3
 *             1 2 3 4
 *             1 2 3 4 5
 */
for (let i = 1; i <= N; i++) {
  let current = "";
  for (let j = 1; j <= i; j++) {
    current += j + " ";
  }
  console.log(current);
}

console.log("------------------ Pattern 4 -------------------");

/**
 * Write a program to print following pattern
 *             1
 *             2 2
 *             3 3 3
 *             4 4 4 4
 *             5 5 5 5 5
 */
for (let i = 1; i <= N; i++) {
  let current = "";
  for (let j = 1; j <= i; j++) {
    current += i + " ";
  }
  console.log(current);
}

console.log("------------------ Pattern 5 -------------------");

/**
 * Write a program to print following pattern
 *             1 2 3 4 5
 *             1 2 3 4
 *             1 2 3
 *             1 2
 *             1
 */
for (let i = N; i > 0; i--) {
  let current = "";
  for (let j = 1; j <= i; j++) {
    current += j + " ";
  }
  console.log(current);
}

console.log("------------------ Pattern 6 -------------------");

/**
 * Write a program to print following pattern
 *             * * * * *
 *             * * * *
 *             * * *
 *             * *
 *             *
 */
for (let i = N; i > 0; i--) {
  let current = "";
  for (let j = 1; j <= i; j++) {
    current += "* ";
  }
  console.log(current);
}

console.log("------------------ Pattern 7 -------------------");

/**
 * Write a program to print following pattern
 *                     *
 *                   * *
 *                 * * *
 *               * * * *
 *             * * * * *
 */
for (let i = 0; i < N; i++) {
  let current = "";
  for (let j = 0; j < N; j++) {
    if (i + j >= N - 1) {
      current += "* ";
    } else {
      current += "  ";
    }
  }
  console.log(current);
}

console.log("------------------ Pattern 8 -------------------");

/**
 * Write a program to print following pattern
 *             1
 *             1 0
 *             1 0 1
 *             1 0 1 0
 *             1 0 1 0 1
 */
for (let i = 0; i < N; i++) {
  let current = "";
  for (let j = 0; j < i + 1; j++) {
    if (j % 2 === 0) {
      current += "1 ";
    } else {
      current += "0 ";
    }
  }
  console.log(current);
}

console.log("------------------ Pattern 9 -------------------");

/**
 * TODO: Try again....
 * Write a program to print following pattern
 *             1
 *             0 1
 *             0 1 0
 *             1 0 1 0
 *             1 0 1 0 1
 *
 *  I thought pattern was as follows:
 *             1
 *             0 1
 *             0 1 0
 *             1 0 1 0
 *             1 0 1 0 1
 *             0 1 0 1 0 1
 *             0 1 0 1 0 1 0
 *             0 1 0 1 0 1 0 1
 *             1 0 1 0 1 0 1 0 1
 *             1 0 1 0 1 0 1 0 1 0
 *             1 0 1 0 1 0 1 0 1 0 1
 *
 *  But, actually it was the following pattern
 *
 *             1
 *             0 1
 *             0 1 0
 *             1 0 1 0
 *             1 0 1 0 1
 *             0 1 0 1 0 1
 *             0 1 0 1 0 1 0
 *             1 0 1 0 1 0 1 0
 *             1 0 1 0 1 0 1 0 1
 *             0 1 0 1 0 1 0 1 0 1
 */
for (let i = 0, toggle = 1; i < N; i++) {
  let row = "";
  for (let j = 0; j < i + 1; j++) {
    row += toggle + " ";
    toggle = +!toggle;
  }
  console.log(row);
}
