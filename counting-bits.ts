/* Given an integer n, return an array of length n + 1 such that for each i (0 <= i <= n), ans[i] is the number of 1's in the binary representation of i.

Input: n = 10
Output: [0,1,1,2,1,2,2,3,1,2,2]
Explanation:
0 --> "0" -> zero ones -> push(0)
1 --> "1" -> 1 one -> push(1)
2 --> "01" -> 1 one -> push(1)
3 --> "11" -> 2 ones -> push(2)
4 --> "100" -> 1 one -> push(1)
5 --> "101" -> 2 ones -> push(2)
6 --> "110" -> 2 ones -> push(2)
7 --> "111" -> 3 ones -> push(3)
8 --> "1000" -> 1 ones -> push(1)
9 --> "1001" -> 1 ones -> push(2)
10 --> "1010" -> 1 ones -> push(2)

Naive approach: Iterate over every number prior to and including the target, convert each one to a binary number, then iterate over that number and count all the ones that it contains.

Time Complexity: (On log n) It's not expotential because the pace at which the number of digits the inner loop has to scan decreases over time.
Space Complexity: O(n) which grows linearly compared to the input

Better Approach: Notice that each time a binary number doubles, it has the same number of zeroes (for odd numbers you round down and add one). You can set up an intiail array with the results of zero, one and two set up manually, then iterate until n, referencing the half-index value of the array to get the new value.

Time Complexity: O(n)
Space Complexity: O(1)
*/


function dec2bin(dec: number) {
  return (dec >>> 0).toString(2);
}

function countBits(n: number): number[] {
    const answer: number[] = []
    for(let i = 0; i <= n; i++) {
      const bin = dec2bin(i)
      let count = 0
      for(const char of bin) {
        if(char === '1') count++
      }
      answer.push(count)
    }
  return answer
}


function countBitsBetter (n: number): number[] {
  const results: number[] = new Array(n + 1)
  results[0] = 0
  if(n === 0) return results
  results[1] = 1

  for(let i = 2; i <= n; i++) {
    const halfIndex = i % 2 ? Math.floor(i / 2) : i / 2 // Get the 
    results[i] = results[halfIndex] + i % 2
  }
  return results
}
