
/**
Given an integer array nums, move all 0's to the end while maintaining the order of the non-zero elements. Note that you must do this in-place without making a copy of the array. Do not return anything, modify nums in-place instead.
 */

import { test } from "./_test"

/*
Naive Solution: Write a custom sort function that uses a callback that reorders the zero to the back. When encountering a zero, we return -1, otherwise we just return 0, no reodering required.

Time Complexity: O(NLogN)
Space Complexity: O(1)
*/
function moveZeroes(nums: number[]): number[] {
  return nums.sort((_, b) => {
    if(b === 0) return -1
    return 0
  }) 
};

/*

Optimal Solution: Initialize a read pointer at the start of the array. Iterate through all elements.

Initialize a second "write" pointer, which will trail behind the read pointer and only move when it actually writes a non-zero value into it's pointer position.

Save each element into a temporary variable. Overwrite it with a zero. Then, check if the saved value is a non-zero value, if so, write it into the trailing write position and advance the write pointer one place.

Time Complexity: O(n)
Space Complexity: O(1)

Here's a visualization of how this works:

    w
    r
// [0,1,0,3,12]  Start both at zero

    w
      r
// [0,1,0,3,12]  Advance the read pointer

    w
      r
// [0,0,0,3,12]  Overwrite the read pointer with zero, set temporary variable

    w
      r
// [1,0,0,3,12]  Temporary variable is non-zero, write it to the write position

      w
      r
// [1,0,0,3,12]  Advance the write pointer

      w
        r
// [1,0,0,3,12]  Advance the read pointer, write zero, temp variable is zero, so do nothing

      w
          r
// [1,3,0,0,12]  Advance the read pointer, write zero, temp variable is non-zero, write it to write position..

        w
          r
// [1,3,0,0,12]  Move up write pointer...

        w
             r
// [1,3,12,0,0]  Advance the read pointer, see it's a non-zero value, write it to the write position

*/

function moveZeroesOptimal(nums: number[]): number[] {
  let writePointer = 0;
  for (let readPointer = 0; readPointer < nums.length; readPointer++) {
    const curr = nums[readPointer];
    nums[readPointer] = 0;
    if (curr !== 0) {
      nums[writePointer] = curr;
      writePointer++;
    }
  }

  return nums
};

const testCases = [
  {
    input: [[0,1,0,3,12]],
    want: [1,3,12,0,0],
  },
  {
    input: [[0]],
    want: [0],
  },
  {
    input: [[1,2,3]],
    want: [1,2,3],
  }
]

test(JSON.parse(JSON.stringify(testCases)), moveZeroes)
test(JSON.parse(JSON.stringify(testCases)), moveZeroesOptimal)
