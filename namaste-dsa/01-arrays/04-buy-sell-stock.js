/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  if (prices.length <= 1) {
    return 0;
  }

  let maxProfit = 0;
  // i = day to buy, j = day to sell
  for (let i = 0, j = 0; j < prices.length; ++j) {
    const profit = prices[j] - prices[i];
    if (profit > maxProfit) {
      maxProfit = profit;
    } // this means, we may get more profit if we change the buying day
    if (profit < 0) {
      i = j;
    }
  }

  return maxProfit;
};
