/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  let size = sizeOfList(head);
  let idxToBeDeleted = size - n;
  if (idxToBeDeleted === 0) {
    let temp = head;
    head = head.next;
    temp.next = null;
  }
  let currentNode = head,
    i = 0;
  while (currentNode !== null) {
    if (i === idxToBeDeleted - 1) {
      let temp = currentNode.next;
      currentNode.next = temp.next;
      temp.next = null;
      break;
    }
    currentNode = currentNode.next;
    i++;
  }
  return head;
};

function sizeOfList(head) {
  let slow = (fast = head),
    i = 0;
  while (fast && fast.next) {
    ++i;
    slow = slow.next;
    fast = fast.next.next;
  }
  i *= 2;
  const size = fast ? i + 1 : i;
  return size;
}
