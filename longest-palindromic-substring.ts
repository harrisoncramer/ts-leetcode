/* Write a function that finds the longest palindromic substring in a string.

Solution: The key insight here is that when building a palindrome, you can do it from the inside out. 

Iterate over the input string. For each loop, create two pointers, before and after, which are before and after the index. While those pointers are in bounds, march them outwards. Each time they move, check to see if the characters they point at are the same. If so, add both characters to the left/right side of the result. 

If one of them is the same as the middle character, then add it to the result. This is to handle cases where you have repeated characters, but there isn't an odd number so you don't compare the left and right, e.g. "aabc"

Time Complexity: You have to do O(n) operations for each character, and there are O(m) characters in the overall string, so you end up with O(n^2) time complexity. Imagine a string with all the same character
Space Complexity: O(n) because you are building up a string whose maximum length is O(n).
*/

import { test } from "./_test";

function longestPalindromicSubstring (str: string): string {
  if(str.length <= 1) return str

  let result = str[0]

  for (let i = 0; i < str.length; i++) {
    let before = i - 1;
    let after = i + 1;
    let currentStr = str[i]
    while(str[before] && str[after]) {
      
      if(str[before] === str[after]) { // Two surrounding characters are the same
        currentStr = `${str[before]}${currentStr}${str[after]}`
      } else if (str[before] === currentStr || str[after] === currentStr) { // The char is the same as the string before it or after it, e.g. "aabc"
        currentStr += currentStr
      }

      if (currentStr.length > result.length) result = currentStr
      before--
      after++
    }
  }

  return result
}

const testCases = [
  {
    input: ["racecar"],
    want: "racecar",
  },
  {
    input: ["zracecare"],
    want: "racecar"
  },
  {
    input: ["abcdeff"],
    want: "ff",
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
  }
]

test(testCases, longestPalindromicSubstring)
