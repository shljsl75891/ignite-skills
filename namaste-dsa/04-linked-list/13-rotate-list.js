/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var rotateRight = function (head, k) {
  if (!head || !head.next || !k) return head
  let size = 1, temp = head
  while (temp.next) { ++size; temp = temp.next }
  k %= size
  if (!k) return head
  k = size - k - 1
  let prev = head
  while (k--) 
    prev = prev.next
  let newHead = prev.next
  prev.next = null 
  temp.next = head
  return newHead
}
