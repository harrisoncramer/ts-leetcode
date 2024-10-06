import { test } from "./_test";


/* This file contains two templates for reusable binary search operations. In this code, we use a predicate function rather than simply doing the check inside of the binary search. This dependency injection pattern lets us keep the underlying implementation the same but only think about when we want to update our pointers.

These two patterns let us solve almost all binary search algorithms. To decide between them, we just have to determine whether we want the greatest or smallest value that satisifes a given condition.

The first pattern will return the minimal k element (furthest to the left) that satisfies the condition function. To build it, follow these steps:

1. Set left and right to include all possible elements
2. At the end, return the left element
3. While left < right, check predicate. Pass the predicate the current val (or mid), left, and right.
  If truthy, update right = mid, else update left = mid + 1. In otherwords, when truthy, slice off the end of the input
  

The second pattern will return the maximal k element (furthest to the right) that satisfies the condition function. To build it, follow these steps:

There is one common edge case: Since we're returning the left value, if the array is empty (left is zero and right is also zero, so we never loop), it's easier to just handle that in an initial "if" check since in most cases using zero to index an empty array is undefined.

*/

type Predicate<T> = (current: T, left: number, right: number) => boolean;
export function binarySearchLeast<T> (input: T[], predicate: Predicate<T>, left = 0, right = input.length - 1): number {
  while(left < right) {
    const mid = Math.floor((left + right) / 2)
    if (predicate(input[mid], left, right)) right = mid 
    else left = mid + 1
  }
   return left
}

export function binarySearchMost<T> (input: T[], predicate: Predicate<T>, left = 0, right = input.length - 1): number {
  while(left <= right) {
    const mid = Math.floor((left + right) / 2)
    if (predicate(input[mid], left, right)) left = mid + 1
    else right = mid - 1
  }
  return right
}

/*

In our search for the first bad case, our condition should return ... the first bad case!

Remember, the k value here is the minimum (leftmost) value that meets our condition. Here, the leftmost value is the value we're looking for.

We just have to be wary of empty arrays (which will return zero by default with our algorith)
*/

const firstBadTestCases = [
  {
    input: [[true, true, false, false, false]],
    want: 2,
  },
  {
    input: [[]],
    want: -1,
  },
  {
    input: [[true, false]],
    want: 1,
  },
  {
    input: [[false, false, false, false]],
    want: 0,
  },
  {
    input: [[true, true, true]],
    want: -1,
  },
  {
    input: [[true, true, false, false]],
    want: 2,
  }
];

function firstBadSearch(v: boolean[]): number {
  if(v.length === 0) return -1 // Edge: Empty array
  const i = binarySearchLeast(v, (isGood) => !isGood)
  if(v[i]) return -1 // Edge: There may only be good versions, or undefined with an empty array
  return i
}

//test(firstBadTestCases, firstBadSearch)

/* 

How would we find the last good test case?

The simplest way would be to use our maximal search to find the greatest test case that's still good. If we use our maximal search, the condition is just that the test case is good (greatest test case that's good).

Alternatively, we can find the minimal (leftmost) test case that is bad, and move one to the left. The last good one is just one before it!

*/

const lastGoodTestCases = [
  {
    input: [[true, true, false, false, false]],
    want: 1,
  },
  {
    input: [[]],
    want: -1,
  },
  {
    input: [[true, false]],
    want: 0,
  },
  {
    input: [[false, false]],
    want: -1,
  },
  {
    input: [[true, true, true]],
    want: 2,
  },
  {
    input: [[true, true, false, false]],
    want: 1,
  },
  {
    input: [[false, false, false]],
    want: -1,
  }
];

function lastGoodSearchMaximal(v: boolean[]): number {
  return binarySearchMost(v, (isGood) => isGood)
}

function lastGoodSearch(v: boolean[]): number {
  if(v.length === 0) return -1              // Edge: Empty array. Could also be done with n[i] === undefined post-search
  const i = binarySearchLeast(v, (isGood) => !isGood)
  if(v[i] === true) return v.length - 1     // Edge: All cases are good! Return the last one
  return i - 1
}

//test(lastGoodTestCases, lastGoodSearch)
//test(lastGoodTestCases, lastGoodSearchMaximal)

