/* Given two strings s and p, return an array of all the start indices of p's anagrams in s. You may return the answer in any order. */

import { test } from "./_test"

function findAnagrams(s: string, p: string): number[] {
  const charCounter = new Map<string, number>();
  const res: number[] = []

  function updateMap (char: string, value: number) {
    charCounter.set(char, (charCounter.get(char) ?? 0) + value);
    if (charCounter.get(char) == 0) charCounter.delete(char);
  };

  for (const char of p) {
    updateMap(char, 1)
  }

  let leftPointer = 0;
  for (let i = 0; i < s.length; i++) {

    /* The "i" pointer may progress far enough that the window is larger than the anagram. At that point, we add value at the left pointer to our map of "needed" characters, since we are no longer including it in our window. Then, move the left pointer over. */
    if (i - leftPointer > p.length - 1) {
      updateMap(s[leftPointer], 1);
      leftPointer++;
    }

    /* */
    updateMap(s[i], -1);

    // Add anagram if our char counter reaches zero
    if (charCounter.size == 0) res.push(leftPointer);
  }

  return res;
}

const testCases = [
  {
    input: ["cbaebabacd", "abc"],
    want: [0,6],
    only: true,
  },

  {
    input: ["aabbcc", "baba"],
    want: [0],
  },
  {
    input: ["desoidfaofad", "fad"],
    want: [5,9],
  }
]

test(testCases, findAnagrams)
