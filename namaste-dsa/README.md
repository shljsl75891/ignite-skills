# Namaste DSA

#### DSA = Data structures and Algorithms

> **Don't just study DSA for interviews** - Akshay Saini

- DSA is just like bodybuilding. It takes time and need patience.
- Just don't chase competitions, and take shortcuts.
- ❌Learn DSA, ✅ Understand DSA

### Thought process to approach any problem

1. Read the problem statement properly.
2. Think about possible approaches (dynamic programming, backtracking, two pointer, sliding etc.)
3. Think about the solution, and make it as optimal as possible on pen and paper or in mind.
4. Once solution seems optimized, analyze the time and space complexity.
5. Then only write the code in any language. Don't rush to code immedietly after reading problem statement.

## Time and Space Complexity

#### Time Complexity

> It is used to measure the efficiency of an algorithm in terms of speed, as the size of input grows.

**_Time Complexity !== Time taken by algorithm_**

Time taken can be varied according to environment in which the algorithm is running.

###### Common Time Complexities - BigO Notation

It is the time complexity of an algorithm in worst case.

![](/assets/2025-06-14-18-00-49.png)

- O(Log N) = Binary Search
- O(N) = Linear Search
- O(N Log N) = Merge Sort
- O(N^2) / O(N^3) = Nested Loops
- O(N!) = Very Very Very High....

**Why we ignore constants from O(2*n), O(5*n) = O(n) ?**

These constants don't remain significant as size of input grows...

Example => N= 1000, O(3N) = 3000, O(N^2) = 1,00,0000

#### Space Complexity

> It measures how much extra space or memory (RAM) an algorithm as size of input grows.
