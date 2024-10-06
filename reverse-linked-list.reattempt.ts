// Given the head of a singly linked list, reverse the list, and return the reversed list.

// function reverseLinkedList (head: ListNode | null): ListNode | null {
//   if(!head) return null
//   let prev = head
//   let current: ListNode | null = head
//   let next: ListNode | null = current.next
//   while(current) {
//     current = next
//     if(current) {
//       next = current.next
//       current.next = prev
//       prev = current
//     }
//   }
//   return prev
// }

function reverseList (head: ListNode): ListNode {
  let prev: ListNode | null = null;
  let curr: ListNode | null = head;
  let next: ListNode | null = head;

  while(curr !== null) {
    next = curr.next
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  return prev
}
