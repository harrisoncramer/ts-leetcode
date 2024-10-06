/* Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

Solution: The key insight here is that you can modify the original metrix, which means that whenever you encounter an island, you add one to your total, and then just run a flood fill on it. Our flood function is basically a function that checks in-bounds results, sets the value of the current node to water, and then recursively calls itself on all neighbors that are also land.

Time Complexity: O(n x m) (You have to at most visit each node once)
Space Complexity: O(n x m) (You may have a flood fill function for each grid item)
*/
 
function numIslands(grid: string[][]): number {
  function floodIsland (y: number, x: number) {
    if(grid[y] === undefined || grid[y][x] === undefined) return
    grid[y][x] = '0'
    if(grid[y + 1]?.[x] === '1') floodIsland(y + 1, x)
    if(grid[y - 1]?.[x] === '1') floodIsland(y - 1, x)
    if(grid[y][x + 1] === '1') floodIsland(y, x + 1)
    if(grid[y][x - 1] === '1') floodIsland(y, x - 1)
  }

  let islandCount = 0
  for(let y = 0; y < grid.length; y++) {
    for(let x = 0; x < grid[0].length; x++) {
      if(grid[y][x] === '1') {
        islandCount++
        floodIsland(y, x)
      }
    }
  }

  return islandCount
}

const islandTestCases = [  
  {
    input: [
      ["1","1","1","1","0"],
      ["1","1","0","1","0"],
      ["1","1","0","0","0"],
      ["0","0","0","0","0"]
    ],
    want: 1,
  },
  {
    input: [
      ["1","1","0","0","0"],
      ["1","1","0","0","0"],
      ["0","0","1","0","0"],
      ["0","0","0","1","1"]
    ],
    want: 3,
  }
]

for(const [i, testCase] of islandTestCases.entries()) {
  const got = numIslands(testCase.input)
  const want = testCase.want
  if(got !== want) {
    throw new Error(`Test case ${i} failed: Wanted ${want} but got ${got}`)
  }
}

console.log("Success!")
