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
For an adjacency list, we use keys where the key is the value and the value of the map is a set of values
*/
export function buildAdjacencyList<T> (prerequisites: T[][]): Map<T, Set<T>> {
  const g = new Map<T, Set<T>>()
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
