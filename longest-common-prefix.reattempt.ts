/* Write a function to find the longest common prefix string amongst an array of strings */
const longestCommonReattemptTestCases = [
  {
    input: ["care", "car"],
    expected: "car",
  },
  {
    input: ["splate", "splatter", "splam"],
    expected: "spla",
  },
  {
    input: ["", ""],
    expected: "",
  },
  {
    input: ["aaa", ""],
    expected: "",
  },
  {
    input: ["aaa", "cbb"],
    expected: "",
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

longestCommon(["flower","flow","flight"])
