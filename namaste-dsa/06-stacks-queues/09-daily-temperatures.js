/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function (temperatures) {
  let stack = [temperatures.length - 1];
  const result = Array(temperatures.length).fill(0);

  for (let i = temperatures.length - 2; i >= 0; i--) {
    while (stack.length) {
      const top = stack[stack.length - 1];
      if (temperatures[i] < temperatures[top]) {
        result[i] = top - i;
        break;
      }
      stack.pop();
    }
    stack.push(i);
  }
  return result;
};
