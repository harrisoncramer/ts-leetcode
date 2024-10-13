import { test } from "./_test"

/*
Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words. Note that the same word in the dictionary may be reused multiple times in the segmentation.

s = "leetcode", wordDict = ["leet","code"]
expected: True

s = "catsandog" wordDict = ["ca", "cats", "sand", "dog", "and"]
expected: False

While the word can be split apart into these words, it cannot be done in a way that leaves no words remaining.

*/


function wordBreak(s: string, wordDict: string[]): boolean {
  const dp = new Array(s.length + 1).fill(false);
  dp[s.length] = true; // Base case: empty string can always be segmented

  for (let i = s.length - 1; i >= 0; i--) {           // Iterate backward over the string
    for (const w of wordDict) {                       // Check each word in the dictionary

      // If we slice off, starting at i until the end of the length of w, a chunk of our string, does it equal
      // our string itself? If so, we know that from i to i+w.length can be segmented. If THIS section can be
      // segmented, then we should also check the segment that starts right after it. For our first match,
      // we know that w.length + i will be equal to true value we set above as our base case
      if (s.slice(i, i + w.length) === w) dp[i] = dp[i + w.length];

      // Our condition here is basically saying: Does the current word fit within the section of 
      // the string after i? Only if so, do we run our second check, otherwise don't bother. It's an optimization
      // if (i + w.length <= s.length && s.slice(i, i + w.length) === w) dp[i] = dp[i + w.length]; // More efficient!

      if (dp[i]) break; // If already true, no need to check more words
    }
  }

  return dp[0]; // Can the entire string be segmented?
}

const testCases = [
  {
    input: ["leetcode", ["leet", "code"]],
    want: true,
    only: true,
  },
  {
    input: ["applepenapple", ["apple", "pen"]],
    want: true,
  },
  {
    input: ["catsandog", ["cats","dog","sand","and","cat"]],
    want: false,
  },
  {
    input: ["cars", ["car","ca","rs"]],
    want: true,
  },
  {
    input: ["dcacbcadcad", ["cbd","dca","bcdc","dcac","ad"]],
    want: false,
  }
]

test(testCases, wordBreak)
