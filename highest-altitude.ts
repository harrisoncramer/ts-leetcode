/*

There is a biker going on a road trip. The road trip consists of n + 1 points at different altitudes. The biker starts his trip on point 0 with altitude equal 0.

You are given an integer array gain of length n where gain[i] is the net gain in altitude between points i and i + 1 for all (0 <= i < n). Return the highest altitude of a point.

*/

import { test } from "./_test"

function largestAltitude(gains: number[]): number {
  let highest = 0 // We start at zero, so that's our "lowest" possible solution
  let current = 0
  for(const gain of gains) {
    current += gain
    highest = Math.max(current, highest)
  }
  return highest
};

const testCases = [
  {
    input: [[-5,1,5,0,-7]],
    want: 1,
  },
  {
    input: [[-4,-3,-2,-1,4,3,2]],
    want: 0,
  }
]

test(testCases, largestAltitude)
