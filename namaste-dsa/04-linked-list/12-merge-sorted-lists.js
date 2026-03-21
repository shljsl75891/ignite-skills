/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function(list1, list2) {
    let senitnel = new ListNode(0, null), prev = senitnel;

    while(list1 && list2) {
        let newNode;
        if(list1.val < list2.val){
             newNode = new ListNode(list1.val, null);
            list1 = list1.next;
        } else {
             newNode = new ListNode(list2.val, null);
            list2 = list2.next;
        }

        prev.next = newNode;
        prev = prev.next;
    }

    // if list2 is exhausted
    if(list1) {prev.next = list1}
    // if list1 is exhausted
    if(list2) {prev.next = list2}

    return senitnel.next; 
};
