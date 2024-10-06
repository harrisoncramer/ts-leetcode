/*
Given the root of a binary tree, return the level order traversal of its nodes' values. 

This means we want to go through each level of the tree and add it's nodes to our result set. Each "level" of the tree should be a subarray for our result.

E.g. for a tree with three levels, our result would have three arrays:
              1
          2      3
       4    5       7

[[1], [2,3], [4,5,7]]


Solution: Write a breadth first traversal. However, rather than just dequeuing the values from the queue one at a time and operating on their children, we do it in "batches" where we dequeue all of the nodes from the same level at the same time. 

In order to do this, we save the initial size of our queue, and have a second loop inside of our while loop that empties out the queue. Inside of that inner loop, we remove each element from the queue and add it to a subresult, and it's children (if they exist) back into the queue. After the inner loop completes, we know our queue will have all of the children from the next level in it, and our sub-result will have all the children from the current level. 

The queue will only end up being empty when there are no children in the next level, so we push no children back into it.

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
      const n = queue.pop()! // Pop out each element...
      sublist.push(n.val) // Add it's value to the subresult for that level...
      if(n.left) queue.unshift(n.left) // Add it's children to the queue, if they exist
      if(n.right) queue.unshift(n.right)
      qLen--
    }

    result.push(sublist) // Once the queue is empty, add our subresult to the final result
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
