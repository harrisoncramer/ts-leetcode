/* Given two strings s and t, return true if t is an anagram of s, and false otherwise. An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once. 

Solution:

- Sort, iterate through (OnLogn time, O(1) space)
- Build a map then destroy it (O(n) time, O(n) space)

*/

function isAnagram (a: string, b: string): boolean {
  if(a.length != b.length) return false

  const charMap = {}
  for(const char of a) {
    charMap[char] = (charMap[char] || 0) + 1
  }

  for(const char of b) {
    if (!charMap[char]) return false
    charMap[char] -= 1
  }

  return true
}

type TestCase = {
  input: [string, string],
  want: boolean
}

const testCases: TestCase[] = [
  {
    input: ['abc', 'bca'],
    want: true,
  },
  {
    input: ['bbb', 'bbb'],
    want: true,
  },
  {
    input: ['', ''],
    want: true,
  },
  {
    input: ['a', ''],
    want: false,
  },
  {
    input: ['ab', 'ab'],
    want: true,
  },
  {
    input: ['sdiofs', 'odside'],
    want: false,
  },
]

for (const [i, testCase] of testCases.entries()) {
  const got = isAnagram(...testCase.input)
  if (got !== testCase.want) {
    throw new Error(`Test case ${i} failed, got ${got} but wanted ${testCase.want}`)
  }
}

console.log("Passed!")

