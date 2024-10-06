/* Implement breadth-first search */
import { Queue } from './_queue'
import { TreeNode } from './_tree'

// The iterative approach to a breadth first search uses a queue. 
// First add the base node, then continually dequeue until your queue is empty. 
// When you encounter a tree node, you take it's children and enqueue them.
// This is similar to the iterative DFS, except we're removing from the end
// of the queue, which means we process nodes in the order we add them to the
// queue, rather than FIFO like with DFS.
//
// Space: O(n) (Completely flat tree, all the nodes go into the queue)
// Time: O(n)  (Completely flat tree, element is on last node)
export function breadthFirstIterative (tree: TreeNode, target: number) {
  const queue = new Queue<TreeNode>()
  queue.enqueue(tree)
  while(queue.size) {
    const c = queue.dequeue()
    if(!c) return false
    if(c.val === target) return true
    if(c.left) queue.enqueue(c.left)
    if(c.right) queue.enqueue(c.right)
  }

  return false
}
