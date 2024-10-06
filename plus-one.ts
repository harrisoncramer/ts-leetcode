/* You are given a large integer represented as an integer array digits, where each digits[i] is the ith digit of the integer. The digits are ordered from most significant to least significant in left-to-right order. The large integer does not contain any leading 0's. Increment the large integer by one and return the resulting array of digits.

Solution:
*/

import { test } from "./_test"

function plusOne(input: number[]): number {
  let result = 0
  let multipler = 1
  let carry = 0
  // Update last element...
  input[input.length - 1] = input[input.length - 1] + 1
  // Iterate backwards, adding the carry value each time. Then check to see if anything hits 10
  // If it does, reset the carry value to 1. If not, multiply by the multipler
  // and add that to the result. Then update the multiplier
  for(let i = input.length - 1; i >= 0; i--) {
    const count = input[i] + carry
    if(count === 10) {
      carry = 1
    } else {
      result += count * multipler
      carry = 0
    }
    multipler = multipler * 10
  }

  // If you have leftover multipler, add that to theresu 
  if(carry) result += multipler * carry
  return result
}

const testCases = [
  {
    input: [[1,2,3]],
    want: 124,
  },
  {
    input: [[1,2,9]],
    want: 130,
  },
  {
    input: [[9]],
    want: 10,
  },
  {
    input: [[9,9]],
    want: 100,
  },
  {
    input: [[1,9]],
    want: 20,
  }
]

test(testCases, plusOne)
