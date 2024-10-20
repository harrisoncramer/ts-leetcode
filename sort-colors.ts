/* 
Given an array nums with n objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue.

We will use the integers 0, 1, and 2 to represent the color red, white, and blue, respectively. You must solve this problem without using the library's sort function.

Solution: The input here can be sorted using the "Dutch Flag" algorithm, which uses three pointers to swap elements. The middle pointer moves through the list, and will swap with the left and right pointers when it encounters values greater or less.

The middle pointer moves when it swaps with the 

  m
  l              h
[ 2, 0, 2, 1, 1, 0 ]

  m
  l              h   <- Swaps with high
[ 0, 0, 2, 1, 1, 2 ]

  m
  l           h      <- High moves over, since we know "2" is in the right spot
[ 0, 0, 2, 1, 1, 2 ]

  m
  l           h      <- Zero swap is a "no-op" since they are at the same point
[ 0, 0, 2, 1, 1, 2 ]

     m
     l        h      <- Same, no-op
[ 0, 0, 2, 1, 1, 2 ]

        m
        l     h      <- High swaps
[ 0, 0, 1, 1, 2, 2 ]

           m
        l     h      <- One, no swap, just move over mid
[ 0, 0, 1, 1, 2, 2 ]

              m
        l     h      <- One, no swap, just move over mid
[ 0, 0, 1, 1, 2, 2 ]

*/
import { test } from "./_test"

function sortColors (nums: number[]): number[] {
  let low = 0, mid = 0;
  let high = nums.length - 1
  while(mid <= high) {
    if(nums[mid] === 0) {
      [nums[low], nums[mid]] = [nums[mid], nums[low]];
      mid++
      low++
    } else if(nums[mid] === 2) {
      [nums[high], nums[mid]] = [nums[mid], nums[high]];
      high--
    } else if(nums[mid] === 1) {
      mid++
    }

    console.log(nums, "\n")
  }


  return nums
}

const testCases = [
  {
    input: [[2,0,2,1,1,0]],
    want: [0,0,1,1,2,2],
  },
  {
    only: true,
    input: [[1,1,2,2,0,0]],
    want: [0,0,1,1,2,2],
  },
 {
    input: [[2,0,1]],
    want: [0,1,2]
  }
]

test(testCases, sortColors);
