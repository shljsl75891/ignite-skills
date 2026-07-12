/**
 * O(N) = Memory solution
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

/**
 * O(1) = Memory solution
 * @param {number[]} height
 * @return {number}
 *
 * The water trapped at any point will be according to the minimum height of left and right container.
 */
var trap = function (height) {
  let trappedWater = 0;
  let left = 0,
    right = height.length - 1;
  let leftMax = height[left],
    rightMax = height[right];
  while (left < right) {
    // water will be filled according to left container
    if (height[left] < height[right]) {
      leftMax = Math.max(height[left], leftMax);
      trappedWater += leftMax - height[left++];
      // water will be filled according to right container
    } else {
      rightMax = Math.max(height[right], rightMax);
      trappedWater += rightMax - height[right--];
    }
  }
  return trappedWater;
};
