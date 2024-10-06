// Input: intervals = [[1,2],[5,9],[3,10]], newInterval = [3,4]
// Input: intervals = [[3,4],[5,9],[10,13]], newInterval = [3,8]
// Input: intervals = [[3,4],[5,9],[10,14],[15,19][20,23],[31,40]], newInterval = [11,16]
//
// Couple of key insights here:
// 1. Merging an interval should be written as a separate function, can be figured out easily first. It involves
// taking the smaller of the two starts and the larger of the two ends.
// 2. The solution involves keeping track through the results until you encounter the "insertion point" which

function mergeIntervals (a: number[], b: number[]) {
  return [Math.min(a[0], b[0]), Math.max(a[1], b[1])]
}

function insertIntervalReattempt(intervals: number[][], newInterval: number[]): number[][] {
  const results: number[][] = []
  for(const [i, currentInterval] of intervals.entries()) {
    const [newStart, newEnd] = newInterval
    const [currentStart, currentEnd] = currentInterval
    // If interval occurs after the current interval, just keep iterating...
    if (newStart > currentEnd) results.push(currentInterval)
    // If interval occurs before next interval, insert them in order and the rest of the results, 
    // there are no more overlaps to consider. Return the results early.
    else if (newEnd < currentStart) { 
      results.push(newInterval, ...intervals.slice(i, intervals.length))
      return results
    }
    // Otherwise, merge these two intervals into your variable. Since there could be more overlaps,
    // keep iterating with this new value
    else {
      newInterval = mergeIntervals(currentInterval, newInterval)
    }
  }

  // If we reach this point we have created our new merged interval but did not insert it,
  // insert it now and return the results
  results.push(newInterval)
  return results
}

console.log(insertIntervalReattempt([[3,4],[5,9],[11,14],[15,19],[20,23],[31,40]],[1,2]))
