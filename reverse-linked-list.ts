/* Reverse a linked list 

Solution: Key here is to create a prev, current, and next pointer, swapping the values in a while loop while your current value is still defined. When it's not, exit and return previous, which will be your new head.

Time Complexity: O(n)
Space Complexity: O(1)
*/

import { ListNode, makeList, makeSortedList } from "./_list";
import { test } from "./_test";


function reverseLinkedList (l: ListNode<number>): ListNode<number> {
  let prev: ListNode<number>|null = null
  let current: ListNode<number>|null = l
  let next: ListNode<number>|null= l
  while(current) {
    next = current.next
    current.next = prev
    prev = current
    current = next
  }

  return prev!
}

const testCases = [
  {
    input: [makeList()],
    want: makeList().values().reverse(),
    compare: (got: ListNode<number>, want: number[]) => {
      return JSON.stringify(got.values()) === JSON.stringify(want)
    }
  },
  {
    input: [makeSortedList()],
    want: makeSortedList().values().reverse(),
    compare: (got: ListNode<number>, want: number[]) => {
      return JSON.stringify(got.values()) === JSON.stringify(want)
    }
  }
]

test(testCases, reverseLinkedList)
