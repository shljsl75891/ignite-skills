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

The insertion sorting algorithm is inspired by the way we sort playing cards in our hands. We start with an empty left hand and the cards face down on the table. We then pick up the cards one at a time with our right hand and insert them into the correct position in our left hand. Similarly, in insertion sort, we divide the array into a sorted and an unsorted part. We take elements one by one from the unsorted part and insert them into the correct position in the sorted part. Gradually, all elements are moved to their correct position in the sorted part, and the entire array becomes sorted.

- Time Complexity: O(n<sup>2</sup>)
- Space Complexity: O(1)

### Merge Sort

It is a **Divide and Conquer** algorithm. In DSA, this means we divide the bigger problem into smaller subproblems, and conquer the problem successively.

![](/assets/2026-03-18-23-52-21.png)

This small piece of code is doing many things beautifully using recursion.

- Time Complexity: O(n log<sub>2</sub>n)

> O(log<sub>2</sub>n) (divide) x O(n) (merging)

- Space Complexity: O(n)

> While merging, we are creating a temporary array to hold the sorted elements of given array size in worst case
