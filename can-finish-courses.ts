import { test } from "./_test"
import { buildAdjacencyList } from "./_graph"

/*
Given a set of courses that are listed as [course, prerequisite], write an algorithm to determine whether it's possible to complete all of the courses.

Solution: This is a basic cycle detection algorithm. To determine whether there are cycles, we should first construct a graph out of the values (which can be done with maps and sets). 

Then, we create a set to keep track of nodes that we're visiting. We'll add nodes to this set as we recursively travel through the graph, and if at any point we try to add a node that already exists, we'll know we encountered a cycle, and can return false.

The overall DFS algorithm should do this check first, then get all children out of the graph for that node and recursively call DFS on each child, checking them. If any of them have cycles, return false. Otherwise, at the end of the check, remove the current node from our visiting Set. This final deletion and true return acts as a "backtrack" to the previous DFS call.

*/

function hasCycle(_numCourses: number, prerequisites: number[][]): boolean {
  const g = buildAdjacencyList(prerequisites);
  const visiting = new Set<number>(); // Tracks nodes in the current DFS path, they'll be added/deleted on entering/backtracking
  const visited = new Set<number>(); // Nodes we've already visited, it's an optimization technique

  function dfs(course: number): boolean {
    if (visiting.has(course)) return false; // Cycle detected, we've already visited this node in this course check
    if (visited.has(course)) return true;   // We've already visited this node and know it's not a cycle, return true
    visiting.add(course);                   // Add node to current path
    const n = g.get(course);
    if (n && n.size > 0) {
      for (const c of n) {         // If it has children, check each of them, they'll be added to the set
        if (!dfs(c)) return false; // If any child has a cycle, return false immediately. 
                                   // No need to remove nodes from set since we are going to short-circut and return false
      }
    }
    visiting.delete(course);  // Remove the current node from the set + backtrack, check previous value
    visited.add(course);      // We have now visited this node and don't need to re-check it in the future!
    return true;
  }

  for (const [course] of prerequisites) {
    if (!dfs(course)) return false; // If a cycle is detected, return false
  }

  return true;
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