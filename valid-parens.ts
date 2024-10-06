/* Given a string s determine if the input string is valid.
An input string is valid if:
- Open brackets must be closed by the same type of brackets.
- Open brackets must be closed in the correct order.
- Every close bracket has a corresponding open bracket of the same type.

Naive Solution: Create a mapping of open/closed and closed/open pairs. Each time you encounter an opening pair, push it to the stack. When you encounter a closing pair, pop off the stack. If the pop fails, or it doesn't match, return false. If after looping over all the content, our stack still contains characters, return false (this means there are some unclosed braces).

Time Complexity O(n)
Space Complexity O(n)

Better Solution: Use two pointers to check, moving inwards. When one pointer encounters an opening or closing brace, move the other until you find it's match. If at any point the two pointers cross and you are still "unclosed" then return false

Time Complexity: O(n)
Space Complexity: O(1)

*/

import { test } from "./_test"

function validParensNaive(s: string): boolean {
  const openToClose = {
    '[': ']',
    '{': '}',
    '(': ')',
  }
  const closingChars = Object.values(openToClose)
  const openBraceStack: string[] = []
  for(const character of s) {
    if (openToClose[character]) openBraceStack.push(character) // If an opening brace, push it
    if (closingChars.includes(character)) { // If a closing brace + we have no more opening, or the braces don't match, return false
      const match = openBraceStack.pop()
      if(!match || openToClose[match] !== character) return false
    }
  }

  if(openBraceStack.length > 0) return false // Edge case: If we have unclosed braces, return false
  return true
}

function validParens (s: string): boolean {
  const openToClose = { '[': ']', '{': '}', '(': ')' }
  const closeToOpen = { ']': '[', '}': '{', ')': '(' }
  let p1 = 0;
  let p2 = s.length - 1;
  while (p1 < p2) {
    let neededClosingBrace = openToClose[s[p1]]
    let neededOpeningBrace = closeToOpen[s[p2]]
    if(neededClosingBrace && !neededOpeningBrace) {         // If we only need a closing brace...
      while(s[p2] !== neededClosingBrace && p2 > p1) p2--   // Try to find it by moving the p2 pointer...
      if (p2 === p1) return false                           // If we exit because the two pointers collided, we didn't find it
    } else if (neededOpeningBrace && !neededClosingBrace) {
      while(s[p1] !== neededOpeningBrace && p2 > p1) p1++
      if (p2 === p1) return false
    } else if (neededOpeningBrace && neededClosingBrace) {  // If we need both, check they match each other
      if (s[p1] !== neededOpeningBrace || s[p2] !== neededClosingBrace) return false
    }

    p1++
    p2--
  }

  if (p1 === p2) { // If the two pointers didn't pass each other, check we don't have an unmatched paren in the middle
    return openToClose[s[p1]] || closeToOpen[s[p1]] ? false : true
  }

  return true
}

const testCases = [
  {
    input: ["[{()}]"],
    want: true,
  },
  {
    input: ["[[[[]]]]"],
    want: true,
  },
  {
    input: [""],
    want: true,
  },
  {
    input: ["[[]"],
    want: false,
  },
  {
    input: ["{[}]"],
    want: false,
  },
  {
    input: ["{xxa}"],
    want: true,
  },
  {
    input: ["{()}"],
    want: true,
  },
  {
    input: ["{(()}"],
    want: false,
  },
  {
    input: [""],
    want: true,
  },
  {
    input: ["aaa"],
    want: true,
  },
  {
    input: ["({[{[([])]}]})"],
    want: true,
  },
  {
    input: ["({[x{[([]a)]b}c]})"],
    want: true,
  },
  {
    input: ["({[x{[([]a)]bxc]})"],
    want: false,
  }
]

test(testCases, validParensNaive)
test(testCases, validParens)
