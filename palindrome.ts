/* Write a function to determine whether a string is a palindrome. The string can contain non-standard characters but they should not count toward the palindrome, only letters and numbers do 

Solution: Two pointers, which move until they cross. In the inner loop, WHILE a pointer encounters a non-standard character, move it repeatedly. Once you have two alphanumeric characters, compare their uppercased values. If they're different return false.

*/
// Time complexity O(n)
// Space complexity O(1)
const myRegex = new RegExp(/[a-z0-9A-Z]/)
function isPalindromeReattempt(s: string): boolean {
    let i = 0
    let j = s.length - 1;
    while(i < j) {
        while(!myRegex.test(s[i])) i++
        while(!myRegex.test(s[j])) j--
        if(s[i]?.toUpperCase() !== s[j]?.toUpperCase()) {
            return false
        }
        i++
        j--
    }

    return true
};

type TestCase = {
  input: string
  want: boolean
}

const isPalindromeTestCases: TestCase[] = [
  {
    input: 'racecar',
    want: true,
  },
  {
    input: 'A man, a plan, a canal: Panama',
    want: true,
  },
  {
    input: 'a',
    want: true,
  },
  {
    input: '',
    want: true,
  },
  {
    input: '9se30',
    want: false
  },
  {
    input: '*)@*',
    want: false
  },
  {
    input: '*)aba@*',
    want: true
  },
  {
    input: 'aaa',
    want: true,
  },
  {
    input: 'abc',
    want: false,
  },
  {
    input: 'racear',
    want: false,
  }
]

for (const [i, testCase] of isPalindromeTestCases.entries()) {
  const got = isPalindromeReattempt(testCase.input)
  if (got !== testCase.want) {
    throw new Error(`Got ${got} but wanted ${testCase.want} for test case ${i}`)
  }
}
