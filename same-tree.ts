/* Write a function to determine whether two trees are the same 

First Solution: Traverse both trees and build a set of values, doesn't matter if you do in-order, post-order, or pre-order traversal. Then compare the results from both trees with a simple loop.

Time Complexity: O(n)
Space ComplexitY: O(n)

Second Solution: Write a recursive algorithm that calls itself twice for both tree. This algorithm is technically twice as fast for time complexity but that doesn't affect O(n) notation.

Time Complexity: O(n)
Space Complexity: O(n)
*/

import { test } from "./_test";
import { makeLargeTree, makeTree, TreeNode } from "./_tree";

function sameTree(a: TreeNode, b: TreeNode) {
  const pNodes = traverse(a);
  const qNodes = traverse(b);

  function traverse (node: TreeNode|null, result: number[] = []): number[] {
    if(!node) return result
    result.push(node.val)
    traverse(node.left, result)
    traverse(node.right, result)
    return result
  }
  
  // You could also early return if lengths aren't the same
  for (let i = 0; i < Math.max(pNodes.length, qNodes.length); i++) {
    if(pNodes[i] !== qNodes[i]) return false
  }
  return true
}

function sameTreeEfficient (a: TreeNode|null, b: TreeNode|null): boolean {
  if (!a && !b) return true // If they're both undefined, we've reached outside the tree, true
  if ((a && !b) || (b && !a)) return false // If one is undefined and the other isn't they're not equal
  if(a!.val !== b!.val) return false // If both are defined, check their values...
  return sameTreeEfficient(a!.left, b!.left) && sameTreeEfficient(a!.right, b!.right) // Then check both children
}

const testCases = [
  {
    input: [makeLargeTree(), makeLargeTree()],
    want: true,
  },
  {
    input: [makeTree(), makeLargeTree()],
    want: false,
  },
  {
    input: [makeTree(), makeTree()],
    want: true,
  },
  {
    input: [null, null],
    want: true,
  },
  {
    input: [null, makeTree()],
    want: false,
  }
]

test(testCases, sameTree)
test(testCases, sameTreeEfficient)
