type TestCase = {
  input: any[]
  want: any
  only?: boolean
}

type Tester = (...args: any) => any;

// Used to test algorithms

export function test (testCases: TestCase[], fn: Tester) {
  const onlyIndex = testCases.findIndex((tc) => tc.only)
  if (onlyIndex !== -1) testCases = [testCases[onlyIndex]] // Overwrite with only that case
  for (const [i, testCase] of testCases.entries()) {
    const got = fn(...testCase.input)
    const want = testCase.want
    if (JSON.stringify(got) !== JSON.stringify(want)) {
      throw new Error(`Test case ${i + 1}: Got ${got}, but wanted ${want}`)
    }
  }
  console.log('Success!')
}
