import { test } from "./_test";
import { makeBinaryTree, TreeNode } from "./_tree";

/*
Given the root of a binary tree and an integer targetSum, return all root-to-leaf paths where the sum of the node values in the path equals targetSum. Each path should be returned as a list of the node values, not node references.

Solution: Use recursion to perform a DFS on a tree. Each time you encounter a node, subtract it's value from the target, and add it's node value to the list of paths you've already seen. When you encounter a null node, you've gone too far, just return (base case). When you encounter a leaf node (node with no left or right children), check to see if the target minus it's value is zero. If so, push the current path 

Time complexity: O(n) since we have to travel to all nodes when there are no valid paths
Space complexity: O(n) due to the path storage if we travel to all nodes
*/
function pathSum(t: TreeNode|null, targetSum: number): number[][] {
  const result: number[][] = []
  function dfs (t: TreeNode|null, targetSum: number, path: number[]) {
    if(!t) return
    const newPath = [...path, t.val]
    if(!t.left && !t.right) {                             // If it's a leaf node...
      if(targetSum - t.val === 0) result.push(newPath)    // And we hit our target with it's value, push it 
      return                                              // Then return regardless, no need to traverse null children
    }
    dfs(t.left, targetSum - t.val, newPath)
    dfs(t.right, targetSum - t.val, newPath)
  }

  dfs(t, targetSum, [])
  return result
}


const testCases = [
  {
    input: [makeBinaryTree(), 22],
    want: [[5,4,11,2],[5,8,4,5]],
  }
]

test(testCases, pathSum)
