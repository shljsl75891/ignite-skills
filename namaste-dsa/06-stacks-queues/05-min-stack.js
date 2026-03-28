Array.prototype.top = function () {
  return this[this.length - 1];
};

var MinStack = function () {
  this.stack = [];
  this.minStack = [];
};

/**
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function (val) {
  this.stack.push(val);
  if (this.minStack.length === 0 || this.minStack.top() >= val) {
    this.minStack.push(val);
  }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  const el = this.stack.pop();
  if (this.minStack.top() === el) {
    this.minStack.pop();
  }
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  return this.stack.top();
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
  return this.minStack.top();
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */

/** Optimized implementation */

Array.prototype.top = function () {
  return this[this.length - 1];
};

var MinStack = function () {
  this.stack = [];
};

/**
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function (val) {
  const currentMinimum = this.stack.top()?.[1] ?? val;
  this.stack.push([val, Math.min(currentMinimum, val)]);
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  this.stack.pop()?.[0];
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  return this.stack.top()?.[0];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
  return this.stack.top()?.[1];
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */
