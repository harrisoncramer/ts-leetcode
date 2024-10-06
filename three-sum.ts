/*
Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0. Notice that the solution set must not contain duplicate triplets.

Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]

Solution: The key insight here is to sort the input array, then iterate through from left to right. For each i value, you can do two sum on the rest of the array with the two-pointer approach we used from two-sum-ii.

Time complexity: O(n^2)
Space complexity: O(1)

*/

import { test } from "./_test"

function threeSum(nums: number[]): number[][] {
  const response: number[][] = []
  nums.sort((a,b) => a - b)
  for(const [i, first] of nums.entries()) {
    if (i > 0 && first === nums[i - 1]) continue /* If we have already processed this number, skip the duplicate */
    let p1 = i + 1
    let p2 = nums.length - 1
    while (p1 < p2) {
      const value = nums[p1] + nums[p2] + first
      if(value > 0) p2--
      else if(value < 0) p1++
      else { 
        response.push([first, nums[p1], nums[p2]])
        /* When we add a result, shift over one of our pointers until it's 
          * pointing at a new value (if there are duplicates). The above else/if
          * logic will take care of updating the p2 pointer */
        p1 += 1
        while(nums[p1] === nums[p1 - 1] && p1 < p2) p1 += 1
      }
    }
  }

  return response
};

const testCases = [
  {
    input: [[-1,0,1,2,-1,-4]],
    want: [[-1,-1,2], [-1,0,1]],
  },
  {
    input: [[0,1,1]],
    want: [],
  },
  {
    input: [[-2,0,1,1,2]],
    want: [[-2,0,2], [-2,1,1]]
  },
  {
    input: [[-4, -2, -1, 0, 1, 2, 3, 4]],
    want: [[-4, 0, 4], [-4, 1, 3], [-2, -1, 3], [-2, 0, 2], [-1, 0, 1]],
  }
]

test(testCases, threeSum)
