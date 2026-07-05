/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  let p1 = 0,
    p2 = height.length - 1,
    maxArea = 0;
  while (p1 !== p2) {
    const area = Math.abs(p1 - p2) * Math.min(height[p1], height[p2]);
    maxArea = Math.max(area, maxArea);
    if (height[p1] <= height[p2]) {
      p1++;
    } else {
      p2--;
    }
  }
  return maxArea;
};
