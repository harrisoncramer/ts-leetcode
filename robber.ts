/*
You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.

Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.
*/

import { test } from "./_test"

function rob (nums: number[]): number {
  let maxSoFar = 0;
  for(const [i, n] of nums.entries()) {
    maxSoFar = Math.max(maxSoFar, n + (nums[i - 2] || 0))
    nums[i] = maxSoFar
  }

  return nums[nums.length - 1];
}

const testCases = [
  {
    input: [[1,2,3,1]],
    want: 4,
  },
  {
    input: [[2,7,9,3,1]],
    want: 12,
  },
  {
    input: [[3,1,6,4]],
    want: 9,
  },
  {
    input: [[1,3,1,3,100]],
    want: 103,
  },
  {
    input: [[3,5,3]],
    want: 6,
  }
]

test(testCases, rob)
