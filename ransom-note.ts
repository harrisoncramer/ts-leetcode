import { test } from "./_test"

function canConstruct (ransomeNote: string, magazine: string) {
  let hashMap = {}
  
  for(const char of magazine) {
    hashMap[char] = (hashMap[char] || 0) + 1
  }

  for(const char of ransomeNote) {
    if(hashMap[char]) {
      hashMap[char] = hashMap[char] - 1
    } else return false
  }

  return true
}

const testCases = [
  {
    input: ['banana', 'aome sbnanp aancakes'],
    want: true
  },
  {
    input: ['', 'blah'],
    want: true
  },
  {
    input: ['cat', 'sdiofacjioat'],
    want: true
  },
  {
    input: ['dog', 'sdiofacjioat'],
    want: false
  }
]

test(testCases, canConstruct)
