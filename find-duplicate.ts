/*
Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive.

There is only one repeated number in nums, return this repeated number.

You must solve the problem without modifying the array nums and using only constant extra space.
*/

import { test } from "./_test"

const testCases = [
  {
    input: [[1,3,2,4,3]],
    want: 3,
  },
  {
    input: [[1,2,3,4,4]],
    want: 4,
  },
  {
    input: [[1,1]],
    want: 1,
  },
  {
    input: [[3,3,3,3,3]],
    want: 3,
  },
  {
    input: [[3,3,3,3,4]], // Expected 10 if we had one of each thing (0,1,2...4)
    want: 3,
  },
  {
    input: [[1,3,4,2,1]],
    want: 1,
  },
  {
    input: [[1,3,4,1,2]],
    want: 1,
  }
]

/*
Brute Force: Check every number against every other number, if they are the same, return the number: Check every number against every other number, if they are the same, return the number.

Time Complexity: O(n^2)
Space Complexity: O(1)

*/
function findDuplicateBruteForce(nums: number[]): number {
   for(let i = 0; i < nums.length; i++)  {
      for(let j = i + 1; j < nums.length; j++) {
        if(nums[i] === nums[j]) return nums[i] 
      }
  }
  return -1
};

test(testCases, findDuplicateBruteForce)
