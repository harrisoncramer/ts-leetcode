class GraphNode<T> {
  val: T
  neighbors: Set<GraphNode<T>>

  constructor (val: T) {
    this.val = val
    this.neighbors = new Set()
  }

  addNeighbor (g: GraphNode<T>) {
    this.neighbors.add(g)
  }

  removeNeighbor (g: GraphNode<T>) {
    this.neighbors.delete(g)
  }
}

class Graph<T> {

  nodes: Map<T, GraphNode<T>>

  constructor () {
    this.nodes = new Map()
  }

  addNode (v: T): GraphNode<T> {
    if(this.nodes.has(v)) return this.nodes.get(v)!
    const g = new GraphNode(v)
    this.nodes.set(v, g)
    return g
  }

  addEdge (src: T, dest: T) {
    const srcNode = this.addNode(src)
    const dstNode = this.addNode(dest)
    srcNode.addNeighbor(dstNode)
    return srcNode
  }

  removeNode(val: T) {
    const target = this.nodes.get(val)
    if(!target) return
    for(const n of this.nodes.values()) {
      n.removeNeighbor(target)
    }
    this.nodes.delete(val)
  }

  removeEdge (src: T, dst: T) {
    const srcNode = this.nodes.get(src)
    if(!srcNode) return
    const targetNode = this.nodes.get(dst)
    if(!targetNode) return
    srcNode.removeNeighbor(targetNode)
  }
}

class AdjacencyList<T> {
  data: Map<T, Set<T>>

  constructor () {
    this.data = new Map()
  }

  addNode (val: T) {
    if(this.data.has(val)) return this.data.get(val)
    this.data.set(val, new Set())
    return this.data.get(val)
  }

  removeNode(val: T) {
    for(const k of this.data.keys()) {
      const s = this.data.get(k)!
      s.delete(val)
      this.data.set(k, s)
    }
    this.data.delete(val)
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
}

const al = new AdjacencyList()
al.addNode(3)
al.addNode(4)
al.addNode(5)
al.addNode(6)
al.addEdge(3,4)
al.addEdge(4,5)
al.addEdge(3,5)
al.addEdge(3,6)
al.removeNode(3)
al.removeEdge(3,6)

console.log(al)
