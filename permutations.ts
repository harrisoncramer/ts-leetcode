/*
Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.

Solution: You are essentially building up a path here. Create a recursive function that checks to see if the current path is equal in length to the expected output. If it is, then add it to the result, and return.

If not, iterate over each value in the nums and check to see if it's already in the path. If it's not in the path already, push it in and then call the helper function with the expanded path. At the end, make sure to pop() off the value, so that the next loop isn't affected.

*/

import { test } from "./_test"

function permute(nums: number[]): number[][] {
  const results: number[][] = []

  function helper(path: number[]) {
    if (path.length === nums.length) {
      results.push([...path]);
      return;
    }

    for (const x of nums) {
      if (!path.includes(x)) {
        path.push(x);
        helper(path);
        path.pop();
      }
    }
  }

  helper([]);

  return results;
};

const testCases = [
  {
    input: [[1,2,3]],
    want: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]],
  },
  {
    input: [[1,2]],
    want: [[1,2], [2,1]],
  },
  {
    input: [[1]],
    want: [[1]]
  },
]

test(testCases, permute)
