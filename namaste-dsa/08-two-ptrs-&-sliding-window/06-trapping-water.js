/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  const N = height.length;
  let trappedWater = 0;
  let leftMax = Array(N).fill(height[0]);
  let rightMax = Array(N).fill(height[N - 1]);

  for (let i = 1, j = N - 2; i < N && j >= 0; i++, j--) {
    leftMax[i] = Math.max(leftMax[i - 1], height[i]);
    rightMax[j] = Math.max(rightMax[j + 1], height[j]);
  }

  for (let i = 0; i < N; i++) {
    trappedWater += Math.min(leftMax[i], rightMax[i]) - height[i];
  }

  return trappedWater;
};
