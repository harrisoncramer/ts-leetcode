/* Given the head of a SORTED linked list, delete all duplicates such that each element appears only once. Return the linked list sorted as well.

Solution: Keep track of the current node. While the current node is defined (not null), check to see if it's value is the same value as the next node (if it is defined). If that's the case, move the current node's pointer to be the "next.next" value. 

Time Complexity: O(n)
Space Complexity: O(1)

*/

import { ListNode, makeCustomList } from "./_list"
import { test } from "./_test"

function deleteDuplicates(head: ListNode<number> | null): ListNode<number> | null {
  if(head === null) return head
  let current: ListNode<number> | null = head
  while(current) {
    while(current.val === current.next?.val) {
      current.next = current.next.next
    }
    current = current.next
  }

  return head
};

const testCases = [
  {
    input: [makeCustomList(1,2,3,3,4,5,5,6)],
    want: [1,2,3,4,5,6],
    compare: (got: ListNode<number>, want: number[]) => {
      const values = got.values()  
      return JSON.stringify(values) === JSON.stringify(want)
    }
  },
  {
    input: [makeCustomList(1,2,3)],
    want: [1,2,3],
    compare: (got: ListNode<number>, want: number[]) => {
      const values = got.values()  
      return JSON.stringify(values) === JSON.stringify(want)
    }
  },
  {
    input: [makeCustomList(1,1,1,1)],
    want: [1],
    compare: (got: ListNode<number>, want: number[]) => {
      const values = got.values()  
      return JSON.stringify(values) === JSON.stringify(want)
    }
  }
]

test(testCases, deleteDuplicates)
