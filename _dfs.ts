import { makeTree, TreeNode } from "./utils"

function dfsIterative (root: TreeNode) {
  const visited = new Set<number>()
  const stack: TreeNode[] = [root]
  while(stack.length) {
    const node = stack.pop() as TreeNode
    visited.add(node.val)
    if(node.left && !visited.has(node.left.val)) stack.push(node.left)
    if(node.right && !visited.has(node.right.val)) stack.push(node.right)
  }

  return visited
}

function dfsRecursive (root: TreeNode, visited: number[] = []) {
  if(!root) return visited
  visited.push(root.val)
  if(root.right) dfsRecursive(root.right, visited)
  if(root.left) dfsRecursive(root.left, visited)
  return visited
}
