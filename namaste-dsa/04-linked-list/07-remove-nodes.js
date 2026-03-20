/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function (head, val) {
  let prev = null,
    curr = head;
  while (curr !== null) {
    if (curr.val === val) {
      let temp = curr;
      if (!prev) {
        curr = curr.next;
        head = head.next;
      } else {
        prev.next = curr.next;
        curr = prev.next;
      }
      temp.next = null;
      continue;
    }
    prev = curr;
    curr = prev.next;
  }
  return head;
};
