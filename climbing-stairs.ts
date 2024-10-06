import { test } from "./_test";

/* You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

Solution (Naive): The recursive solution here (tail-call optimized) is basically saying, ok, you can climb N number of stairs in the amount of ways you can climb the previous two sets of stairs added together. The ways you can climb 4 stairs is the same as the number of ways you can climb 3 stairs, plus climbing ways of two stairs. It's a recursive solution, essentially fibonacci.

Time Complexity: O(n) (Stack frame for every stair)
Space Complexity: O(n)

Better Solution: Another way to think of it is through dynamic programming. We know that the number of ways you can climb five stairs when starting at five stairs is zero, and the number of ways from four stairs is one. Therefore, the total number of steps you must take to climb is 0 (current) plus 1 (previous). Then, when you take one step down, you set the previous step to the current step and the current step equal to your total.

Time Complexity: O(n)
Space Complexity: O(1)

        i
0 1 2 3 4 5
        1 0 -> result = 1, 
               currentStep = 1->1
               previousStep = 0->1
      i
0 1 2 3 4 5
      2 1 0 -> result = 2 (1 + 1)
               currentStep = 1->2
               previousStep = 1->1

    i
0 1 2 3 4 5
    3 2 1 0 -> total = 3

  i
0 1 2 3 4 5
  5 3 2 1 0 -> total = 5

i
0 1 2 3 4 5
8 5 3 2 1 0 -> total = 8
*/
function climbStairs (n: number) {
    const seen = {}
    function helper (x: number) {
        if(seen[x] !== undefined) return seen[x]
        const result = (x === 1 || x === 0) ? 1 : helper(x - 1) + helper(x - 2);
        seen[x] = result
        return result
    }
    return helper(n)
};

function climbStairsDp (n: number) {
  if(n === 0) return 1

  let previousStep = 0;
  let currentStep = 1;
  let result = 0;
  for (let i = n-1; i >= 0; i--) {
    result = previousStep + currentStep;
    previousStep = currentStep;
    currentStep = result;
  }

  return result;
}

const testCases = [
  {
    input: [5],
    want: 8,
  },
  {
    input: [3],
    want: 3
  },
  {
    input: [1],
    want: 1,
  },
  {
    input: [0],
    want: 1,
  },
  {
    input: [6],
    want: 13,
  }
]

test(testCases, climbStairs)
test(testCases, climbStairsDp)

