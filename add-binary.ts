/* Write a function that takes in two strings a and b, and returns their sum as a binary string */

// For binary addition, we need to keep track of a carry value. The trick here is 
// reversing the input strings so that we can then just iterate through them. For instance,
// if we are going to add 2 + 2 = 4, ("10" + "10" = "100") then we can reverse them to be "01" and "01"
// and now we add the zero's first. Then we add that result to our string on the front.

// "0" -> "how many 1s"
// "00" -> "how many 2s"
// "100" -> how many 4s...

import { test } from "./_test"

function addBinary (a: string, b: string): string {
  let carry = 0
  let result = ""
  a = a.split("").reverse().join("")
  b = b.split("").reverse().join("")
  for(let i = 0; i < Math.max(a.length, b.length); i++) {
    const valA = Number(a[i] || 0)
    const valB  = Number(b[i] || 0)
    let sum = valA + valB + carry
    let char = String(sum % 2) // We want to concatenate "1" if the sum is either 1 or 3, and "0" if the result is zero or 2.
    result = char + result  // Update our result
    carry = sum >= 2 ? 1 : 0
  }

  return carry ? "1" + result : result
}

const testCases = [
  {
    input: ["0", "0"],
    want: "0",
  },
  {
    input: ["1", "0"],
    want: "1",
  },
  {
    input: ["1", "1"],
    want: "10",
  },
  {
    input: ["11", "1"],
    want: "100",
  },
  {
    input: ["11", "11"],
    want: "110",
  },
  {
    input: ["10", "10"],
    want: "100",
  },
]

test(testCases, addBinary)
