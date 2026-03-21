/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {
  if (!head) return head;
  let prev = head,
    curr = head.next;
  while (curr) {
    if (prev.val === curr.val) {
      prev.next = curr.next;
      curr.next = null;
      curr = prev.next;
    } else {
      prev = prev.next;
      curr = curr.next;
    }
  }
  return head;
};
