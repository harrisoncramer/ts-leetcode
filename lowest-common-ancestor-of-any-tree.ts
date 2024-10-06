/* Given a tree, find the lowest common ancestor (LCA) node of two given nodes. The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).
*/

import { makeLargeTree, TreeNode } from "./_tree"

// This approach will two two DFS passes to find the ancestors of each node.
// We then look at both ancestor sets and return the last common ancestor between them.
// Time Complexity: O(n) where N is the number of nodes in the tree (not necessarily balanced)
// Space Complexity: O(n)
function lowestCommonAncestor(tree: TreeNode, a: TreeNode, b: TreeNode) {
  function dfs (tree: TreeNode|null, target: number, stack: TreeNode[]): TreeNode[] {
    if(!tree) return stack
    if(tree.val === target) return [...stack, tree] // Can be ancestor of itself
    stack.push(tree)
    if(target > tree.val) return dfs(tree.right, target, stack)
    else return dfs(tree.left, target, stack)
  }

  const aAncestors = dfs(tree, a.val, [])
  const bAncestors = dfs(tree, b.val, [])

  let p = 0;
  let lca = tree 
  while(aAncestors[p] && bAncestors[p]) {
    if(aAncestors[p] === bAncestors[p]) lca = bAncestors[p]
    p++
  }

  return lca
}

// This solution does a single DFS search! The base case is encountering null or either node.
// When that occurs, we return the node. 
function lowestCommonAncestorSinglePass(tree: TreeNode, a: TreeNode, b: TreeNode): TreeNode|null {
  if (!tree) return null                         // If we traverse off the end of the tree we didn't find one of our nodes
  if (tree === a || tree === b) return tree      // If we reach the node, it's a parent to itself, return it

  // If we aren't on one of the targets, check the left and right subtrees...
  const left = lowestCommonAncestorSinglePass(tree.left!, a, b)
  const right = lowestCommonAncestorSinglePass(tree.right!, a, b)

  if (left && right) return tree // If we find both targets, then we've found a node that is parent to both, return it
  return left || right     // Otherwise, return whichever parent we found (if any)
}

const root = makeLargeTree()
type TestCase = {
  input: [TreeNode, TreeNode, TreeNode]
  want: TreeNode
}

const testCases: TestCase[] = [
  {
    input: [root, root.left!, root.right!],
    want: root,
  },
  {
    input: [root, root.left!.left!, root.left!.right!],
    want: root.left!,
  },
  {
    input: [root, root.left!.left!, root.right!.right!],
    want: root,
  }
]

for (const [i, testCase] of testCases.entries()) {
  const got = lowestCommonAncestorSinglePass(...testCase.input)
  if (got !== testCase.want) {
    throw new Error(`Test case ${i} failed: Got value ${got?.val} but wanted ${testCase.want.val}`)
  }
}
