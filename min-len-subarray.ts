/* Given an array of positive integers nums and a positive integer target, return the minimal length of a subarray whose sum is greater than or equal to the target. If there is no such subarray, return 0 instead.

Solution: Use a sliding window that calculates a sum as it moves through the array. Start the sum at nums[p1], then enter a while loop that ends when p2 === arr.length. In that loop, increment and add if your total is below the target. Otherwise, move p1 up, recompute your total, and decrement your minLength by one (since the subarray is shrinking by one).

*/

type TestCase = {
  input: number[]
  target: number
  want: number
}

const testCases: TestCase[] = [
  {
    input: [2,3,1,2,4,3],
    target: 7,
    want: 2,
  },
  {
    input: [2,3,1,2,4,3],
    target: 7,
    want: 2
  },
  {
    input: [3],
    target: 3,
    want: 1
  },
  {
    input: [],
    target: 3,
    want: 0,
  },
  {
    input: [3,1,1,1,3,6],
    target: 2,
    want: 1,
  }
]

function minLengthSubarray (nums: number[], target: number): number {
  let p1 = 0
  let p2 = 0
  let currentTotal = nums[p1]
  let minLength = Infinity
  while(p2 < nums.length) {
    if(currentTotal < target) {
      p2++
      currentTotal += nums[p2]
    } else {
      minLength = Math.min(minLength, p2 - p1 + 1)
      currentTotal -= nums[p1]
      p1++
    }
  }

  return minLength === Infinity ? 0 : minLength
}

for (const [i, testCase] of testCases.entries()) {
  const got = minLengthSubarray(testCase.input, testCase.target)
  if (got !== testCase.want) {
    throw new Error(`Test case ${i} failed: Got ${got} but wanted ${testCase.want}`);
  }
}
