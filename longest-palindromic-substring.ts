/* Write a function that finds the longest palindromic substring in a string.

Solution: The key insight here is that when building a palindrome, you can do it from the inside out. 

Initialize a result string and maximum length. You will return the result string and use the max length to keep track of the longest palindrome thus far. Iterate over the input string. For each loop, create two pointers, before and after. WHILE those pointers are in bounds, march them outwards. Each time they move, check to see if the characters they point at are the same. If so, add those characters to the result. If one of them is the SAME as the middle character, then add one to the result. This is to handle cases where you have repeated characters but there isn't an odd number, e.g. "aabc"

Time Complexity: You have to do O(n) operations for each character, and there are O(m) characters in the overall string, so you end up with O(n^2) time complexity. Imagine a string with all the same character
Space Complexity: O(n) because you are building up a string whose maximum length is O(n).
*/

function longestPalindromicSubstring (str: string): string {
  if(str.length === 0) return ""

  let result = str[0]
  let max = 1

  for (let i = 0; i < str.length; i++) {
    let before = i - 1;
    let after = i + 1;
    let currentStr = str[i]
    while(str[before] && str[after]) {

      // The char is the same as the string before it or after it, e.g. "aabc"
      if(str[before] !== str[after] && (str[before] === currentStr || str[after] === currentStr)) {
        currentStr += currentStr
      }

      // Two surrounding characters are the same, e.g. "cac"
      if(str[before] === str[after]) {
        currentStr = str[before] + currentStr + str[after] // This is probably not super efficient, we are rebuilding strings every time
      }

      if (currentStr.length > max) {
        max = currentStr.length
        result = currentStr
      }

      before--
      after++
    }
  }

  return result
}

type TestCase = {
  input: string
  want: string
}
const testCases: TestCase[] = [
  {
    input: "racecar",
    want: "racecar",
  },
  {
    input: "zracecare",
    want: "racecar"
  },
  {
    input: "abcdeff",
    want: "ff",
  },
  {
    input: "aabc",
    want: "aa",
  },
  {
    input: "caabb",
    want: "aa",
  },
  {
    input: "aaab",
    want: "aaa",
  }
]

for(const [i, testCase] of testCases.entries()) {
  const got = longestPalindromicSubstring(testCase.input);
  if (got !== testCase.want) {
    throw new Error(`Got ${got} but wanted ${testCase.want} for test case ${i}`);
  }
}

console.log("Success!")
