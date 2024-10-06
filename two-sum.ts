// Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

function twoSum (nums: number[], target: number): [number, number]|null {
  const intMap = {}
  for(const [i, num] of nums.entries()) {
    const pair = target - num
    if(intMap[pair] !== undefined) return [intMap[pair], i]
    intMap[num] = i
  }

  return null
}

type TestCase = {
  input: [number[], number][]
  want: [number, number]
}

const testCases = [
  {
    arr: [3,10,2,20,18,7,39],
    target: 38,
    want: [3,4],
  },
  {
    arr: [3,10,2,20,18,7,39],
    target: 46,
    want: [5,6],
  },
  {
    arr: [3,10,5,8],
    target: 100,
    want: null
  }
]

for (const [i, testCase] of testCases.entries()) {
  const got = twoSum(testCase.arr, testCase.target)  
  if (JSON.stringify(testCase.want) !== JSON.stringify(got)) {
    throw new Error(`Test case ${i} failed: Got ${got} but wanted ${testCase.want}`)
  }
}
