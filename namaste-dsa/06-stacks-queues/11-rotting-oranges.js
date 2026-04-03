/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function (grid) {
  const rows = grid.length,
    cols = grid[0].length;
  let rottedQueue = [],
    freshCount = 0,
    minutes = 0;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === 2) {
        rottedQueue.push([i, j]);
      }
      if (grid[i][j] === 1) {
        ++freshCount;
      }
    }
  }

  // If no rotted oranges or fresh oranges
  if (freshCount === 0) return 0;
  if (!rottedQueue.length) return -1;

  while (rottedQueue.length > 0) {
    let currRottedOranges = rottedQueue.length;
    if (freshCount === 0) return minutes;
    for (let i = 0; i < currRottedOranges; i++) {
      const [i, j] = rottedQueue.shift();

      if (i + 1 < rows && grid[i + 1][j] === 1) {
        grid[i + 1][j] = 2;
        rottedQueue.push([i + 1, j]);
        --freshCount;
      }
      if (j + 1 < cols && grid[i][j + 1] === 1) {
        grid[i][j + 1] = 2;
        rottedQueue.push([i, j + 1]);
        --freshCount;
      }

      if (i - 1 >= 0 && grid[i - 1][j] === 1) {
        grid[i - 1][j] = 2;
        rottedQueue.push([i - 1, j]);
        --freshCount;
      }

      if (j - 1 >= 0 && grid[i][j - 1] === 1) {
        grid[i][j - 1] = 2;
        rottedQueue.push([i, j - 1]);
        --freshCount;
      }
    }
    ++minutes;
  }

  if (freshCount !== 0) return -1;
  return minutes;
};
