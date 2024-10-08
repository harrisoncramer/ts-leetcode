/*
Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].

The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer. You must write an algorithm that runs in O(n) time and without using the division operation.

*/

import { test } from "./_test"

function productExceptSelfNaive (nums: number[]): number[] {
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

function productExceptSelfWithZeros(nums: number[]): number[] {
  let zeroCount = nums.reduce((agg, v) => agg += (v === 0 ? 1 : 0), 0)
  if(zeroCount > 1 || zeroCount === 0) {
    let multiplier = nums.reduce((agg, c) => agg * c, 1)
    for(let i = 0; i < nums.length; i++) {
      if(nums[i] === 0) nums[i] = multiplier
      else nums[i] = multiplier / nums[i]
    }
  } else {
    let multiplier = nums.reduce((agg, c) => {
      if(c === 0) return agg
      return agg * c
    }, 1)
    for(let i = 0; i < nums.length; i++) {
      if(nums[i] === 0) nums[i] = multiplier
      else nums[i] = 0
    }
  }
  return nums
}

function productExceptSelf (nums: number[]): number[] {
  const prefixArray = new Array(nums.length).fill(1)
  const postFixArray = new Array(nums.length).fill(1)
  const result: number[] = []

  let prefixMultiplier = 1
  for(let i = 0; i < nums.length; i++) {
    prefixMultiplier = prefixMultiplier * (nums[i - 1] !== undefined ? nums[i - 1] : 1)
    prefixArray[i] = prefixMultiplier
  }

  let postfixMultiplier = 1
  for(let i = nums.length - 1; i >= 0; i--) {
    postfixMultiplier = postfixMultiplier * (nums[i + 1] !== undefined ? nums[i + 1] : 1)
    postFixArray[i] = postfixMultiplier
  }

  for(let i = 0; i < nums.length; i++) {
    result.push(prefixArray[i] * postFixArray[i])
  }

  return result
} 

const testCases = [
  {
    input: [[1,2,3,4]],
    want: [24,12,8,6],
  },
  {
    input: [[3,2,3,4]],
    want: [24,36,24,18],
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
  },
  {
    only: true,
    input: [[-1,1,0,-3,3]],
    want: [0,0,9,0,0]
  },
  {
    input: [[0,1,0,-3,3]],
    want: [0,0,0,0,0]
  }
]

//test(testCases, productExceptSelfNaive)
//test(testCases, productExceptSelfWithZeros)
test(testCases, productExceptSelf)
