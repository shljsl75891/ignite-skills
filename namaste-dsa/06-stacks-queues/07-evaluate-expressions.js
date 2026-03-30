/**
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function (tokens) {
  let stack = [],
    operators = ["+", "-", "*", "/"];
  for (let i = 0; i < tokens.length; i++) {
    if (operators.includes(tokens[i])) {
      const right = stack.pop();
      const left = stack.pop();
      const answer = parseInt(applyOperation(+left, +right, tokens[i]));
      stack.push(answer);
    } else {
      stack.push(tokens[i]);
    }
  }
  return parseInt(stack.pop());
};

function applyOperation(left, right, operator) {
  switch (operator) {
    case "+":
      return left + right;
    case "-":
      return left - right;
    case "/":
      return left / right;
    default:
      return left * right;
  }
}
