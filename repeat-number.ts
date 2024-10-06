/*

Given a non-empty array of integers nums, every element appears twice except for one. Find that single one. You must implement a solution with a linear runtime complexity and use only constant extra space.

Best Solution #3: Using XOR

We know that we cannot scale the memory we're using, so lists, hashmaps, and other data structures like that to keep track of what we've seen are immediately out of the question. Sorting is also out, since it's ONLog(n). In other words, we are told to find a solution by iterating through the array -- O(n) -- and not scaling our memory.

We can use bitmasks as a way to "remember" previous numbers we've seen. The xOr operator (the ^ symbol in Javascript) will take two binary numbers and return an "OR" operation at each bit. This is helpful because when using the operator with two identical numbers, the identical bits will all cancel out (1 ^ 1 = 0, and 0 ^ 0 = 0). That means that we'll do xOr of all bits in the unique number against the cancelled zeros from the other numbers, which will just return the bits from the unique number.

101 // Aka "5"
100 // Aka "4", etc...
100
110
110

101 // Now, it's an XOR comparing 101 to 000, which results in just 101.
000
000
000
000

*/

import { test } from "./_test"

/*
Naive Solution #1: Sorting. Sort the input (O N-Log(n) time complexity) then iterate through checking each value against the next value in the list.

Time Complexity: O N(LogN)
Space Complexity: O(1)
*/

function singleNumberSort(nums: number[]): number {
  nums.sort()
  for(let i = 0; i < nums.length; i += 2) {
    if(nums[i] !== nums[i + 1]) return nums[i]
  }

  return -1
};


/*

Naive Solution #2: Hash Set. Iterate through the input, and for each value, check if it's already in your set. If it is, delete it, since you know it's occurred twice. If you don't see it already, add it to the set. At the end, return the set's value.

Time Complexity: O(N)
Space Complexity: O(N)

*/
function singleNumberSet(nums: number[]): number {
  const set = new Set<number>()
  for(const n of nums) {
    if(set.has(n)) set.delete(n)
    else set.add(n)
  }
  return set.values().next().value
}

function singleNumberXOr(nums: number[]): number {
  return nums.reduce((agg, val) => agg ^ val, 0) // XOR repeatedly...
};

const testCases = [
  {
    input: [[1,2,1,3,2,4,4]],
    want: 3
  },
  {
    input: [[4,1,2,1,2]],
    want: 4
  },
  {
    input: [[2,2,1]],
    want: 1
  },
  {
    input: [[2,2,3,3,4,4,5]],
    want: 5
  },
  {
    input: [[1]],
    want: 1
  }
]

test(testCases, singleNumberSort)
test(testCases, singleNumberSet)
test(testCases, singleNumberXOr)
