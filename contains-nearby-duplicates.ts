/* Given an integer array nums and an integer k, return true if there are two distinct indices i and j in the array such that nums[i] == nums[j] and abs(i - j) <= k.  

Naive Solution: Keep track of elements you've seen before. If you encounter a duplicate, check to see whether it's close enough to the distance If it's not, then change your map to contain a new reference to the most recent sighting, or in other words "slide" your left pointer (which the map represents) to the most recent sighting.

Time complexity: O(n) since you have to iterate through the whole array at least once
Space complexity: O(n) in the worst case if you have to add all unique characters

Better Solution: Use a Set of elements that's the size of your range. This is your "window" of possible duplicates. Whenever you iterate, check if it contains your new character, if so, return true. If not, replace the oldest element in your set with the newer one.

Time complexity: O(n)
Space complexity: O(k) where k is the size of your range
*/

import { test } from "./_test"

function containsNearbyDuplicate(targets: number[], range: number): boolean {
  if(range <= 0) return false // If range is less than or equal to zero, we can never find a duplicate within that range

  const seen = new Map()
  for(let i = 0; i < targets.length; i++) {
    let char = targets[i]
    if(!seen.has(char)) seen.set(char, i)
    else {
      const result = Math.abs(i - seen.get(char)) // Get index of last seen element, and compare
      if(result <= range) return true
      seen.set(char, i) // Update the new index of the most recently seen version of this element
    }
  }
  return false
};

function containsNearbyDuplicateBetter (targets: number[], range: number): boolean {
  const set: number[] = []
  for(const num of targets) {
    if (set.includes(num)) return true
    set.unshift(num)  // Do this with a queue for constant time push/pop operations
    if(set.length > range) set.pop()
  }
  return false
}

const testCases = [
  {
    input: [[1,2,1,1,2,3], 2],
    want: true
  },
  {
    input: [[], 2],
    want: false
  },
  {
    input: [[], 0],
    want: false
  },
  {
    input: [[1,1], 1],
    want: true
  },
  {
    input: [[1,2,3,1,2,3], 2],
    want: false
  }
]

test(testCases, containsNearbyDuplicate)
test(testCases, containsNearbyDuplicateBetter)
