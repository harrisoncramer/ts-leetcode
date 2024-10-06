/* Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number. There is exactly one solution, and you may not use the same element twice. You must use constant space. 

Solution: This is a simple two-pointer approach. We know to use a two-pointer approach because it's sorted, and we know there's a valid solution. We can just iterate our pointers until we find a match, starting them at the edges.

Time: O(n)
Space: O(1)
*/

import { test } from "./_test"

function twoSum(numbers: number[], target: number): number[] {
  let i = 0;
  let j = numbers.length - 1;
  while(i < j) {
    const total = numbers[i] + numbers[j];
    if (total === target) return [i, j];
    if(total < target) i++
    else j--
  }
  throw new Error("Must be given array with solution")
};

const testCases = [
  {
    input: [[2, 3, 7, 10, 18, 20, 39], 28],
    want: [3, 4],
  },
  {
    input: [[2, 3, 7, 10, 18, 20, 39], 38],
    want: [4, 5],
  },
  {
    input: [[3, 5, 8, 10], 8],
    want: [0, 1]
  }
]

test(testCases, twoSum)
