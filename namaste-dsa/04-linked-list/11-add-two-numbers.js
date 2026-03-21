/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  let sentinel = new ListNode(-1, null);
  let carry = 0,
    prev = sentinel;
  while (l1 !== null || l2 !== null) {
    let sum = (l1?.val ?? 0) + (l2?.val ?? 0) + carry;
    let newVal = sum % 10;
    carry = parseInt(sum / 10);
    const newNode = new ListNode(newVal, null);
    prev.next = newNode;
    prev = newNode;
    if (l1) l1 = l1.next;
    if (l2) l2 = l2.next;
  }
  if (carry) prev.next = new ListNode(carry, null);
  return sentinel.next;
};
