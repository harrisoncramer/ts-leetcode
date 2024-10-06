/* Given a string s, find the length of the longest substring without repeating characters.

Solution: The key here is a sliding window approach, and a map that keeps track of the index where you've most recently seen a character.

Time Complexity: O(n)
Space Complexity: O(n)
*/

function lengthOfLongestSubstring(s: string): number {
  let length = 0;
  let p1 = 0;
  const chars = {};
  for (let p2 = 0; p2 < s.length; p2++) {
    const char = s[p2];
    // If you've seen this character before, and it's last position occurred seen AFTER the 
    // start of this current substring, move up our start index
    if (chars[char] !== undefined && chars[char] >= p1) { 
      p1 = chars[char] + 1;
    }
    const currentSubstringLength = p2 - p1 + 1
    length = Math.max(length, currentSubstringLength);
    chars[char] = p2;
  }

  return length;
}

type TestCase = {
  input: string
  want: number
}

const testCases: TestCase[] = [
  {
    input: "abcd",
    want: 4,
  },
  {
    input: "aaaa",
    want: 1,
  },
  {
    input: "",
    want: 0,
  },
  {
    input: "abcbe",
    want: 3,
  },
  {
    input: "aabbccdef",
    want: 4,
  },
  {
    input: "abba",
    want: 2,
  }
]

for(const [i, testCase] of testCases.entries()) {
  const got = lengthOfLongestSubstring(testCase.input)
  if (testCase.want !== got) {
    throw new Error(`Failed test case ${i}: Got ${got} but wanted ${testCase.want}`)
  }
}
