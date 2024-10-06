/* Reverse a linked list 

Solution: Key here is to create a prev, current, and next pointer, swapping the values in a while loop while your current value is still defined. When it's not, exit and return previous, which will be your new head.

Time Complexity: O(n)
Space Complexity: O(1)
*/

import { ListNode, makeList, makeSortedList } from "./_list";


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

type TestCase = {
  input: ListNode<number>,
  want: number[]
}

const testCases: TestCase[] = [
  {
    input: makeList(),
    want: makeList().values().reverse()
  },
  {
    input: makeSortedList(),
    want: makeSortedList().values().reverse()
  }
]

for (const [i, testCase] of testCases.entries()) {
  const got = reverseLinkedList(testCase.input).values()
  if (JSON.stringify(got) !== JSON.stringify(testCase.want)) {
    throw new Error(`Test case ${i} failed: Got ${got} but wanted ${testCase.want}`);
  }
}

console.log("Success!")
