/* Write a function that finds the longest palindromic substring in a string.

Solution: The key insight here is that when building a palindrome, you can do it from the inside out. Iterate over the input string. For each loop, we need to check whether you can build a palindrome with the current value (i) as the middle value. This can be done with a helper method that checks whether left and right are the same character, and if they are, moves them outward. The condition exits when left or right goes out of bounds.

This will work for strings like "aba" or "racecar" since they have a middle letter.

For even lengthed strings, start the right pointer one further out, since that will cause this type of a pointer progression:

         l r
- "c m a a a a d"

       l     r
- "c m a a a a d"

     l         r
- "c m a a a a d"


Time Complexity: You have to do O(n) operations for each character, and there are O(n) characters in the overall string, so you end up with O(n^2) time complexity. Imagine a string with all the same character.
Space Complexity: O(n) because you are building up a string whose maximum length is O(n).
*/

import { test } from "./_test";

function checkSubstring (left: number, right: number, s: string, result: string): string {
  let res = ""
  while (left >= 0 && right < s.length && s[left] === s[right]) {
    res = s.substring(left, right + 1) // Add both left and right (right index is non-inclusive)
    left--
    right++
  }

  return res.length > result.length ? res : result
}

function longestPalindrome(s: string): string {
  let result = ""
  for (let i = 0; i < s.length; i++) {

    /* Optimistically update with odd length palindromes */
    result = checkSubstring(i, i, s, result)

    /* Optimistically update w/ even-numbered palindromes, move right pointer one further */
    result = checkSubstring(i, i + 1, s, result)
  }
  return result
}

const testCases = [
  {
    input: ["racecar"],
    want: "racecar",
  },
  {
    input: ["bb"],
    want: "bb",
  },
  { input: ["zracecare"],
    want: "racecar"
  },
  {
    input: ["abcdeff"],
    want: "ff",
  },
  {
    input: ["aaaa"],
    want: "aaaa",
  },
  {
    input: ["aabc"],
    want: "aa",
  },
  {
    input: ["caabb"],
    want: "aa",
  },
  {
    input: ["aaab"],
    want: "aaa",
  },
  {
    input: ["caaaaa"],
    want: "aaaaa",
  }
]

test(testCases, longestPalindrome)
