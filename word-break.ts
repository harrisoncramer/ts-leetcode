import { test } from "./_test"

/*
Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words. Note that the same word in the dictionary may be reused multiple times in the segmentation.

s = "leetcode", wordDict = ["leet","code"]
expected: True

s = "catsandog" wordDict = ["ca", "cats", "sand", "dog", "and"]
expected: False

While the word can be split apart into these words, it cannot be done in a way that leaves no words remaining.

*/


function wordBreak (s: string, wordDict: string[]): boolean {
  function helper (s: string, i: number) {
    if(i === s.length) return true

    let k = i
    for(const word of wordDict) {
      let j = 0;
      while(s[i] === word[j] && word[j]) {
        i++
        j++
      }
      if(!word[j]) {
        if(helper(s, i)) return true
        i -= word.length
      } else {
        i = k
      }
    }
  }

  return helper(s, 0) || false
}

const testCases = [
  {
    input: ["leetcode", ["leet", "code"]],
    want: true,
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
