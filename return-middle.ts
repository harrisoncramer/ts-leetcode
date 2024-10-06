// Given the head of a singly linked list, return the middle node of the linked list.
// If there are two middle nodes, return the second middle node.

// a -> b -> c -> d -> e
// i = 0
// { 0: a, 1: b, 2: c, 3: d, 4: e }
// until the next value is undefined...
// When the node.next value is undefined, you know that i + 1 is the total number of nodes in the list
// At that point, you look up the node you want Math.floor((i) / 2)

function middleNode(head: ListNode | null): ListNode | null {
  let current = head
  let i = 0;
  while(current) {
    current = current.next
    i++
  }

  let indexOfNode = Math.floor(i / 2)
  let currentTwo = head
  while(indexOfNode > 0 && currentTwo) {
    currentTwo = currentTwo.next
    indexOfNode--
  }

  return currentTwo
}

// Since a fast pointer will move twice as fast as a slow pointer, we
// can just advance the slow pointer, then the fast pointer. After the fast pointer 
// has gone out of bounds, we know that the slow pointer is pointing at the middle of
// the list!
function middleNodeFast(head: ListNode | null): ListNode | null {
  let slow: ListNode | null = head
  let fast: ListNode | null = head
  while (fast && slow && fast.next) {
    slow = slow.next
    fast = fast.next.next
  }
  return slow
}
