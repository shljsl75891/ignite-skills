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

// Using concept of sentinel node, we can irradicate the handling of edge cases related of head
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
  let sentinel = new ListNode(0);
  sentinel.next = head;
  let prev = sentinel;
  while (prev.next !== null) {
    if (prev.next.val === val) {
      prev.next = prev.next.next;
    } else {
      prev = prev.next;
    }
  }
  return sentinel.next;
};
