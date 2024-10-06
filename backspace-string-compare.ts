/* Given two strings s and t, return true if they are equal when both are typed into empty text editors. '#' means a backspace character. Note that after backspacing an empty text, the text will continue empty. 

Naive Solution: Build a stack for each string, pushing r popping to it when you encounter a backspace character. Then iterate through the stacks (whichever one is longer is the last index) to see if you ever encounter a non-matching string. If you do, then return false, otherwise return true

  Time Complexity: O(n) (Where n is the longer of the two strings)
  Space Complexity: O(n)

Better Solution: Initialize two pointers, one at each string. Starting at the end of each string, move backwards one character at a time. While you are looking at delete characters, (e.g. s[p1] === "#") then move one more space and increment an extra delete counter. Do this for both strings. Once you've moved passed all delete characters, move the extra values too. Then, if both characters are still defined
it means you have a comparison to check.

  Time Complexity: O(n)
  Space Complexity: O(1)

*/

import { test } from "./_test"

function buildStack (str: string) {
  return str.split("").reduce((agg: string[], character: string) => {
    if(character === "#") agg.pop()
    else agg.push(character)
    return agg
  }, [])
}

function backspaceCompare (s: string, t: string) {
  const stackOne = buildStack(s)
  const stackTwo = buildStack(t)
  for(let i = 0; i < Math.max(stackOne.length, stackTwo.length); i++) {
    const value = stackOne[i]
    if(value !== stackTwo[i]) return false
  }
  return true
}

function backspaceCompareTwoPointers (s: string, t: string) {
  let p1 = s.length - 1;
  let p2 = t.length - 1;

  while(s[p1] || s[p2]) {

    // Move further to the left if we're looking at a deletion key by moving past (-1) each delete
    // character and also adding one more delete to be applied at the end. This is because each
    // delete character should delete itself AND the character before it, but that character could
    // also be a delete character, so we can't just skip it (e.g. -2)
    let deletePressesOne = 0
    while(s[p1] === "#") {
      p1--
      deletePressesOne++
    }
    p1 -= deletePressesOne

    // Do the same thing for the second string
    let deletePressesTwo = 0
    while(t[p2] === "#") {
      p2--
      deletePressesTwo++
    }
    p2 -= deletePressesTwo

    // Compare the characters
    if((s[p1] && t[p2]) && s[p1] !== t[p2]) return false

    // Move to the next character in the outer while loop
    p1--
    p2--
  }

  return true
}

const testCases = [
  {
    input: ["sba#", "sb"],
    want: true
  },
  {
    input: ["saba#", "sb"],
    want: false
  },
  {
    input: ["###", ""],
    want: true
  },
  {
    input: ["#a#bc#", "b"],
    want: true
  },
  {
    input: ["a", "b"],
    want: false
  },
  {
    input: ["####b", "##b"],
    want: true
  },
  {
    input: ["##", "#####"],
    want: true
  }
]

test(testCases, backspaceCompareTwoPointers)
test(testCases, backspaceCompare)
