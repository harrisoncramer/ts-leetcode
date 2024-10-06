/* Write a function to find the longest common prefix string amongst an array of strings */
// "house", "house", "house", "house", "house"
const longestCommonTestCases = [
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

function longestCommonPrefix (strs: string[]) {
  let resultString = ""
  let i = 0;
  while(true) {
    let character = strs[0][i]
    if(!character) return resultString
    for(const str of strs) {
      if(character !== str[i]) return resultString
    }
    resultString += character
    i++
  }
}
