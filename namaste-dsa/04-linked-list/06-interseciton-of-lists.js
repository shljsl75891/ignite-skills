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

/**
 * Above approach can be done in one pass as well, by using two pointers.
 * The analogy behind this approach is that, while moving two pointers with same speed, whenever one pointer reaches the end of a list (always shorter list),
 * we redirect it to the head of longer list. Then, we will do the same for other pointer. After second pointer switches to the shorter list,
 * they will now need to cover the same distance to reach the intersection point or `null` if there is no intersection.
 *
 * This intiution is same as the slow fast pointer approach, just the difference is that fast have no need to move fast, because one distance is already shorter than the other.
 * If both distances are equal, then they will meet at the intersection point or `null` in first pass itself.
 */
/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function (headA, headB) {
  let ptrA = headA,
    ptrB = headB;
  while (ptrA !== ptrB) {
    if (ptrA === null) {
      ptrA = headB;
      continue;
    }
    if (ptrB === null) {
      ptrB = headA;
      continue;
    }
    ptrA = ptrA.next;
    ptrB = ptrB.next;
  }
  return ptrB;
};
