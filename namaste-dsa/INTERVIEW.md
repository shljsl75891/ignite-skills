# Interview Preparation

1. [Power of Two](https://leetcode.com/problems/power-of-two) => [Solution](https://github.com/shljsl75891/ignite-skills/blob/main/namaste-dsa/00-warm-up/04-power-of-two.js)
2. [Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock) => [Solution](https://github.com/shljsl75891/ignite-skills/blob/main/namaste-dsa/01-arrays/04-buy-sell-stock.js)
3. [Missing Number](https://leetcode.com/problems/missing-number) => [Solution](https://github.com/shljsl75891/ignite-skills/blob/main/namaste-dsa/01-arrays/08-missing-number.js)
4. [Single Number](https://leetcode.com/problems/single-number) => [Solution](https://github.com/shljsl75891/ignite-skills/blob/main/namaste-dsa/01-arrays/09-single-number.js)
5. [Middle of the Linked List](https://leetcode.com/problems/middle-of-the-linked-list) => [Solution](https://github.com/shljsl75891/ignite-skills/blob/main/namaste-dsa/04-linked-list/03-middle-of-list.js)
6. [Linked List Cycle](https://leetcode.com/problems/linked-list-cycle) => [Solution](https://github.com/shljsl75891/ignite-skills/blob/main/namaste-dsa/04-linked-list/04-linked-list-cycle.js)
7. [Intersection of Two Linked Lists](https://leetcode.com/problems/intersection-of-two-linked-lists) => [Solution](https://github.com/shljsl75891/ignite-skills/blob/main/namaste-dsa/04-linked-list/06-interseciton-of-lists.js)
8. [Remove Nth Node From End of List](https://leetcode.com/problems/remove-nth-node-from-end-of-list) => [Solution](https://github.com/shljsl75891/ignite-skills/blob/main/namaste-dsa/04-linked-list/08-delete-nth-node-from-end.js)
9. [Add Two Numbers](https://leetcode.com/problems/add-two-numbers) => [Solution](https://github.com/shljsl75891/ignite-skills/blob/main/namaste-dsa/04-linked-list/11-add-two-numbers.js)
10. [Evaluate Reverse Polish Notation](https://leetcode.com/problems/evaluate-reverse-polish-notation) => [Solution](https://github.com/shljsl75891/ignite-skills/blob/main/namaste-dsa/06-stacks-queues/07-evaluate-expressions.js)
11. [Next Greater Element I](https://leetcode.com/problems/next-greater-element-i) => [Solution](https://github.com/shljsl75891/ignite-skills/blob/main/namaste-dsa/06-stacks-queues/08-next-greater-element-1.js)
12. [Isomorphic Strings](https://leetcode.com/problems/isomorphic-strings) => [Solution](https://github.com/shljsl75891/ignite-skills/blob/main/namaste-dsa/05-strings/10-isomorphic-strings.js)
13. [Group Anagrams](https://leetcode.com/problems/group-anagrams) => [Solution](https://github.com/shljsl75891/ignite-skills/blob/main/namaste-dsa/05-strings/10-group-anagrams.js)
14. [Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array) => [Solution](https://github.com/shljsl75891/ignite-skills/blob/main/namaste-dsa/07-binary-search/03-search-in-rotated-sorted.js)
15. [Single Element in a Sorted Array](https://leetcode.com/problems/single-element-in-a-sorted-array) => [Solution](https://github.com/shljsl75891/ignite-skills/blob/main/namaste-dsa/07-binary-search/08-single-element-in-sorted-array.js)

## Miscellaneous Approaches

This problem can be resolved by following approaches:

- **Sum Approach**: Calculate the expected sum of the first n natural numbers and subtract the actual sum of the array. The difference will be the missing number. This has limitations with large numbers due to integer overflow and is not suitable for multiple missing numbers.
- **XOR Approach**: XOR all the numbers in the array and XOR the result with the numbers from 0 to n. The final result will be the missing number. But, this still have limitation of multiple missing numbers.
- **Mutating same array**: Iterate through the array and for each number, mark the index corresponding to that number as negative. Then iterate through the array again and check which index is positive, that index will be the missing number. This approach has a limitation of mutating the input array, but can resolve all above issues except negative elements.

```javascript
function findMissingOneToN(nums) {
  // Add a placeholder to handle 1-based indexing
  nums.push(1);
  const n = nums.length;

  // Flip signs to negative at the target indices
  for (let i = 0; i < n - 1; i++) {
    let val = Math.abs(nums[i]);
    if (val < n) {
      nums[val] = -Math.abs(nums[val]);
    }
  }

  // The index that remains positive is the missing number
  for (let i = 1; i < n; i++) {
    if (nums[i] > 0) {
      return i;
    }
  }
  return n;
}
```

- **HashMap Approach**: Use hash map to store the number of occurrences of each number in the array. Then iterate through the numbers and check which has 0 occurrences. This approach has a limitation of space complexity, but resolves all above issues.
