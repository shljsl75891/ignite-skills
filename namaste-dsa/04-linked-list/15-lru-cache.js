/** @typedef {Node} {value: number, next: Node, prev: Node} */
/**
 * @param {number} key
 * @param {number} value
 */
function Node(key, value) {
  this.key = key ?? null;
  this.value = value ?? null;
  this.next = this.prev = null;
}
/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.capacity = capacity;
  /** @type {Map<number, Node>} */
  this.valueMap = new Map();
  this.dummyHead = new Node();
  this.dummyTail = new Node();
  this.dummyHead.next = this.dummyTail;
  this.dummyTail.prev = this.dummyHead;
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  let keyNode = this.valueMap.get(key);
  if (!keyNode) {
    return -1;
  }
  // promote it to most recent node
  keyNode.prev.next = keyNode.next;
  keyNode.next.prev = keyNode.prev;
  keyNode.prev = this.dummyHead;
  keyNode.next = this.dummyHead.next;
  this.dummyHead.next.prev = keyNode;
  this.dummyHead.next = keyNode;
  return keyNode.value;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  // If key already exists, change node's value to new value and promote to most recent node
  const existingValue = this.get(key);
  if (existingValue !== -1) {
    this.valueMap.get(key).value = value;
    return;
  }
  // if cache is full, we need to delete the least recent node
  if (this.valueMap.size + 1 > this.capacity) {
    let leastRecentNode = this.dummyTail.prev;
    leastRecentNode.prev.next = leastRecentNode.next;
    leastRecentNode.next.prev = leastRecentNode.prev;
    leastRecentNode.prev = null;
    leastRecentNode.next = null;
    this.valueMap.delete(leastRecentNode.key);
  } // Adding new node as most recent node
  let newNode = new Node(key, value);
  let mostRecentNode = this.dummyHead.next;
  newNode.prev = mostRecentNode.prev;
  mostRecentNode.prev.next = newNode;
  newNode.next = mostRecentNode;
  mostRecentNode.prev = newNode;
  this.valueMap.set(key, newNode);
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
