import { binarySearchMost } from "./_binary-search";
import { test } from "./_test"

/*
There is an integer array nums sorted in ascending order (with distinct values).

Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k (1 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,5,6,7] might be rotated at pivot index 3 and become [4,5,6,7,0,1,2].

Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.

You must write an algorithm with O(log n) runtime complexity.

Solution: Use two binary searches! 

Use one binary search to find the pivot point, then another to search on the section of the array that is relevant to your target.

To find the pivot point, the binary search function should return the rightmost element that's larger than the last element in the array.

With rotated sorted arrays, the last element in the array will always be smaller than the number at the pivot point. This is because when we rotate the elements, we are always "chopping" off some elements from the end of the array and tacking on to the start. Before we do this, the last element in our sorted array is the largest element in the list. After, every element in the chopped segment will still be larger than our last value, and the last value in that chopped segment will be the largest element in our list. Hence, we want the rightmost element from that subset.

Next, we run that same binary search over one of the two chunks. The predicate function also takes in a left and right pointer which it uses to operate on a subset of the total array. If our target is greater than the last value, we know it must be in the chopped portion, so we can search from zero --> pivot index. If the value is less, it must be to the unchopped portion, so from pivot index to the end of the array.

*/

function search(nums: number[], target: number) {
    if (nums.length === 0) return -1;
    const lastVal = nums[nums.length - 1];
    const maxIdx = binarySearchMost(nums, n => n > lastVal)
    const targetIdx = target > lastVal ? 
      binarySearchMost(nums, (n) => n <= target, 0, maxIdx) : // If last val is less, search in the "chopped" part of the array
      binarySearchMost(nums, (n) => n <= target, maxIdx + 1 % nums.length, nums.length - 1) // Look in the right chunk of the array
    return nums[targetIdx] === target ? targetIdx : -1
}


const testCases = [
  {
    input: [[2,3,4,5,6,1], 4],
    want: 2,
  },
  {
    input: [[0,1,2,3,4,5], 3],
    want: 3,
  },
  {
    input: [[4,5,6,7,8,1,2], 5],
    want: 1
  },
  {
    input: [[4,5,6,7,8,9,10,0,1,2], 6],
    want: 2, 
  },
  {
    input: [[4,5,6,7,0,1,2], 0],
    want: 4,
  },
  {
    input: [[1,2,3,4,5], 2],
    want: 1,
  },
  {
    input: [[4,5,6,7,0,1,2], 3],
    want: -1
  },
  {
    input: [[1], 0],
    want: -1,
  },
  {
    input: [[1,3], 2],
    want: -1,
  },
]

test(testCases, search)
