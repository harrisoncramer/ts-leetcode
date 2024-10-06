// Given a string s consisting of words and spaces, return the length of the last word in the string.
// A word is a maximal substring consisting of non-space characters only.

const lastWordTestCases = [
  {
    input: "Hello World",
    want: 5,
  },
  {
    input: "fly me to the moon ",
    want: 4,
  },
  {
    input: "a",
    want: 1,
  },
  {
    input: "",
    want: 0,
  }
]

// Count each character in a "total" value
// As soon as we encounter a whitespace char, return the total
function lengthOfLastWord(s: string): number {
  let total = 0
  let i = s.length - 1
  while(s[i] === " ") {
    i--
  }
  while(s[i] !== " " && s[i] !== undefined) {
    total++
    i--
  }
  return total
};

for (const testCase of lastWordTestCases) {
  const got = lengthOfLastWord(testCase.input)
  const want = testCase.want
  if (want !== got) {
    throw new Error(`Got ${got} but wanted ${want} for ${testCase.input}`)
  }
}
