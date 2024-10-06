/* An image is represented by an m x n integer grid image where image[i][j] represents the pixel value of the image. You are also given three integers sr, sc, and color. You should perform a flood fill on the image starting from the pixel image[sr][sc]. To perform a flood fill, consider the starting pixel, plus any pixels connected 4-directionally to the starting pixel of the same color as the starting pixel, plus any pixels connected 4-directionally to those pixels (also with the same color), and so on. Replace the color of all of the aforementioned pixels with color. 

Solution: Write a recursive function that takes in an x/y coordinate, and which (checks bounds) and updates the color of the cell to the target. That recursive function should then set the coordinates in a set to avoid backtracking. Finally it should call itself on every neighbor. Return the updated matrix.

Time Complexity: O(n)
Space Complexity: O(n)
*/

import { test } from "./_test"

function floodFill<T>(image: T[][], x: number, y: number, newColor: T): T[][] {
  const height = image.length;
  const width = image[0].length;
  const visited: Set<string> = new Set();

  function fill(x: number, y: number) {
    if (x < 0 || x >= width || y < 0 || y >= height) return; // Check bounds
    if (visited.has(`${x},${y}`)) return; // Already visited

    // Fill the current cell...
    image[y][x] = newColor;
    visited.add(`${x},${y}`);

    // Then recursively fill neighboring cells...
    fill(x - 1, y);
    fill(x + 1, y);
    fill(x, y - 1);
    fill(x, y + 1);
  }

  fill(x, y);
  return image;
}

const testCases = [
  {
    input: [
      [
        ['red', 'green', 'blue'],
        ['red', 'green', 'blue'],
        ['red', 'green', 'blue'],
        ['red', 'green', 'blue'],
      ],
      1, 
      1, 
      'orange'
    ],
    want: [
      ['orange', 'orange', 'orange'],
      ['orange', 'orange', 'orange'],
      ['orange', 'orange', 'orange'],
      ['orange', 'orange', 'orange'],
    ]
  },
  {
    input: [
      [
        ['red', 'green', 'blue'],
        ['red', 'orange', 'orange'],
        ['red', 'green', 'blue'],
        ['red', 'green', 'blue'],
      ],
      1, 
      1, 
      'orange'
    ],
    want: [
      ['orange', 'orange', 'orange'],
      ['orange', 'orange', 'orange'],
      ['orange', 'orange', 'orange'],
      ['orange', 'orange', 'orange'],
    ]
  },
  {
    input: [
      [[]], 
      0, 
      0, 
      'orange'
    ],
    want: [[]],
  },
  {
    input: [
      [['red']], 
      0, 
      0, 
      'orange'
    ],
    want: [['orange']]
  },
];

test(testCases, floodFill)
