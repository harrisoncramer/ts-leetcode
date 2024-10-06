/* You are given an array prices where prices[i] is the price of a given stock on the ith day. Return the max profit you can get.

Solution: This is a classic sliding window problem. Initialize two pointers sell and buy, get the difference, and if it's larger than your maximum profit, update it. When your profit goes negative (e.g. selling for more than you buy) it means that you can actually buy it at the current price for LESS than your original buy, so move the buy pointer up. Another way of looking at this is that whenever you encounter a time where the cost of buying is cheaper than your current buy, you should update it!

*/

import { test } from "./_test"

function maxProfit (stocks: number[]): number {
  if(stocks.length <= 1) return 0
  let profit = 0
  let buy = 0
  for(let sell = 1; sell < stocks.length; sell++) {
    const newProfit = stocks[sell] - stocks[buy]
    profit = Math.max(profit, newProfit)
    if (newProfit <= 0) buy = sell
  }
  return profit
}

// This solution is very similar except
function maxProfitKadaneAlgo (vals: number[]) {
  let maxSoFar = 0
  let smallest = vals[0]
  for(let i = 0; i < vals.length; i++) {
    const val = vals[i]
    const profit = val - smallest
    if (profit > maxSoFar) maxSoFar = profit
    if (val < smallest) smallest = val
  }
  return maxSoFar
}

const testCases = [
  {
    input: [[9, 3, 1, 20, 6]],
    want: 19
  },
  {
    input: [[7, 1, 5, 3, 6, 4]],
    want: 5
  },
  {
    input: [[7, 6, 4, 3, 1]],
    want: 0
  },
  {
    input: [[1, 2, 3, 4, 5]],
    want: 4
  },
  {
    input: [[1]],
    want: 0
  },
  {
    input: [[]],
    want: 0
  },
  {
    input: [[9, 10, 8, 7, 6, 15, 1, 20]],
    want: 19
  }
];

test(testCases, maxProfit)
test(testCases, maxProfitKadaneAlgo)
