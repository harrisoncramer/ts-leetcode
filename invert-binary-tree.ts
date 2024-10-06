/* Given the root of a binary tree, invert it, and return its root
 *
 * An inverted binary tree is one where each node has it's left and right children swapped places.

* Solution: Write a recursive algorithm that returns early on a null tree, or a tree with no children. For trees
* with children, swap node.left/node.right and return that node.
*/

import { makeTree, TreeNode } from "./_tree"

function invertTreeRecursive (root: TreeNode|null) {
  if(!root) return root
  const newLeft = invertTreeRecursive(root.right) // Do not assign this to root.left immediately or it'll affect the newRight call...
  const newRight = invertTreeRecursive(root.left)
  root.left = newLeft
  root.right = newRight
  return root
}

function swap (tree: TreeNode) {
  const left = tree.left
  tree.left = tree.right
  tree.right = left
}

function invertTreeIterative (root: TreeNode|null) {
  if (root === null) return root
  const queue = [root]
  while(queue.length) {
    const current = queue.shift()! // Not ideal, use linked-list based queue
    swap(current)
    if (current.left !== null) queue.push(current.left)
    if (current.right !== null) queue.push(current.right)
  }

  return root
}

const tree1 = makeTree(); // First tree for recursive inversion
const tree2 = makeTree(); // Second tree for iterative inversion

console.log(
  JSON.stringify(invertTreeRecursive(tree1), null, 2) === 
  JSON.stringify(invertTreeIterative(tree2), null, 2) ? 'Passed!' : 'Failed!'
);
