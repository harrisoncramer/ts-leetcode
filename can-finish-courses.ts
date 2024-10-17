import { test } from "./_test"
import { AdjacencyList } from "./_graph"

/*
Given a set of courses that are listed as [course, prerequisite], write an algorithm to determine whether it's possible to complete all of the courses.

Solution: This is a basic cycle detection algorithm. To determine whether there are cycles, we should first construct a graph out of the values (which can be done with maps and sets). 

Then, we create a set to keep track of nodes that we're visiting. We'll add nodes to this set as we recursively travel through the graph, and if at any point we try to add a node that already exists, we'll know we encountered a cycle, and can return false.

The overall DFS algorithm should do this check first, then get all children out of the graph for that node and recursively call DFS on each child, checking them. If any of them have cycles, return false. Otherwise, at the end of the check, remove the current node from our visiting Set. This final deletion and true return acts as a "backtrack" to the previous DFS call.

*/

function hasCycle(prerequisites: number[][]): boolean {
  const al = new AdjacencyList<number>()
  for(const course of prerequisites) {
    const [c, p] = course
    al.addEdge(c, p)
  }

  if(al.hasCycle()) return false

  return true

}

const testCases = [
  {
    input: [[[1,0]]],
    want: true,
  },
  {
    input: [[[1,0], [0,1]]],
    want: false,
  },
  {
    input: [[[1,0], [2,0], [3,0], [4,1], [1,3]]],
    want: true,
  },
  {
    input: [[[1,0], [4,1], [1,3], [3,1]]],
    want: false,
  }
]

test(testCases, hasCycle)
