import { test } from "./_test"
import { makeLargeTree, makeTree, TreeNode } from "./_tree"

/* Given a binary tree, find its minimum depth. The minimum depth is the number of nodes along the shortest path from the root node down to the nearest leaf node. 

Solution: We know our base case for this algorithm will be a node with no children (!node.left && !node.right) at which point we want to update the min height with the current height. So, our algorithm starts with a height of 1 (the number of nodes if it's just one leaf node) and then traverses. Prior to traveling to a node, it increments the current depth and passes it down.

Time Complexity: O(n) because we'd have to visit every node in the tree
Space Complexity: O(n) due to a completely unbalanced tre

*/

function minDepth (t: TreeNode): number {
  if(!t) return 0
  let minDepth = Infinity
  function helper (t: TreeNode, currentDepth: number) {
   // Base case is that we have no children, update min depth and return early
    if(!t.left && !t.right) {
      minDepth = Math.min(currentDepth, minDepth)
      return
    }

    // Otherwise, we're going down... increment depth and call on left and right
    // if they exist
    currentDepth++
    if(currentDepth >= minDepth) return // Optimization (no need to continue down this branch if it's larger)
    if (t.left) helper(t.left, currentDepth)
    if (t.right) helper(t.right, currentDepth)
  }

  helper(t, 1) // Start at depth of 1
   
  return minDepth
}


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
    input: [null],
    want: 0,
  },
  {
    input: [new TreeNode(3)],
    want: 1,
  }
]

test(testCases, minDepth)
