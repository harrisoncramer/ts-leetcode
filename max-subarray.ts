/* Given an integer array nums, find the subarray with the largest sum, and return its sum. */

import { test } from "./_test"

/* 
Solution: The insight here is to discard any previous values as soon as your total "goes negative." You can achieve this by, in your iteration over the numbers, resetting the current sum of the subarray to zero any time you reach a negative number.
Time Complexity: O(n) 
Space Complexity: O(1) 
This is Kadane's algorithm: https://en.wikipedia.org/wiki/Maximum_subarray_problem
*/
function maxSubArray (input: number[]): number {
  if(input.length === 0) return 0
  let maxTotal = input[0]
  let currentTotal = 0
  for(const n of input) {
    currentTotal += n
    maxTotal = Math.max(maxTotal, currentTotal)
    if(currentTotal <= 0) currentTotal = 0
  }

  return maxTotal
}

const testCases = [
  {
    input: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]],
    want: 6,
  },
  {
    input: [[ 1 ]],
    want: 1,
  },
  {
    input: [[5, 4, -1, 7, 8]],
    want: 23,
  },
  {
    input: [[-1, -2, -3, -4]],
    want: -1,
  },
  {
    input: [[0, -1, 2, 1, -3, 4, -1, 2, 1, -5, 4]],
    want: 6,
  },
  {
    input: [[-2, -3, 4, -1, -2, 1, 5, -3]],
    want: 7,
  },
  {
    input: [[-1]],
    want: -1,
  },
  {
    input: [[]],
    want: 0,
  },
];

test(testCases, maxSubArray)
