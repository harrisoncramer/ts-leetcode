import { test } from "./_test"
import { makeLargeTree, makeTree, TreeNode } from "./_tree"

/*
Return the maximum depth of a binary tree.

Solution: Write a DFS that recursively traverses the tree until you reach a null node. At that point, you should return zero since there are no nodes at that point. Otherwise, return the max depth between the right and left node, plus one. You add one because each time you traverse up the tree you increase your node count by one.

Time Complexity: O(n) where n is the number of nodes, since you have to travel the entire tree
Space Complexity: O(h) where h is the height of the overall tree
*/

function maxDepth(root: TreeNode | null): number { 
  if(!root) return 0
  const leftDepth = maxDepth(root.left)
  const rightDepth = maxDepth(root.right)
  return Math.max(leftDepth, rightDepth) + 1
};


const testCases = [
  {
    input: [makeTree()],
    want: 2,
  },
  {
    input: [makeLargeTree()],
    want: 3,
  },
  {
    input: [new TreeNode(3)],
    want: 1,
  },
  {
    input: [null],
    want: 0,
  }
]

test(testCases, maxDepth)
