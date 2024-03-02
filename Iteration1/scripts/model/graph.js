class Graph {
  adjacencyList;
  constructor() {
    this.adjacencyList = {};
  }

  addNode(id, x, y) {
    if (this.adjacencyList[id] == undefined) {
      const node = new Node(id, x, y);
      this.adjacencyList[id] = {
        node,
        edges: {},
      };
    }

   // this.weightList[node.id] = {};
   // for (const neighbours of Object.values(neigh)) {
   //   this.addEdge(node.id, neighbours, 1);
   // }
  }

  addWeight(startId, destId) {
    if (this.weightList[startId] != undefined) {
      this.weightList[startId][destId] = 1;
    }
  }

  addEdge(startId, neighbours, weight) {
    if (this.constains(startId)) { 
      
    for (const neighId of Object.values(neighbours)){
        if (this.constains(neighId)) {
      const neighNode = this.getNode(neighId);
      this.adjacencyList[startId].edges[neighId] = {};
      this.adjacencyList[startId].edges[neighId] = {node :neighNode , weight}
    }
  }
  }
  }

  constains(nodeId) {
    return this.adjacencyList[nodeId] != undefined;
  }

  getNeighbours(nodeId) {
    return this.adjacencyList[nodeId].edges;
  }

  getWeight(startId, destId) {
    return this.adjacencyList[startId].edges[destId].weight;
  }

  getNode(nodeId) {
    return this.adjacencyList[nodeId].node;
  }
}
