/* You are given an array of non-overlapping intervals intervals where intervals[i] = [starti, endi] represent the start and the end of the ith interval and intervals is sorted in ascending order by starti. You are also given an interval newInterval = [start, end] that represents the start and end of another interval.
Insert newInterval into intervals such that intervals is still sorted in ascending order by starti and intervals still does not have any overlapping intervals (merge overlapping intervals if necessary).
Return intervals after the insertion.
Note that you don't need to modify intervals in-place. You can make a new array and return it.
 
// Update the end value:
// currentInverval: [3,5]
// newInterval: [4,6]
// updatedInterval: [3,6]
// start > currentInverval[0] && end > currentInverval[1]
//
// Update the Start value:
// currentInverval: [4,6]
// newInterval: [3,5]
// updatedInterval: [3,6]
// Update the end value:
// start < currentInverval[0] && end < currentInverval[1]
//
// Insert new interval:
// currentInverval: [4,6], [11,13]
// newInterval: [7,8]
// updatedInterval: [3,6]
// Update the end value:
// start < currentInverval[0] && end < currentInverval[0]

Example 1:
Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
Output: [[1,5],[6,9]]
Example 2:
Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
Output: [[1,2],[3,10],[12,16]]
Explanation: Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10]. */

// Input: intervals = [[1,2],[5,9]], newInterval = [4,8]
function insert(intervals: number[][], newInterval: number[]): number[][] {
  const resultArray: number[][] = []
  const [start, end] = newInterval
  let updated = false
  // If interval is smaller than the start, insert it first
  for(const [i, currentInterval] of intervals.entries()) {
    const [currentStart, currentEnd] = currentInterval
    if (updated) resultArray.push(currentInterval)
    else if (start > currentStart && start < currentEnd && end > currentEnd) {
      resultArray.push([currentStart, end])
      updated = true
    }
    else if (start < currentStart && end > currentStart && end < currentEnd) {
      resultArray.push([start, currentEnd])
      updated = true
    }
    else if (start < currentStart && end < currentEnd) {
      resultArray.push([start, end])
      resultArray.push(currentInterval)
      updated = true
    }
    else if (start > currentEnd && start < intervals[i + 1]?.[0] && end < intervals[i + 1]?.[0]) {
      resultArray.push(currentInterval)
      resultArray.push([start, end])
      updated = true
    }
    else resultArray.push(currentInterval)
  }

  return resultArray
};

const output = insert([[4,6],[11,13]], [15,20])
console.log(output);
