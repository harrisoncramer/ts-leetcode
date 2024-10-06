// Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

import { test } from "./_test"

function twoSum (nums: number[], target: number): [number, number]|null {
  const intMap = {}
  for(const [i, num] of nums.entries()) {
    const pair = target - num
    if(intMap[pair] !== undefined) return [intMap[pair], i]
    intMap[num] = i
  }

  return null
}

const testCases = [
  {
    input: [[3,10,2,20,18,7,39], 38],
    want: [3,4],
  },
  {
    input: [[3,10,2,20,18,7,39], 46],
    want: [5,6],
  },
  {
    input: [[3,10,5,8], 100],
    want: null
  }
]

test(testCases, twoSum)
