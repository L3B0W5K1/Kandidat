class Graph {
    adjacencyList;
    constructor() {
      this.adjacencyList = {};
    }
  
    addNode(node) {
        const nodeId = node.nodeId;
      if (this.adjacencyList[nodeId] === undefined) {
        this.adjacencyList[nodeId] = {
            posX: node.posX,
            posY: node.posY,
            nodeId, nodeId,
            edges: []
        };
      }
    }

    addEdge(node1, node2, weight) {
      this.adjacencyList[node1.nodeId].edges.push({ nodeId: node2.nodeId, weight });
      this.adjacencyList[node2.nodeId].edges.push({ nodeId: node1.nodeId, weight });
    }
}
export class Node {
    constructor(posX, posY, nodeId) {
        this.posX = posX;
        this.posY = posY;
        this.nodeId = nodeId;
    }
}