/* 

Given an integer array nums, rotate the array to the right by k steps, where k is non-negative. 

Naive solution: Get the number of rotations (which is k % nums.length since a fully rotated array is rotating zero times). For each rotation, pop the last element and then unshift it onto the front of the array.

Time complexity: O(n^2)
Space complexity: O(1)

*/

import { test } from "./_test"

function rotateSimple(nums: number[], k: number): number[] {
  k = k % nums.length
  while(k--) nums.unshift(nums.pop()!);
  return nums
};

/*
Better solution: When rotating an array around a rotation point k, we are trying to swap the last k elements to the front of the list.

[1,2,3,4,5], k = 2

We can get part way there by reversing the entire list, like so:

[5,4,3,2,1]

Now, we can see that 5 and 4 are in the first two positions, we just need to reverse from 0 to k, again, to get them in the right place.

[4,5,3,2,1]

Last, we just need to reverse from k to the end of the array to get the rest of the elements in the right place:

[4,5,1,2,3]

If we can write an in-place reversal function, then we just have to write a function that calls it three times and will get an O(n) solution.

Time Complexity: O(n)
Space Complexity: O(1)
*/

function rotateEfficient (nums: number[], k: number): number[] {
  k = k % nums.length
  nums.reverse()
  inPlaceReverse(0, k - 1, nums)
  inPlaceReverse(k, nums.length -1, nums)
  return nums
}
function inPlaceReverse (i: number, j: number, nums: number[]) {
  while(i < j) {
    [nums[i], nums[j]] = [nums[j], nums[i]]
    i++
    j--
  }
}

const testCases = [
  {
    input: [[1,2,3,4,5,6,7], 3],
    want: [5,6,7,1,2,3,4],
  },
  {
    input: [[-1,-100,3,99], 2],
    want:  [3,99,-1,-100],
  },
  {
    input: [[-1,100,3,99], 0],
    want:  [-1,100,3,99],
  },
  {
    input: [[3,-1,-100,99], 1],
    want:  [99,3,-1,-100],
  }
]

test(JSON.parse(JSON.stringify(testCases)), rotateEfficient)
test(JSON.parse(JSON.stringify(testCases)), rotateSimple)
