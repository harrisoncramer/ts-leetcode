/*
Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].

The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

You must write an algorithm that runs in O(n) time and without using the division operation.

*/

import { test } from "./_test"

function productExceptSelf (nums: number[]): number[] {
  const result: number[] = []
  for(let i = 0; i < nums.length; i++) {
    let localResult = 1
    for(let j = 0; j < nums.length; j++) {
      if(j !== i) localResult = localResult * nums[j]
    }
    result.push(localResult)
  }
  return result
}

const testCases = [
  {
    input: [[1,2,3,4]],
    want: [24,12,8,6],
  },
  {
    input: [[]],
    want: [],
  },
  {
    input: [[1,2,3]],
    want: [6,3,2],
  },
  {
    input: [[1,2]],
    want: [2,1],
  }
]

test(testCases, productExceptSelf)
