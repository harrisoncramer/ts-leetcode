/* Given a string s, return the length of the longest substring that can be built with those letters.
 *
 * Solution: For each character, count it's occurences in a map. If you ever encounter an character that occurs an even number of times (using the modulo operator), it means you can use both values in a palindrome. Add two to your result each time this occurs. At the end, if your input string is larger than your result, you have an extra character that you can use in the middle of the palindrome, so add 1.
 *
 * Time: O(n) you have to iterate through the entire string once
 * Space: O(m) where m is your character set. You have to create a map to contain all the characters
 * */

function longestPalindrome (s: string): number {
  let len = 0;
  const keys: { [char: string]: number } = {};

  for(let char of s) {
    keys[char] = (keys[char] || 0) + 1
    if(keys[char] % 2 == 0) len += 2
  }

  return s.length > len ? len + 1 : len
}

type TestCase = {
  input: string,
  expected: number
}

const testCases: TestCase[] = [
  {
    input: 'abccccdd',
    expected: 7,
  },
  {
    input: 'a',
    expected:  1,
  },
  {
    input: 'abcd',
    expected:  1,
  },
  {
    input: 'aabbcd',
    expected:  5,
  },
  {
    input: 'aabbccd',
    expected:  7,
  }
]

for (const [i, testCase] of testCases.entries()) {
  const got = longestPalindrome(testCase.input)
  const want = testCase.expected
  if(got !== want) {
    throw new Error(`Got ${got} but wanted ${want} for test case ${i}`)
  }
}

console.log("Passed!")
