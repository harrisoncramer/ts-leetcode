/* Given the root of a binary tree, return the inorder traversal of its nodes' values. 

Recursive Solution: Recursive algorithm where your base case is an undefined node, and you pass along a list of node values. When you hit an undefined value, return the result set early. Otherwise add to the result set after you've visited the left node.

Time complexity: O(n)
Space complexity: O(n) -- For this particular solution, while your CALL STACK is O(h) function calls, you actually still have to hold in memory the SOLUTION to the algorithm, which makes it scale linearly with the input. There's no getting around this. If you were just visiting the nodes it'd be O(h) since the call stack wouldn't exceed the height of the tree.

Iterative Solution: The iterative solution is a bit harder to understand. You want to start with a pointer at the current (root) node. Then, WHILE that node is defined, or WHILE you have other nodes in a stack to process, you enter a loop: 

Repeatedly assign the node to it's left child until it's no longer defined. When that occurs, you know you have the leftmost node on the top of your stack. Pop it off, and reassign it to current (move back up). Add that node's value to your result list, and move to it's right child. Repeat. Return the result list.

Time complexity: O(n)
Space complexity: O(n)
*/

import { test } from "./_test"
import { makeLargeTree, makeTree, TreeNode } from "./_tree"

function inOrderTraversal(root: TreeNode | null, results: number[] = []): number[] {
  if (!root) return results
  inOrderTraversal(root.left, results)
  results.push(root.val)
  inOrderTraversal(root.right, results)
  return results
};

function inOrderTraversalIterative(root: TreeNode): number[] {
  const results: number[] = []
  const stack: TreeNode[] = [];
  let current: TreeNode|null = root;
  while (current || stack.length > 0) {
    while (current) { // Move the current node all the way left, adding it's parents
      stack.push(current);
      current = current.left;
    }
    current = stack.pop()!
    results.push(current.val)
    current = current.right;
  }

  return results
}

const testCases = [
  {
    input: [makeTree()],
    want: [2, 12, 30],
  },
  {
    input: [makeLargeTree()],
    want: [5, 6, 7, 8, 9, 10, 11],
  }
]

test(testCases, inOrderTraversal)
test(testCases, inOrderTraversalIterative)
