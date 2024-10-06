import { test } from "./_test";

/* 
A peak element is an element that is strictly greater than its neighbors. Given a set of integers, find a peak.

Consider that nums[i] != nums[i + 1] for all valid i, and that the edges of the array can be considered peaks.

Solution: The key here is in the constraints. We need a solution in Log(n) time, which hints the solution is probably a binary search. Secondly, we know that the nums cannot be sequential, meaning we cannot have [1,1,1] as input. As a result, we know whatever our midpoint is will have two values to the right and left of it that are either higher or lower.

If they are both higher, we have our peak -- return it. If one is higher and the other lower, we know to move toward the higher element, since we know that side of the array will have at least one peak in it. We know this because it's impossible for an ascending line of points to not have a peak in it somewhere. It'll either dip down at some point, or it'll reach the end, which can be considered a peak.

*/

function findPeakElement(nums: number[]): number {
  let left = 0;
  let right = nums.length - 1;
  while(left <= right) {
    const mid = Math.floor((left + right) / 2);
    const rightVal = nums[mid + 1]
    const leftVal = nums[mid - 1]

    // If a local peak, return it!
    if(
      (nums[mid] > rightVal || rightVal === undefined) && 
      (nums[mid] > leftVal || leftVal === undefined)
    ) return mid

    if(nums[mid] < rightVal) left = mid + 1
    else right = mid - 1
  }

  return -1
}

const testCases = [
  {
    input: [[ 1, 2, 3, 1 ]],
    want: 2,
  },
  {
    input: [[1, 1, 1, 3, 5, 6, 4]],
    want: 5,
  },
  {
    input: [[3, 4, 3, 2, 1]],
    want: 1,
  },
  {
    input: [[1, 2, 3, 4, 5]],
    want: 4,
  },
  {
    input: [[5, 4, 3, 2, 1]],
    want: 0,
  },
  {
    input: [[]],
    want: -1,
  },
  {
    input: [[1]],
    want: 0,
  }
];

test(testCases, findPeakElement);
