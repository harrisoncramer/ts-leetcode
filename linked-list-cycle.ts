/* Return whether a linked list has has a cycle in it
There's a cycle if a node can be reached again simply by traversing the list.
[{ val: 3 }, { val: 6 }, { val: 7 }, { val: 3 }, { val: 6 }]

Solution: Initialize a "slow" pointer (at the head) and a "fast" pointer at the next value. Move the fast pointer two indexes for each iteration, and the slow pointer one. If the fast pointer ever reaches the end of the list (there's no "next.next") then we know there's no cycle. However, if it catches up with the slow pointer (the two objects are the same) we know there's a cycle

This will always work because the twice-as-fast leader will always catch up with the slower pointer. The "gap" between them in a loop will be (largest gap, if the tail is connected back to the head) the whole length of the list. That gap will always be closed.  It's reducing the gap by 1 each time.

*/

import { ListNode, makeCycle, makeList } from './_list'

function hasCycle (node: ListNode<number>) {
  if(!node.next) return false
  let slow: ListNode<number>|null = node;
  let fast: ListNode<number>|null = node.next;
  while(slow) { // Exit when fast catches up, unless...
    if(!fast || !fast.next) return false // fast has reached the end of the list, no cycle!
    slow = slow!.next
    fast = fast.next.next
  }
  return true
}

const cycle = makeCycle() 
const list = makeList()

if(!hasCycle(cycle)) {
  throw new Error('Should detect a cycle, does not')
}

if(hasCycle(list)) {
  throw new Error('Should NOT detect a cycle, but does')
}
