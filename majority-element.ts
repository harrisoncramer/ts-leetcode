/* Given an array nums of size n, return the majority element. You may assume that the majority element always exists in the array. */

/*
 * Naive Approach
 * Time Complexity: O(n)
 * Space Complexity: O(n)
*/
function majorityElementHash(nums: number[]): number {
  const seen = {}
  for(const n of nums) {
    seen[n] = (seen[n] || 0) + 1
    if(seen[n] > Math.floor(nums.length / 2)) return n
  }
  return -1
}

/*
 * Naive Approach
 * Time Complexity: O(nlogn)
 * Space Complexity: O(1)
*/
function majorityElementSort (nums: number[]): number {
  nums.sort((a,b) => a-b)
  return nums[Math.floor(nums.length / 2)]
}

/* 
 * Best Approach
 * Time Complexity: O(n)
 * Space Complexity O(1) (!!)
 * Solution: Keep track of the current element, by setting it as 'majority' when our counter is at zero. 
Every time we encounter that number, add one to our 'counter' variable. We are counting the occurences 
of our majority element as we iterate through the loop. Every time we do not encounter it, subtract one.
When we reach zero, we know that there are just as many elements that are _not_ the current element
as there are elements that are, so it cannot be the majority element, and we should set it to the current value.
*/
function majorityElementBest (nums: number[]): number {
  let majorityElement = 0
  let count = 0
  for (const num of nums) {
    if(count === 0) majorityElement = num
    count += num === majorityElement ? 1 : -1
  }

  return majorityElement
}

type TestCase = {
  input: number[]
  want: number
}

const testCases: TestCase[] = [
  {
    input: [3,2,3],
    want: 3
  },
  {
    input: [3,3,3],
    want: 3
  },
  {
    input: [2,2],
    want: 2
  },
  {
    input: [1],
    want: 1
  },
  {
    input: [3,3,4,4,5,5,5,5,5],
    want: 5
  },
]

for(const [i, testCase] of testCases.entries()) {
  const got = majorityElementBest(testCase.input)
  if (testCase.want !== got) {
    throw new Error(`Best: Got ${got} but wanted ${testCase.want}, for test ${i + 1}`)
  }
}

for(const [i, testCase] of testCases.entries()) {
  const got = majorityElementHash(testCase.input)
  if (testCase.want !== got) {
    throw new Error(`Hash: Got ${got} but wanted ${testCase.want}, for test ${i + 1}`)
  }
}

for(const [i, testCase] of testCases.entries()) {
  const got = majorityElementSort(testCase.input)
  if (testCase.want !== got) {
    throw new Error(`Hash: Got ${got} but wanted ${testCase.want}, for test ${i + 1}`)
  }
}
