import { TreeNode, makeLargeTree } from "./_tree";

const t = makeLargeTree()

function bfs (t: TreeNode|null, target: number): boolean {
  if (!t) return false
  const queue: TreeNode[] = [t]
  while(queue.length) {
    let node = queue.shift()!
    if (node.val === target) return true
    if (node.left) queue.push(node.left)
    if (node.right) queue.push(node.right)
  }

  return false
}

const result = bfs(t, 8);

console.log("Found: ", result)
