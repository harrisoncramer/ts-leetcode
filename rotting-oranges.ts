// You are given an m x n grid where each cell can have one of three values:
//
//     0 representing an empty cell,
//     1 representing a fresh orange, or
//     2 representing a rotten orange.
//     Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten.
//     Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return -1.

import { Queue } from "./_queue"
import { test } from "./_test"

function orangesRottingReattempt (grid: number[][]): number {
  let minutes = 0
  let freshOranges = 0
  let toSpread = new Queue<number[]>()

  // Get the initial oranges that need to rot and spread
  for(let y = 0; y < grid.length; y++) {
    for(let x = 0; x < grid[y].length; x++) {
      if(grid[y]?.[x] && grid[y][x] === 1) freshOranges++
      if(grid[y]?.[x] && grid[y][x] === 2) {
        toSpread.enqueue([y,x])
      }
    }
  }

  // Utililty function that rots the current node and reduces the count of fresh oranges
  function rot (row: number, col: number) {
    grid[row][col] = 2
    toSpread.enqueue([row, col])
    freshOranges--
  }

  // This loop works by dequeueing EVERYTHING in our queue and "rotting" each value, then pushing
  // all of it's children nodes into our queue. It's essentially a BFS, except that since we're doing it
  // in a while loop, we can use a nested for loop with the size of our queue to process the queue
  // in chunks. Each chunk is one minute (empty those values and "rot" them) and lets us increment
  // the minute counter.
  //
  // The while loop runs while the queue has values in in, and while there are fresh oranges to rot.

  const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]]
  while (toSpread.size && freshOranges > 0) {
    for(let i = toSpread.size; i > 0; i--) {
      const coord = toSpread.dequeue()
      for (const direction of directions) {
        const row = coord![0] + direction[0]
        const col = coord![1] + direction[1]
        if(grid[row]?.[col] === 1) rot(row, col)
      }
    }
    minutes++
  }

  // If there are any oranges we cannot rot, return -1, otherwise return the number of minutes this took
  return freshOranges > 0 ? -1 : minutes
}

const testCases = [  
  {
    input: [[[2,1,1],[1,1,0],[0,1,1]]],
    want: 4,
  },
  {
    input: [[[2,1,1],[0,1,1],[1,0,1]]],
    want: -1,
  },
  {
    input: [[[0,2]]],
    want: 0,
  },
  {
    input: [[[0,1]]],
    want: -1,
  },
  {
    input: [[[1,2]]],
    want: 1,
  },
  {
    input: [[[1],[2],[1],[2]]],
    want: 1,
  }
]

test(testCases, orangesRottingReattempt)
