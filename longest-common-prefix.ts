import { test } from "./_test";

/* Write a function to find the longest common prefix string amongst an array of strings */
const testCases = [
  {
    input: [["care", "car"]],
    want: "car",
  },
  {
    input: [["splate", "splatter", "splam"]],
    want: "spla",
  },
  {
    input: [["", ""]],
    want: "",
  },
  {
    input: [["aaa", ""]],
    want: "",
  },
  {
    input: [["aaa", "cbb"]],
    want: "",
  }
]

function longestCommon (strs: string[]): string {
  let resultString = ""
  let i = 0;
  while(true) {
    let char = strs[0][i]
    if(char === "" || char === undefined) return resultString
    for(const str of strs) {
      if(str[i] !== char) return resultString
    }
    resultString += char
    i++
  }
}

test(testCases, longestCommon)
