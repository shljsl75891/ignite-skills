var MyStack = function() {
    this.q1 = [];
};

/** 
 * @param {number} x
 * @return {void}
 */
MyStack.prototype.push = function(x) {
    this.q1.push(x);
};

/**
 * @return {number}
 */
MyStack.prototype.pop = function() {
    const size = this.q1.length;

    for(let i = 0; i< size-1; i++) {
        const first = this.q1.shift();
        this.q1.push(first);
    }
    return this.q1.shift();
};

/**
 * @return {number}
 */
MyStack.prototype.top = function() {
    const size = this.q1.length;

    for(let i = 0; i< size-1; i++) {
        const first = this.q1.shift();
        this.q1.push(first);
    }
    const el = this.q1.shift();
    this.q1.push(el);
    return el;
};

/**
 * @return {boolean}
 */
MyStack.prototype.empty = function() {
   return this.q1.length === 0;
};

/** 
 * Your MyStack object will be instantiated and called as such:
 * var obj = new MyStack()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.empty()
 */
