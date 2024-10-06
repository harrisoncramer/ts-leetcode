// Given the head of a singly linked list, return the middle node of the linked list.
// If there are two middle nodes, return the second middle node.

// a -> b -> c -> d -> e

function returnMiddle(head: ListNode | null): ListNode | null {
  let length = 0
  let current = head;
  while(current) {
    current = current.next
    length++
  }

  current = head;
  let mid = Math.floor(length / 2)
  while(mid && current) {
    current = current.next
    mid--
  }
  return current
}

function returnMiddleRabbit (head: ListNode | null): ListNode | null {
  let slow: ListNode | null = head
  let fast: ListNode | null = head;
  while(fast && slow) {
    fast = fast.next
    if(!fast) return slow
    fast = fast.next
    slow = slow.next
  }

  return slow
}
