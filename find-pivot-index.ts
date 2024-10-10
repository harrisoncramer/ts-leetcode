/*
Given an array of integers nums, calculate the pivot index of this array. The pivot index is the index where the sum of all the numbers strictly to the left of the index is equal to the sum of all the numbers strictly to the index's right.

If the index is on the left edge of the array, then the left sum is 0 because there are no elements to the left. This also applies to the right edge of the array. Return the leftmost pivot index. If no such index exists, return -1.

Solution: Get the total of all elements. We know that the pivot index 

Time complexity: O(n)
Space complexity: O(1)

*/

import { test } from "./_test"

function pivotIndex(nums: number[]): number {
  const total = nums.reduce((agg, c) => agg + c, 0) // Get the total of all the elements 

  let leftSum = 0
  for(let i = 0; i < nums.length; i++) {            // Take each element...
    const rightSum = total - leftSum - nums[i];     // Calculate the right sum by removing the leftSum + current value
    if(leftSum === rightSum) return i               // If the two match, the two sides are even at this point, return i
    leftSum += nums[i];                             // Otherwise, add this value to the leftSum
  }

  return -1 // If we don't find it, return -1
};

const testCases = [
  {
    input:  [[1,7,3,6,5,6]],
    want: 3
  },
  {
    input:  [[1,2,3]],
    want: -1
  },
  {
    input:  [[1,1,1,1,1]],
    want: 2 
  },
  {
    input: [[2,1,-1]],
    want: 0,
  },
]

test(testCases, pivotIndex)
