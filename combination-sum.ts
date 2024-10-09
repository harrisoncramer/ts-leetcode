/*

Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order.

The same number may be chosen from candidates an unlimited number of times. Two combinations are unique if the frequency of at least one of the chosen numbers is different. The test cases are generated such that the number of unique combinations that sum up to target is less than 150 combinations for the given input.

Constraints:
1 <= candidates.length <= 30
2 <= candidates[i] <= 40
All elements of candidates are distinct.
1 <= target <= 40

Solution: We want to build up a solution over time with recursion. The base case of our recursive function is that we've reached a target of zero, which means our output is a valid solution, or our index (current element) is out-of-bounds, or our target is less than or equal to one (since no number is smaller than two, that's the second condition given).

In our recursive function, if our current number is greater than the target, we know we can add it to our result, so add it to the path of numbers and call the recursive function with the same index. That way we'll repeatedly build up a list of numbers that can be added together but stay below the target. The second recursive call takes over by moving to the next index.

Time complexity: O(2^n): Each candidate can be included or excluded, leading to an exponential number of combinations. For instance imagine your input array is [2,3,4] and the target is 100, we'd have to traverse repeatedly in the call stack to add up all those 4s or 3s, to determine an output.

Space complexity: O(target / min(candidates)) since the maximum depth of the recursion is the number of times the smallest candidate can fit into the solution.
*/

import { test } from "./_test"

function combinationSum(candidates: number[], target: number): number[][] {
  const answer: number[][] = []

  function helper (target: number, i: number, path: number[] = []) {
    if (target === 0) {
      answer.push(path)
      return
    }
    if(i < 0 || target <= 1) return
    let currentNumber = candidates[i]
    if (target >= currentNumber) helper(target - currentNumber, i, [...path, currentNumber]) // We can use the current value
    helper(target, i - 1, path) // Add the next value to the path

    // When this closure returns, the outer closure will not have the current number in the path
    // This takes care of the backtracking for us. E.g. when we add 6 to our result, and push that 
    // value in, eventually the previous "if" statement will return and our path will be empty again
  }

  helper(target, candidates.length - 1)
  return answer
};

const testCases = [
  {
    input: [[2,3,6,7], 7],
    want: [[7],[3,2,2]],
  },
  {
    input: [[2,3,5], 8],
    want: [[5,3], [3,3,2], [2,2,2,2]],
  }
]

test(testCases, combinationSum)
