/*
Given the root of a binary tree, return the length of the diameter of the tree. The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.

Solution: We want to get the maxiumum depth of the right and left subtree for each node, and add them together to get the longest path that passes through the "root" of that subtree. Since binary trees do not necessarily have to be balanced, this means we can have a subtree whose longest path is longer than a path which passes through our actual root. For instance:
```
    1
     \
      3
     / \
    4   5
       /
      6
```

The longest path in this tree is 6 -> 5 -> 3 -> 4, which does not pass through the root node 1.

If this were a balanced binary search tree, then we could just get the max of left and right, but since it's not, we have to ensure that we only update our overall maximum when the calculated height is actually larger than the previous answer.

Write a recursive function whose base case is to return -1 when at a leaf node, since that's the number of edges at a leaf. 

Then, the function gets the left and right height. It _potentially_ updates our overall answer if the left and right height added together (the path) is larger than our overall answer. Finally, it returns the larger of those two values plus one, as we ascend upward.


*/

import { makeLargeTree, TreeNode } from "./_tree"

function diameterOfBinaryTree (root: TreeNode | null) {
  let maxDiameter = 0; // Overall answer
  function helper(node: TreeNode | null): number {
    if (!node) return 0;  // Return zero for no edges (empty tree)
    const leftEdges = helper(node.left);
    const rightEdges = helper(node.right);
    maxDiameter = Math.max(maxDiameter, leftEdges + rightEdges); // Potentially update longest diameter
    return Math.max(leftEdges, rightEdges) + 1; // When returning from recursive call up tree, add one for edge traversal
  }

  helper(root);
  return maxDiameter;
}

const tree = makeLargeTree()
console.log(diameterOfBinaryTree(tree))

