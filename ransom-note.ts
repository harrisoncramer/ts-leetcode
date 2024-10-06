function ransomNoteBetterTime (s1: string, s2: string): boolean {

  // Build a map that of char => # of occurrences
  const charMap = new Map()
  for(const char of s1) {
    let currentVal = charMap.get(char)
    charMap.set(char, (currentVal || 0) + 1)
  }

  // Iterate through all source characters. 
  // If we find a character we need (>0 in our map), then reduce
  // by one.
  // If we found all our characters then return true
  let foundChars = 0
  for(const char of s2) {
    const remaining = charMap.get(char)
    if (remaining > 0) {
      charMap.set(char, charMap.get(char) - 1)
      foundChars++
      if (foundChars === s1.length) return true
    }
  }

  // We've iterated through our entire source and didn't find
  // all characters we need
  return false
}

type TestCase = {
  want: boolean
  input: [string, string]
}

const testCases: TestCase[] = [
  {
    input: ['banana', 'aome sbnanp aancakes'],
    want: true
  }
]

for (const [i, testCase] of testCases.entries()) {
  const got = ransomNoteBetterTime(...testCase.input)
  if (got !== testCase.want) {
    throw new Error(`Test case ${i} failed: Got ${got} but wanted ${testCase.want}`)
  }
}

console.log('Passed!')
