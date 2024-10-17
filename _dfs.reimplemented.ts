import { makeLargeTree, TreeNode } from "./_tree";

const t = makeLargeTree()

function dfs (t: TreeNode|null, target: number) {
  if (!t) return false
  if (t.val === target) return true
  if (target < t.val) {
    return dfs(t.left, target)
  }
  return dfs(t.right, target)
}

function dfsIterative (root: TreeNode|null, target: number) {
  const stack: (TreeNode | null)[] = [root]
  while(stack.length) {
    const curr = stack.pop()
    if (curr) {
      if(curr.val === target) return true
      if(target < curr.val) stack.push(curr.left)
      if(target > curr.val) stack.push(curr.right)
    }
  }

  return false
}


const target = 7
console.log("Found:", dfsIterative(t, target))
console.log("Found:", dfs(t, target))
