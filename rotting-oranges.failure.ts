// You are given an m x n grid where each cell can have one of three values:
//
//     0 representing an empty cell,
//     1 representing a fresh orange, or
//     2 representing a rotten orange.
//     Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten.
//     Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return -1.
//
//     Once we have the fresh/rotten oranges, flood the grid with "rotten" oranges each minute, increment our counter.
//        - If we are unable to do a flood (e.g. there remain fresh oranges but no way to get to them) return -1
//        - If there are no more fresh tomatoes return the counter
//        - Else, do one "flood" operation on the grid

function orangesRotting (grid: number[][]): number {
  let minutes = 0
  let freshOranges = 0
  let toSpread: number[][] = []


  // Get the initial oranges that need to rot and spread
  for(let y = 0; y < grid.length; y++) {
    for(let x = 0; x < grid[y].length; x++) {
      if(grid[y]?.[x] && grid[y][x] === 1) freshOranges++
      if(grid[y]?.[x] && grid[y][x] === 2) toSpread.push([x,y])
    }
  }

  // Rots the orange at the given location
  function rotAndCount (y: number, x: number) {
    grid[y][x] = 2
    toSpread.push([y, x])
  }

  // Rots oranges at all four locations relative to the current position
  function rot (y: number, x: number) {
    freshOranges--
    if(grid[y + 1]?.[x] === 1) rotAndCount(y + 1, x)
    if(grid[y - 1]?.[x] === 1) rotAndCount(y - 1, x)
    if(grid[y]?.[x + 1] === 1) rotAndCount(y, x + 1)
    if(grid[y]?.[x - 1] === 1) rotAndCount(y, x - 1)
  }
  
  // While there are oranges to rot in our stack, pop them all out and 
  // rot their neighbors, pushing them into the "toRot" stack. If the stack is ever empty
  // we know to return, or if we run out of fresh oranges.
  while(toSpread.length && freshOranges) {
    minutes++
    const rots = [...toSpread]
    toSpread = []
    for(const toRot of rots) rot(toRot[0], toRot[1])
  }

  console.log("freshOranges", freshOranges);

  // If after rotting all possible neighbors, there are still some fresh oranges
  // we know that we cannot rot them all, return -1, otherwise return the number
  // of minutes accumulated when rotting them.
  return freshOranges ? -1 : minutes
}

const orangeTestCases = [  
  {
    input: [[2,1,1],[1,1,0],[0,1,1]],
    want: 4,
  },
  {
    input: [
      [2,1,1],
      [0,1,1],
      [1,0,1]
    ],
    want: -1
  },
  {
    input: [[0,2]],
    want: 0,
  },
  {
    input: [[0,1]],
    want: -1,
  },
  {
    input: [[1,2]],
    want: 1,
  },
  {
    input: [[1],[2],[1],[2]],
    want: 1,
  }
]

for(const [i, testCase] of orangeTestCases.entries()) {
  const got = orangesRotting(testCase.input)
  const want = testCase.want
  if(got !== want) {
    throw new Error(`Test case ${i} failed: Wanted ${want} but got ${got}`)
  }
}

console.log("Success!")
