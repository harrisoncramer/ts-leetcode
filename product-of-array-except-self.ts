/*
Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i]. The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer. You must write an algorithm that runs in O(n) time and without using the division operation.

*/

import { test } from "./_test"

/*

The naive solution would be a nested loop, which multiplies each number against every other number, except for when the current indexes (i and j) are equal, then pushes that into a result array.

Time Complexity: O(n^2)
Space Complexity: O(1)

*/

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

/*

The faster solution would be to compute a prefix and a postfix multiplier, and then multiply those things together. This works because the value at index "i" is going to be the result of all the prefixes multiplied togehther, times all of the postfixes multiplied together. We can compute arrays that contain these values separately, a prefix array which contains the product of all elements until index "i", and a postfix array, which contains the product of all elements after index "i."

We then iterate through them and multiply the prefixes and the postfixes together.

Time Complexity: O(n)
Space Complexity: O(n)

*/

function productExceptSelf (nums: number[]): number[] {
  const prefixArray = new Array(nums.length).fill(1) // Build arrays with "1" at each position (no-op when doing multiplication)

  let prefixMultiplier = 1
  for(let i = 1; i < nums.length; i++) {              // For the prefix array, we can start at the second value
    prefixMultiplier = prefixMultiplier * nums[i - 1] // Update the multiplier by multiplying it with the previous element
    nums[i] = prefixMultiplier                        // Set that result into our prefix array
  }

  let postfixMultiplier = 1
  for(let i = nums.length - 2; i >= 0; i--) {           // For the postfix array, we can start at the second-to-last value
    postfixMultiplier = postfixMultiplier * nums[i + 1] // Same calculation as above, except we're using +1
    prefixArray[i] = prefixArray[i] * postfixMultiplier // prefix x postfix = result!
  }

  return prefixArray
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

test(testCases, productExceptSelfNaive)
test(testCases, productExceptSelf)
