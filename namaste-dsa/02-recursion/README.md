# Recursion

- When a function call itself to solve a smaller version of same problem, it is called Recursion.
- A function that calls itself is called a recursive function.

## Two Parts of Recursion

- **Base Case**: Stop condition (when to stop calling itself)
- **Recursive Case** part where function calls itself with a smaller input.

Base Case is essential to prevent infinite recursion and eventual stack overflow.

![](/assets/2025-11-02-13-51-56.png)

> Try to search "recursion" on Google and see what happens!

![](/assets/2025-11-02-14-13-26.png)

## MASTERCLASS

- Recursion always invokes functions in Depth First Manner.

```
                                                                                                                                         fib(7)
                                                                                                                                           |
                                                                         +-------------------------------------------------------------+-------------------------------------------------------------+
                                                                         |                                                                                                                           |
                                                                       fib(6)                                                                                                                      fib(5)
                                                                         |                                                                                                                           |
                                                 +---------------------------+---------------------------+                                                           +---------------------------+---------------------------+
                                                 |                                                       |                                                           |                                                       |
                                               fib(5)                                                  fib(4)                                                      fib(4)                                                  fib(3)
                                                 |                                                       |                                                           |                                                       |
                                 +---------------+---------------+                       +---------------+---------------+                           +---------------+---------------+                       +---------------+---------------+
                                 |                               |                       |                               |                           |                               |                       |                               |
                               fib(4)                          fib(3)                  fib(3)                          fib(2)                      fib(3)                          fib(2)                  fib(2)                          fib(1)
                                 |                               |                       |                               |                           |                               |                       |
                     +-----------+-----------+         +---------+---------+   +---------+---------+           +---------+---------+       +---------+---------+           +---------+---------+   +---------+---------+
                     |                       |         |                   |   |                   |           |                   |       |                   |           |                   |   |                   |
                   fib(3)                  fib(2)    fib(2)              fib(1) fib(2)            fib(1)     fib(1)              fib(0)   fib(2)              fib(1)     fib(1)              fib(0) fib(1)              fib(0)
                     |                       |         |                         |                                                             |
                 +---+---+             +-----+-----+   +---+---+             +---+---+                                                       +---+---+
                 |       |             |           |   |       |             |       |                                                       |       |
               fib(2)  fib(1)        fib(1)      fib(0) fib(1)  fib(0)    fib(1)  fib(0)                                                 fib(1)  fib(0)
                 |
             +---+---+
             |       |
           fib(1)  fib(0)
```

In above diagram:

- All nodes are part of recursive case.
- Leaf nodes (nodes at the bottom) are part of base case.
- Number of branches for each node = Number of recursive calls made, until base case is reached.

**ITERATION:** It is a bottom up approach. It starts from smaller sub-problems first, then combines them to solve main problem.
**RECURSION:** It is a top down approach. It starts from main problem first, then breaks it down into smaller sub-problems.

![](/assets/2025-11-05-11-35-08.png)

#### TIME AND SPACE COMPLEXITY OF FIBONACCI USING RECURSION

- Time Complexity: O(2^n) (Exponential)
- Space Complexity: O(n) (due to function call stack)
- Reason for Exponential Time Complexity:
  - Each function call generates two more calls (except base case).
  - This leads to a binary tree of calls, resulting in exponential growth.
- Reason for Linear Space Complexity:
  - Maximum depth of recursion is n (for fib(n)).
  - Each call adds a new layer to the call stack, leading to O(n) space usage.

![](/assets/2025-11-05-11-48-11.png)

#### INTERVIEW PROBLEM

**Rabbit Population Problem:**

QUESTION: There is a pair of rabbits in a field. Each month, every pair of rabbits produces a new pair. Assuming no rabbits die, calculate the total number of rabbit pairs present after a given number of months.

```js
/**
 * @param {number} month - The month number to calculate the rabbit population for.
 * @returns {number} - The number of rabbit pairs present after the given month.
 */
function findRabbitCount(month) {
  if (month === 1) return 2;
  return 2 * findRabbitCount(month - 1);
}

console.log(findRabbitCount(3));
console.log(findRabbitCount(5));
console.log(findRabbitCount(10));
```
