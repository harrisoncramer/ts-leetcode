// Given the head of a sorted linked list, 
// delete all duplicates such that each element appears only once. 
// Return the linked list sorted as well.
//
// current = [2]
// next = [2(dup)]
//
// This one is straightforward, we actually only need to keep track
// of the current node. While the current node is defined (not null),
// check to see if it's value is the same value as the next node (if
// it is defined). If that's the case, move the current node's pointer
// to be the "next.next" value.
//
// value is not equal 
// to the next node's value (if it exists)

function deleteDuplicates(head: ListNode | null): ListNode | null {
  if(head === null) return head
  let current: ListNode | null = head
  while(current) {
    while(current.val === current.next?.val) {
      current.next = current.next.next
    }
    current = current.next
  }

  return head
};
