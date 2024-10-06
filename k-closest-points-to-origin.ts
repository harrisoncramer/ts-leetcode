/*
Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane and an integer k, return the k closest points to the origin (0, 0).

The distance between two points on the X-Y plane is the Euclidean distance (i.e., √(x1 - x2)2 + (y1 - y2)2).

You may return the answer in any order. The answer is guaranteed to be unique (except for the order that it is in).

Naive Solution: Write a function to satisfy the getDistanceToZero (Euclidian distance) which is Math.sqrt(x^2 + y^2). Then, call a sort on the original input array which sorts them by their distance. Then get a slice of that result.

Time Complexity: O(NlogN)
Space Complexity: O(1)

Faster Solution: Use a heap to keep track of the shortest distance. Since adding can happen in Log(k) time, where k is hte number of points we want to keep, this improves the time complexity from O(NlogN) to O(Nlog(k)) time. The space complexity is slightly worse, going from O(1) to O(k) where k is the size of the heap.

Time Complexity: O(N *Log(k)) because you have to check each point in the set, and each insert takes Log(k) time to put into our heap of k size
Space Complexity: O(K) (where k is the max number of elements you need to keep track of)
*/

import { test } from "./_test"
import { MinHeap } from "./_heap"

function getDistanceToZero (point: number[]): number {
  const [x,y] = point
  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
}

function kClosest(points: number[][], k: number): number[][] {
  const sortedPoints = points.sort((aPoint, bPoint) => {
    const aDistance = getDistanceToZero(aPoint)
    const bDistance = getDistanceToZero(bPoint)
    if(aDistance === bDistance) return 0
    return aDistance > bDistance ? 1 : -1
  })
  return sortedPoints.slice(0, k)
};

function kClosestHeap(points: number[][], k: number): number[][] {
  const minHeap = new MinHeap<number>()

  // Build the heap
  for(const point of points) {
    const distance = getDistanceToZero(point)
    minHeap.insert(distance)
  }

  // Gather up all the minimums from the heap
  const result: number[] = []
  while(k > 0) {
    const min = minHeap.getMin()!
    result.push(min)
    minHeap.remove()
    k--
  }

  return [[]]
};

const testCases = [
  {
    only: true,
    input: [[[3,3],[5,-1],[-2,4]], 2],
    want: [[3,3], [-2,4]]
  },
  {
    input: [[[3,3],[5,-1],[-2,4]], 1],
    want: [[3,3]],
  },
  {
    input: [[[1,3],[-2,2]], 1],
    want: [[-2,2]],
  },
]

test(testCases, kClosest)
test(testCases, kClosestHeap)
