# Algorithms

This is my collection of Leetcode algorithms and common data structures in Typescript.

# Running the algorithms

The algorithms are meant to be run as separate files. The easiest way to do this without dealing with compilation is just to run them with [bun](https://bun.sh/).

Install bun:

```bash
curl -fsSL https://bun.sh/install | bash
```

Run an algorithm:

```bash
bun run add-binary.ts
```

# Tests

Each of the algorithms has a set of test cases added in a `testCases` constant. The `input` of that object is an array of arguments that will be spread and passed to the function. The `want` property is the expected result of the function.

To handle cases where the `want` is a non-primitive value, it's run through `JSON.stringify()` in order to compare against the expected result. You can also pass `only` to isolate a particular test, and a `compare` function where the equality check is more complex.

# Common Data Structures

The following files contain pre-built data structures that can be used when writing algorithms, they include:

-  `_bfs.ts` for a simple breadth first search reference
-  `_binary-search.ts` for a binary search reference
-  `_dfs.ts` for a depth first search reference
-  `_graph.ts` for a graph implementation
-  `_heap.ts` for a heap implementation
-  `_list.ts` for a list implementation
-  `_queue.ts` for a queue implementation
-  `_tree.ts` for tree implementation(s)
