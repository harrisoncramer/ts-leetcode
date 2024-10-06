/*
Given the root of a binary tree, determine if it is a valid binary search tree (BST).

A valid BST is defined as follows:
- The left subtree of a node contains only nodes with keys less than the node's key.
- The right subtree of a node contains only nodes with keys greater than the node's key.
- Both the left and right subtrees must also be binary search trees.

      6
  1       10
0   2    7     12

Solution: When we traverse into a child node, we have a range of possible values that it can be. When moving left, it must be smaller than it's immediate parent. But if we then move right, it has to be BOTH smaller than it's grandparent, and also larger than it's immediate parent. We can handle this cleanly by passing a min and max value when traversing. 

The max value is updated to be the value of the parent node when moving left. The min value is updated to be the value of the parent node when moving right. Those values can start at Infinity/-Infinity to allow for the root node to work.

The actual check sees whether the current node's value is within range. If so, we call the recursive function on teh left and right children of the node, and return an "&&" check for both of them.

Time Complexity: O(N) in cases where the tree is balanced and we have to visit all nodes to be sure
Space Complexity: O(h) where we have to add a closure to the call stack each time we recurse
*/

import { makeTree, TreeNode } from "./_tree";
import { test } from "./_test"

function isValidBST (root: TreeNode | null, min: number = -Infinity, max: number = Infinity): boolean {
  if(!root) return true // Edge case
  if(root.val >= max || root.val <= min) return false
  return isValidBST(root.left, min, root.val) && isValidBST(root.right, root.val, max)
}

const testCases = [
  {
    input: [makeTree()],
    want: true,
  }
]

test(testCases, isValidBST)
