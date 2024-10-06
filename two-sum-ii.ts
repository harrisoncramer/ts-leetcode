/* Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number. There is exactly one solution, and you may not use the same element twice. You must use constant space. 

Solution: This is a simple two-pointer approach. We know to use a two-pointer approach because it's sorted, and we know there's a valid solution. We can just iterate our pointers until we find a match, starting them at the edges.

Time: O(n)
Space: O(1)
*/

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

type TestCase = {
  input: [number[], number][]
  want: [number, number]
}

const testCases = [
  {
    arr: [2, 3, 7, 10, 18, 20, 39],
    target: 28,
    want: [3, 4],
  },
  {
    arr: [2, 3, 7, 10, 18, 20, 39],
    target: 38,
    want: [4, 5],
  },
  {
    arr: [3, 5, 8, 10],
    target: 8,
    want: [0, 1]
  }
]

for (const [i, testCase] of testCases.entries()) {
  let got: number[]
  try {
    got = twoSum(testCase.arr, testCase.target)  
  } catch (err) {
    throw new Error(`Test case ${i} errored!`)
  }
  if (JSON.stringify(testCase.want) !== JSON.stringify(got)) {
    throw new Error(`Test case ${i} failed: Got ${got} but wanted ${testCase.want}`)
  }
}
