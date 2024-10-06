export class GraphNode {
  val: number;
  neighbors: GraphNode[];

  constructor(val: number) {
    this.val = val;
    this.neighbors = [];
  }
}

export function makeGraph(): GraphNode {
    const nodeA = new GraphNode(1);
    const nodeB = new GraphNode(2);
    const nodeC = new GraphNode(3);
    const nodeD = new GraphNode(4);
    const nodeE = new GraphNode(5);
    const nodeF = new GraphNode(6);
    const nodeG = new GraphNode(7);
    const nodeH = new GraphNode(8);
    const nodeI = new GraphNode(9);
    
    nodeA.neighbors.push(nodeB, nodeC, nodeD);
    nodeB.neighbors.push(nodeA, nodeE, nodeF);
    nodeC.neighbors.push(nodeA, nodeG);
    nodeD.neighbors.push(nodeA, nodeH, nodeI);
    nodeE.neighbors.push(nodeB, nodeF, nodeG);
    nodeF.neighbors.push(nodeB, nodeE, nodeH);
    nodeG.neighbors.push(nodeC, nodeE, nodeI);
    nodeH.neighbors.push(nodeD, nodeF);
    nodeI.neighbors.push(nodeD, nodeG);

    return nodeA;
}
