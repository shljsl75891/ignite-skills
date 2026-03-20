/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function (head) {
  if (head.next === null) {
    return true;
  }
  const midPoint = middle(head);

  let current = head;
  while (current.next !== midPoint) {
    current = current.next;
  }
  current.next = null;
  let reversedHead = reverseList(midPoint);
  current = head;

  while (current !== null) {
    if (current.val !== reversedHead.val) {
      return false;
    }
    current = current.next;
    reversedHead = reversedHead.next;
  }
  return true;
};

var middle = function (head) {
  let slowPtr = head,
    fastPtr = head;

  while (fastPtr !== null) {
    if (fastPtr.next === null) {
      return slowPtr;
    }
    slowPtr = slowPtr.next;
    fastPtr = fastPtr.next.next;
  }
  return slowPtr;
};

var reverseList = function (head) {
  let prev = head,
    curr = head.next;
  while (curr !== null) {
    let temp = curr.next;
    curr.next = prev;
    if (prev === head) {
      prev.next = null;
    }
    prev = curr;
    curr = temp;
  }
  return prev;
};
