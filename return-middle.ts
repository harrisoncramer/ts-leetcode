/* Given the head of a singly linked list, return the middle node of the linked list. If there are two middle nodes, return the second middle node.

Solution: Since a fast pointer will move twice as fast as a slow pointer, we
can just advance the slow pointer, then the fast pointer. After the fast pointer 
has gone out of bounds, we know that the slow pointer is pointing at the middle of
the list!

Time Complexity: O(n)
Space Complexity: O(1)
*/

import { test } from "./_test"
import { ListNode, makeList, makeSortedList } from "./_list"

function returnMiddle (head: ListNode<number> | null): ListNode<number> | null {
  let slow: ListNode<number> | null = head;
  let fast: ListNode<number> | null = head;
  while(fast && slow) {
    fast = fast.next
    if(!fast) return slow
    fast = fast.next
    slow = slow.next
  }

  return slow
}

const testCases = [
  {
    input: [makeList()],
    want: 14,
    compare: (got: ListNode<number>, want: number) => {
      return got.val === want
    }
  },
  {
    input: [makeSortedList()],
    want: 3,
    compare: (got: ListNode<number>, want: number) => {
      return got.val === want
    }
  },
  {
    input: [new ListNode(1)],
    want: 1,
    compare: (got: ListNode<number>, want: number) => {
      return got.val === want
    }
  },
  {
    input: [null],
    want: null,
    compare: (got: null, want: null) => {
      return got === want
    }
  }
]

test(testCases, returnMiddle)
