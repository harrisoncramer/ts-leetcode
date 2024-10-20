export class GraphNode {
  val: number;
  neighbors: Set<GraphNode> // Neighbors is a set of other nodes

  constructor(val: number) {
    this.val = val;
    this.neighbors = new Set();
  }

  addNeighbor (node: GraphNode) {
    this.neighbors.add(node)
  }

  removeNeighbor (node: GraphNode) {
    this.neighbors.delete(node)
    return node
  }

  getNeighbors () {
    return this.neighbors;
  }

  isNeighbor (node: GraphNode) {
    return this.neighbors.has(node)
  }
}

export class DirectedGraph {
  nodes: Map<number, GraphNode> // Map of key-value, where key is value in node
  constructor () {
    this.nodes = new Map()
  }

  // Adding an edge involves calling the addNode method for each value, which will return existing nodes if they exist. It then calls the addNeighbor method on the source.
  // Time Complexity: O(1)
  addEdge(src: number, dst: number) {
    const sourceNode = this.addNode(src)
    const dstNode = this.addNode(dst)
    sourceNode.addNeighbor(dstNode) // TODO: Add 2nd neighbor if multidirectional
    return [sourceNode, dstNode]
  }

  // Adding a node will return an already existing node, else will create a new one and add it to the Graph's map of nodes, with the value as the key
  // Time Complexity: O(1)
  addNode(value: number): GraphNode {
    if(this.nodes.has(value)) return this.nodes.get(value)!
    const n = new GraphNode(value)
    this.nodes.set(value, n)
    return n
  }

  // Removing a node requires you to iterate through all the nodes and call the removeNeighbor method on each, then delete it from the map
  // Time complexity: O(n)
  removeNode (value: number) {
    const n = this.nodes.get(value)
    if(!n) return
    for(const node of this.nodes.values()) {
      node.removeNeighbor(n)
    }
    return this.nodes.delete(value)
  }

  // Calls the removeNeighbor method on the source node for the destination node
  removeEdge (src: number, dst: number) {
    const srcNode = this.nodes.get(src)
    const dstNode = this.nodes.get(dst)
    if(srcNode && dstNode) {
      srcNode.removeNeighbor(dstNode)
      // TODO: Remove neighbor from dst->src if multidirectional
    }

    return [srcNode, dstNode]
  }
}


/* 
For an adjacency list, we use keys where the key is the value and the value of the map is a set of values.

This is a self-contained example, but class might be better approach here. Good for quick graph algorithms.
*/
export function buildAdjacencyList<T> (prerequisites: T[][]): Map<T, Set<T>> {
  const g = new Map<T, Set<T>>();
  for(const p of prerequisites) {
    const course: T = p[0]!
    const preq: T = p[1]!
    if(g.has(course)) {
      const preqs = g.get(course)!
      preqs.add(preq)
      g.set(course, preqs)
    } else {
      g.set(course, new Set([preq]))
    }
  }
  return g
}

export class AdjacencyList<T> {
  data: Map<T, Set<T>>

  constructor () {
    this.data = new Map()
  }

  addNode (val: T) {
    if(this.data.has(val)) return this.data.get(val)
    this.data.set(val, new Set())
    return this.data.get(val)
  }

  addEdge(src: T, dst: T) {
    const srcNode = this.data.has(src)
    if(!srcNode) this.addNode(src)
    const dstNode = this.data.has(dst)
    if(!dstNode) this.addNode(dst)

    const neighbors = this.data.get(src)!
    neighbors.add(dst)
    this.data.set(src, neighbors)
  }

  removeEdge(src: T, dst: T) {
    const srcNode = this.data.has(src)
    if(!srcNode) return
    
    const neighbors = this.data.get(src)!
    neighbors.delete(dst)
    this.data.set(src, neighbors)
  }

  removeNode(val: T) {
    for(const k of this.data.keys()) {
      const s = this.data.get(k)!
      s.delete(val)
      this.data.set(k, s)
    }
    this.data.delete(val)
  }

  hasCycle () {
    const visiting = new Set<T>();    // Tracks nodes in the current DFS path, they'll be added/deleted on entering/backtracking
    const visited = new Set<T>();     // Nodes we've already visited, it's an optimization technique. We've already checked this node, know it's not a cycle.

    const dfs = (course: T): boolean => {
      if (visiting.has(course)) return true;   // Cycle detected! We've already visited this node!
      if (visited.has(course)) return false;
      visiting.add(course);                    // Start tracking this node
      const n = this.data.get(course);
      if (n && n.size > 0) {
        for (const c of n) {         // If it has neighbors, check each of them, they'll be added to the set
          if (dfs(c)) return true;   // If any neighbor has a cycle, return true immediately. 
                                     // No need to remove nodes from set since we are going to short-circut and return false
        }
      }

      visiting.delete(course);  // Remove the current node from the set + backtrack, check previous value
      visited.add(course);      // We have now visited this node and don't need to re-check it in the future!
      return false;
    }

    for (const v of this.data.keys()) {
      if (dfs(v)) return true; // If a cycle is detected, return false
    }

    return false;
  }

  minHops(src: T, dst: T): number {
    if (!this.data.has(src) || !this.data.has(dst)) return -1

    const queue: [T, number][] = [[src, 0]]; // Queue for BFS with (node, level)
    const visited = new Set<T>();
    visited.add(src);

    while (queue.length > 0) {
      const [current, level] = queue.shift()!;
      if (current === dst) return level; // Destination reached

      const neighbors = this.data.get(current)!
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push([neighbor, level + 1]);
        }
      }
    }

    return -1
  }
}
