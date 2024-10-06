/* You are given two integer arrays nums1 and nums2, sorted in increasing order, and an integer m, which represents the number of non-zero elements in the first array. Merge nums1 and nums2 into a single array sorted in non-decreasing order. The final sorted array should not be returned by the function, but instead be stored inside the array nums1. To accommodate this, nums1 has a length of m + nums2.length, where the elements from index m until the end of the array are set to zero.

Solution: Initialize three pointers. One, target, points at the end of the first array. Another, p1, points at the last non-zero element in the first array. The third points at the last element in the second array. While there are elements in the second array, compare the values in two arrays. Replace the value at target with the winner. After replacing, decrement the target one position, and the winning source index (p1 or p2).

Time complexity: O(n)
Space complexity: O(1) (This is because this is an in-place algorithm and doesn't need to initialize any new data structures)
*/


function mergeArrays(nums1: number[], m: number, nums2: number[]) {
    let target = nums1.length - 1;  // Last index of first array
    let p1 = m - 1;                 // Pointer to last non-zero element in first array
    let p2 = nums2.length - 1;      // Pointer to last element in second array
    while (p2 >= 0) {
        if (p1 >= 0 && nums1[p1] > nums2[p2]) {
            nums1[target] = nums1[p1];
            target--
            p1--
        } else {
            nums1[target] = nums2[p2];
            target--
            p2--
        }
    }
};

type TestCase = {
  nums1: number[]
  nums2: number[]
  want: number[]
  m: number
}

const testCases: TestCase[] = [
  {
    nums1: [1,2,3,0,0,0],
    nums2: [4,5,6],
    want: [1,2,3,4,5,6],
    m: 3,
  },
  {
    nums1: [1,3,9,0,0,0],
    nums2: [4,5,6],
    want: [1,3,4,5,6,9],
    m: 3,
  },
  {
    nums1: [1,2,0],
    nums2: [1],
    want: [1,1,2],
    m: 2,
  },
  {
    nums1: [1,0,0],
    nums2: [1,3],
    want: [1,1,3],
    m: 1,
  },
  {
    nums1: [0],
    nums2: [1],
    want: [1],
    m: 0,
  },
  {
    nums1: [1],
    nums2: [],
    want: [1],
    m: 1,
  },
  {
    nums1: [],
    nums2: [],
    want: [],
    m: 0,
  },
]

for (const [i, testCase] of testCases.entries()) {
  mergeArrays(testCase.nums1, testCase.m, testCase.nums2)
  if (JSON.stringify(testCase.nums1) !== JSON.stringify(testCase.want)) {
    throw new Error(`Test case ${i} failed: Got ${testCase.nums1} but wanted ${testCase.want}`)
  }
}

console.log("Passed!")
