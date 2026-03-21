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

// Using concept of sentinel node, we can solve this problem in one pass. We will maintain two pointers, fast and slow. We will move the fast pointer n steps ahead of the slow pointer. Then we will move both pointers one step at a time until the fast pointer reaches the end of the list. At this point, the slow pointer will be pointing to the node just before the node we want to delete. We can then update the next pointer of the slow node to skip the node to be deleted.
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
  let sentinel = new ListNode(0, head);
  let slow = (fast = sentinel);
  for (let i = 0; i < n; i++) {
    fast = fast.next;
  }
  while (fast.next !== null) {
    slow = slow.next;
    fast = fast.next;
  }

  slow.next = slow.next.next;
  return sentinel.next;
};
