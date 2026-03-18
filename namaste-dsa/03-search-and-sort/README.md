## Searching Algorithms

### Linear Search

- Time Complexity: O(n)
- Space Complexity: O(1)

### Binary Search

- Time Complexity: O(log<sub>2</sub>n)
- Space Complexity: O(1)

> It is only applicable on sorted arrays

## Sorting Algoritms

### Bubble Sort

Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.

- Time Complexity: O(n<sup>2</sup>)
- Space Complexity: O(1)

> Bubble sort is named 'bubble sort' because in this algorithm, during each iteration, the largest element bubbles up to the end of the array. As iterations progress, the largest elements continue bubbling up to their final positions at the end of the array, and smaller elements gradually bubbles up to beginning of the array.

> [!TIP]
> Please see the commit history and code of bubble sort to know about few optimization that can be done.

### Selection Sort

Selection sort is just like thinking like normal brute force approach for sorting. In this, we iterate over array, keep maintain minimum element, and then keep swapping it if any smaller element is found. After first iteration, the smallest element will be at the beginning of the array, after second iteration, the second smallest element will be at the second position and so on.

- Time Complexity: O(n<sup>2</sup>)
- Space Complexity: O(1)

> [!TIP]
> A slight optimization in selection sort can be done that we can skip the swapping if the assumed minimum element is already at the correct position.

### Insertion Sort

### Merge Sort
