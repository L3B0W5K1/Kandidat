class Graph {
    adjacencyList;
    constructor() {
      this.adjacencyList = {};
    }
  
    addNode(id,x,y, neigh) {
        const node = new Node(id,x,y);
        this.adjacencyList[id] = {
            node,
            edges: neigh
        };
    }

    addEdge(node1, node2, weight) {
      this.adjacencyList[node1.nodeId].edges.push({ nodeId: node2.nodeId, weight });
      this.adjacencyList[node2.nodeId].edges.push({ nodeId: node1.nodeId, weight });
    }
}
