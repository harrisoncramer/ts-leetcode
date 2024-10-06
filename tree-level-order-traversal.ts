/*
Given the root of a binary tree, return the level order traversal of its nodes' values. 

This means we want to go through each level of the tree and add it's nodes to our result set. Each "level" of the tree should be a subarray for our result.

E.g. for a tree with three levels, our result would have three arrays:
              1
          2      3
       4    5       7

[[1], [2,3], [4,5,7]]
*/

import { test } from "./_test"
import { makeLargeTree, makeSplitTree, makeTree, makeUnbalancedBinaryTree, TreeNode } from "./_tree"

function levelOrder (root: TreeNode | null): number[][] {
  if(!root) return []
  const queue: TreeNode[] = [root]
  let result: number[][] = []
  while(queue.length) {
    let qLen = queue.length // Save # of elements we have to pop out...
    let sublist: number[] = []
    while(qLen > 0) {
      const n = queue.pop()!
      if(n.val !== undefined) sublist.push(n.val)
      if(n.left) queue.unshift(n.left)
      if(n.right) queue.unshift(n.right)
      qLen--
    }
    result.push(sublist)
  }

  return result
}

const testCases = [
  {
    input: [makeTree()],
    want: [[12], [2,30]],
  },
  {
    input: [makeLargeTree()],
    want: [[8], [6,10], [5,7,9,11]]
  },
  {
    input: [null],
    want: [],
  },
  {
    input: [new TreeNode(3)],
    want: [[3]],
  },
  {
    input: [makeUnbalancedBinaryTree()],
    want: [[2],[3],[7],[10]],
  },
  {
    input: [makeSplitTree()],
    want: [[1], [2,3], [4,5]],
  }
]

test(testCases, levelOrder)
