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
var swapPairs = function (head) {
  if (!head || !head.next) return head;
  let odd1 = head,
    odd2 = head.next.next;
  head = head.next;
  while (odd2?.next) {
    let adjacent = odd1.next;
    odd1.next = odd2.next;
    adjacent.next = odd1;
    odd1 = odd2;
    odd2 = odd2.next.next;
  }
  if (odd1.next) {
    odd1.next.next = odd1;
  }
  odd1.next = odd2;
  return head;
};
