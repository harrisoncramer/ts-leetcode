/*
Given the root of a binary tree and an integer targetSum, return true if the tree has a root-to-leaf path such that adding up all the values along the path equals targetSum.

Solution: Write a depth-first search that decreases the target sum by the current node's value each time. It'll recurse through the tree until it reaches a null value, at which point it'll check to see if the target value is zero. If so, it's added up all the previous nodes and found their total is the same as the target, so we have a correct solution.

The traversals to both children (tree.left and tree.right) can be used to early return from the function, since if either the left or right meets our condition we can return early

Time Complexity: O(n)
Space Complexity: O(h)

*/

import { makeTree, TreeNode } from "./_tree"
import { test } from "./_test"

function hasPathSum(t: TreeNode|null, targetSum: number): boolean {
  if (!t) return targetSum === 0
  targetSum -= t.val
  return hasPathSum(t.left, targetSum) || hasPathSum(t.right, targetSum)
}

const testCases = [
  {
    input: [makeTree(), 14],
    want: true
  },
  {
    input: [makeTree(), 42],
    want: true
  },
  {
    input: [makeTree(), 50],
    want: false
  }
]

test(testCases, hasPathSum)
