/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function (headA, headB) {
  let tempA = headA,
    tempB = headB;
  while (tempA !== null && tempB !== null) {
    tempA = tempA.next;
    tempB = tempB.next;
  }
  // The shorter list be exhausted first, so we will calculate the extra starting distance of runner who need to cover longer distance
  let extraNodes = 0,
    isALonger = false;
  while (tempA !== null) {
    isALonger = true;
    tempA = tempA.next;
    ++extraNodes;
  }
  while (tempB !== null) {
    tempB = tempB.next;
    ++extraNodes;
  }
  console.log("isALonger", isALonger);
  console.log("extraNodes", extraNodes);
  ((tempA = headA), (tempB = headB));
  if (isALonger) {
    while (extraNodes > 0) {
      tempA = tempA.next;
      --extraNodes;
    }
  } else {
    while (extraNodes > 0) {
      tempB = tempB.next;
      --extraNodes;
    }
  }
  // Now, both runners have equal distance left to be covered
  while (tempA !== null) {
    if (tempA === tempB) {
      return tempA;
    }
    tempA = tempA.next;
    tempB = tempB.next;
  }
  return null;
};
