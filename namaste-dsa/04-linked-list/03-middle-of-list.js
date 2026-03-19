/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var middleNode = function (head) {
  let slow = head,
    fast = head;
  while (fast.next != null) {
    slow = slow.next;
    fast = fast.next.next;
    if (fast === null) return slow;
  }
  return slow;
};
