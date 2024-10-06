/* Suppose you have n versions [1, 2, ..., n] and you want to find out the first bad one, which causes all the following ones to be bad. You are given an API bool isBadVersion(version) which returns whether version is bad. Implement a function to find the first bad version. You should minimize the number of calls to the API.

Solution: The solution here is basically a binary search looking for the maximum that gives an answer.

Time complexity: O(logN)
Space complexity: O(1)

*/

import { binarySearchMost } from "./_binary-search"

type Version = {
  isGood: boolean
}

function firstBadVersion(versions: Version[]) {
  return binarySearchMost(versions, (val) => !val.isGood)
}

const testCases = [
  {
    values: [
      { isGood: false },
      { isGood: false },
      { isGood: false },
      { isGood: false },
      { isGood: false },
      { isGood: false },
      { isGood: true },
      { isGood: true },
      { isGood: true },
    ],
    expected: 5,
  },
  {
    values: [
      { isGood: false },
      { isGood: false },
      { isGood: false },
      { isGood: false },
      { isGood: false },
    ],
    expected: 4,
  },
  {
    values: [
      { isGood: true },
      { isGood: true },
      { isGood: true },
      { isGood: true },
      { isGood: true },
    ],
    expected: -1,
  },
  {
    values: [
      { isGood: false },
      { isGood: false },
      { isGood: false },
      { isGood: true },
      { isGood: true },
      { isGood: true },
      { isGood: true },
      { isGood: true },
      { isGood: true },
    ],
    expected: 2,
  }
]

for(const [i, testCase] of testCases.entries()) {
  const got = firstBadVersion(testCase.values)
  const want = testCase.expected
  if(got !== want) {
    throw new Error(`Test case at index ${i} failed, got ${got} but wanted ${want}`)
  }
}

console.log("Success!")
