/**
 Rotate a matrix clockwise. Do not return anything, modify matrix in-place instead.
 */

import { test } from "./_test"

function rotate(matrix: number[][]): number[][] {

  /* Transpose the matrix first */
  for (const y of matrix.keys()) {
    for (const x of matrix.keys()) {
      if (x > y) [matrix[y][x], matrix[x][y]] = [matrix[x][y], matrix[y][x]];
    }
  }

  /* Reverse each row */
  for(const row of matrix) row.reverse() // This is in place, no need to reassign

  return matrix
}

const testCases = [
  {
    input: [[[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]],
    want: [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]],
  },
  {
    input: [[[1,2,3], [4,5,6], [7,8,9]]],
    want: [[7,4,1],[8,5,2],[9,6,3]],
  }
]

test(testCases, rotate);
