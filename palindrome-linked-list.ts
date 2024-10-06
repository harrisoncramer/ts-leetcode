/* Given the head of a linked list, return true if it's a palindrome 

Naive Solution: You can't backtrack so we use O(n) memory to hold the values we've seen before. You can iterate through the list and push each node into a stack, then run a simple two-pointer check on that stack to see if the values are identical.

Time Complexity: O(n)
Space Complexity: O(n)

Better Solution: You find the middle of the linked list (tortoise and hare); then reverse the second half of the linked list, then iterate and compare.

Time Complexity: O(n)
Space ComplexitY: O(1)
*/

import { ListNode, makeCustomList } from "./_list";

function isPalindromeNaive(head: ListNode<string> | null): boolean {
  let stack: string[] = []
  while(head) {
    stack.push(head.val)
    head = head.next
  }

  let i = 0;
  let j = stack.length - 1;
  while(i < j) {
    if(stack[i] !== stack[j]) return false
    i++
    j--
  }

  return true
};

function reverse (n: ListNode<string>): ListNode<string> {
  let prev: ListNode<string> | null = null
  let current: ListNode<string> | null = n
  let next: ListNode<string> | null = n
  while(current) {
    next = current.next 
    current.next = prev
    prev = current
    current = next
  }
  return prev!
}

function isPalindrome(head: ListNode<string>): boolean {
  if(!head.next) return true

  // Get mid-point
  let mid = head
  let fast: ListNode<string>|undefined = head.next
  while(fast) {
    mid = mid.next!
    fast = fast.next?.next || undefined
  }

  // Reverse the second half of the list
  mid = reverse(mid)

  let p1: ListNode<string> = head
  let p2: ListNode<string>|null = mid

  // Iterate through until p2 reaches the end
  while(p2) {
    if(p1.val !== p2.val) return false
    p1 = p1.next!
    p2 = p2.next
  }

  return true
}

type TestCase = {
  input: ListNode<string>
  want: boolean
}

const testCases: TestCase[] = [
  {
    input: makeCustomList('b'),
    want: true,
  },
  {
    input: makeCustomList('b','a','a'),
    want: false,
  },
  {
    input: makeCustomList('s','a','a','s'),
    want: true,
  },
  {
    input: makeCustomList('r','a','c','e','c','a','r'),
    want: true,
  },
]

for(const [i, testCase] of testCases.entries()) {
  const got = isPalindromeNaive(testCase.input)
  if (got !== testCase.want) {
    throw new Error(`Test case ${i} failed, got ${got} but wanted ${testCase.want}`)
  }
}

for(const [i, testCase] of testCases.entries()) {
  const got = isPalindrome(testCase.input)
  if (got !== testCase.want) {
    throw new Error(`Test case ${i} failed, got ${got} but wanted ${testCase.want}`)
  }
}

console.log("Success!")