/*

To find the minimum in a rotated sorted array, we can simply return the first (leftmost) element that satisifes our condition, which is that it's smaller than the last element. We know this will work because in a sorted array, an element is:

- Larger than the last element, which means it was chopped off and rotated to the front, or
- Smaller than the last element, which means it was not moved to the front

Since we know the array is sorted, we want the leftmost element in that second group, or, put another way, the smallest element that smaller than or equal to the last element.

*/

const minSortedArray = [
  {
    input: [[3,4,5,1,2]],
    want: 1,
  },
  {
    input: [[3,4,5,1,2]],
    want: 1,
  },
  {
    input: [[4,5,6,7,0,1,2]],
    want: 0,
  },
  {
    input: [[2,3,4,5,6,1]],
    want: 1,
  },
  {
    input: [[1,2,3,4,5,6]],
    want: 1,
  },
  {
    input: [[11,13,15,17]],
    want: 11,
  },
  {
    input: [[]],
    want: -1,
  },
  {
    input: [[1,2,3]],
    want: 1,
  },
]


function findMinInSortedArray (n: number[]) {
  if(n.length === 0) return -1
  const i = binarySearchLeast(n, (v, _left, right) => v <= n[right])
  return n[i]
}

//test(minSortedArray, findMinInSortedArray)

/*

When looking for the maximum value in a rotated sorted array, we want to find the largest (maximal) element that's greater than the last element.

The only edge case we have to consider is when the last value is the largest (the array was never rotated). In that case our condition would always return false and the right pointer would move to negative one. If this happens, we know to return the last element in our array.

*/

const maxSortedArray = [
  {
    input: [[3,4,5,1,2]],
    want: 5,
  },
  {
    input: [[2,3,4,5,1]],
    want: 5,
  },
  {
    input: [[4,5,6,7,0,1,2]],
    want: 7,
  },
  {
    input: [[11,13,15,17]],
    want: 17,
  },
  {
    input: [[]],
    want: -1,
  },
  {
    input: [[1,2,3]],
    want: 3,
  },
]

function findMaxInSortedArray (n: number[]) {
  if(n.length === 0) return -1
  let i = binarySearchMost(n, (val) => val > n[n.length - 1])
  if(i === -1) i = n.length - 1 // If we return -1, we couldn't find a larger element, return the last element in the array
  return n[i] 
}

//test(maxSortedArray, findMaxInSortedArray)

/*

When performing a basic search, we can use either our min or max search.

For the minimum search, our predicate function should return true for all values smaller than or equal to our target. For a maximal search, it should return true for all values greater than or equal to our target.

Like our other binary searches, we have to consider what happens when the search fails. Most of the other searches are for for a RELATIVE value (smallest number greater than x, first non-true condition, etc). Whereas here, we are looking for a SPECIFIC value, so the failure condition is slightly different: itwill fail but be "close" to our target as the window shrinks. When the algorithm returns, we can just verify that the found result actually equals our goal, by checking that v[i] === target.


Note: It's definitley possible to do a search like this without a predicate function where you just return the index when you find the result, but I've included the search examples here to show that you can still use the minBinary and maxBinary searches to solve this problem.

*/

function simpleSearchMin (input: number[], target: number) {
  const i = binarySearchLeast(input, (n) => n >= target);
  if(input[i] !== target) return -1
  return i
}

function simpleSearchMax (input: number[], target: number) {
  const i = binarySearchMost(input, (n) => n <= target);
  if(input[i] !== target) return -1
  return i
}

const testCases = [
  {
    input: [[3,4,9,10,12,16,23,26], 9],
    want: 2,
  },
  {
    input: [[3,4,9,10,12,16,23,26], 10],
    want: 3,
  },
  {
    input: [[3,4,9,10,12,16,23,26], 3],
    want: 0,
  },
  {
    input: [[3,4,9,10,12,16,23,26], 3],
    want: 0,
  },
  {
    input: [[3,4,9,10,12,16,23,26], 26],
    want: 7,
  },
  {
    input: [[3,4,9,10,12,16,23,26], 23],
    want: 6,
  },
  {
    input: [[3,4,9,10,12,16,23,26], 100],
    want: -1,
  },
  {
    input: [[], 100],
    want: -1,
  }
]

//test(testCases, simpleSearchMin)
//test(testCases, simpleSearchMax)

