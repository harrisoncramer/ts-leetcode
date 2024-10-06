/* Return if any values in the array are duplicates

Better time complexity: Add all values to hash map or set. 

Time Complexity: O(N) 
Space Complexity: O(N)

Better space complexity: Sort, check if next number is the same. 

Time Complexity: O(nLogN)
Space Complexity: O(1) Space. 
*/

import { test } from "./_test"

function containsDuplicate(nums: number[]): boolean {
  const set = new Set()
  for(const x of nums) {
    if (set.has(x)) return true
    set.add(x)
  }
  return false
}

function containsDuplicateConstantSpace(nums: number[]): boolean {
  if(nums.length <= 1) return false
  nums = nums.sort()
  let i = 0;
  while(i <= nums.length - 1) {
    if(nums[i] === nums[i + 1]) return true
    i++
  }
  return false
}

const testInputs = [
  {
    input: [[3,1,6,5,6]], // [1,3,5,6,6]
    want: true
  },
  {
    input: [[]],
    want: false,
  },
  {
    input: [[3]],
    want: false
  },
  {
    input: [[3,1,6,5,7]],
    want: false
  },
  {
    input: [[3,1,6,5,2,7,7]],
    want: true
  },
]

test(testInputs, containsDuplicate)
test(testInputs, containsDuplicateConstantSpace)
