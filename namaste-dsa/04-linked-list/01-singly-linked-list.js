function Node(val) {
  this.val = val;
  this.next = null;
}

var MyLinkedList = function () {
  this.head = null;
};

/**
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function (index) {
  let i = 0,
    currentNode = this.head;
  while (currentNode !== null) {
    if (i === index) {
      return currentNode.val;
    }
    currentNode = currentNode.next;
    i++;
  }
  return -1;
};

/**
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function (val) {
  // if list is empty
  if (this.head === null) {
    this.head = new Node(val);
  } else {
    const prevHead = this.head;
    this.head = new Node(val);
    this.head.next = prevHead;
  }
};

/**
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function (val) {
  if (this.head === null) {
    this.head = new Node(val);
  } else {
    let currentNode = this.head;
    while (currentNode.next !== null) {
      currentNode = currentNode.next;
    }
    currentNode.next = new Node(val);
  }
};

/**
 * @param {number} index
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function (index, val) {
  if (index === 0) return this.addAtHead(val);
  let i = 0,
    currentNode = this.head;
  while (currentNode !== null) {
    if (i === index - 1) {
      let newNode = new Node(val);
      newNode.next = currentNode.next;
      currentNode.next = newNode;
      break;
    } else {
      currentNode = currentNode.next;
      i++;
    }
  }
};

/**
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function (index) {
  if (this.head === null) return;
  if (index === 0) {
    const newHead = this.head.next;
    this.head.next = null;
    this.head = newHead;
    return;
  }
  let i = 0,
    currentNode = this.head;
  while (currentNode.next !== null) {
    if (i === index - 1) {
      const nodeToBeDeleted = currentNode.next;
      currentNode.next = nodeToBeDeleted.next;
      nodeToBeDeleted.next = null;
      break;
    } else {
      currentNode = currentNode.next;
      i++;
    }
  }
};

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * var obj = new MyLinkedList()
 * var param_1 = obj.get(index)
 * obj.addAtHead(val)
 * obj.addAtTail(val)
 * obj.addAtIndex(index,val)
 * obj.deleteAtIndex(index)
 */
