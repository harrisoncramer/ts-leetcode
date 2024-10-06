/* Given a binary tree, determine if it is height-balanced. A height-balanced tree (or B-tree) is one where the difference between the depth of the left and right subtrees is <= 1.

 Solution: Write a recursive helper that calls itself for each subtree, returning the difference between recursive calls to itself
 on the left and right subtree, and the height of whichever one is larger, plus one (the current node.)

Time Complexity: O(n) since you are making a call for each node on the tree. You have to traverse every node to see if it's balanced.
Space Complexity: O(n) for the call stack of each node

Note: Balanced trees are often used to store indexes or other performance-sensitive data when searching. This is because finding a node in a B-Tree ("balanced" tree) is at worst O(log n) time complexity, because you can do a binary search. It's not O(height), because in some cases there may be many children, because you have to scan all of the children of each child node. In other words the height could be very flat but you'd stil have to visit lots of nodes.

*/
import { makeTree, TreeNode } from "./_tree"

function isBalanced (root: TreeNode) {
  function helper(root: TreeNode | null) {
    if(!root) return [true, 0] // Empty tree, is already balanced
    const left = helper(root.left)
    const right = helper(root.right) // Run recursively with children
    const difference = Math.abs(left[1] - right[1])
    const balanced = ((left[0] && right[0]) && difference <= 1) // Are both subtrees balanced, AND the current tree balanced?
    const largerSubtree = Math.max(left[1], right[1])
    return [balanced, 1 + largerSubtree]
  }

  return helper(root)[0]
}

const t = makeTree()
const result = isBalanced(t)
console.log(result)
