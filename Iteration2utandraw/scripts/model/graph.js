import Node from "./node.js";

class Graph {
  adjacencyList;
  constructor() {
    this.adjacencyList = {};
  }

  // Checks if the node is already present
  // if not it will be added with an empty edges list
  addNode(id, x, y) {
    if (this.adjacencyList[id] == undefined) {
      const node = new Node(id, x, y);
      this.adjacencyList[id] = {
        node,
        edges: {},
      };
    }
  }

  // Inside Graph class

isNeighbour(startNodeId, endNodeId) {
  return this.adjacencyList[startNodeId] && this.adjacencyList[startNodeId].edges[endNodeId] !== undefined;
}


  // First checks wether the start node exists or not.
  // Then, traverses the list of edges and checks if the
  //neighbour exists. If both exists, an edge from start node
  //to the neighbour node will be created.
  addEdge(startId, neighbourId, weight) {
    if (this.contains(startId) && this.contains(neighbourId)) {
      const neighNode = this.getNode(neighbourId).node;

      this.adjacencyList[startId].edges[neighbourId] = {};
      this.adjacencyList[startId].edges[neighbourId] = {
        node: neighNode,
        weight,
      };
    }

    /* if (this.contains(startId)) {
      for (const neighId of Object.values(neighbours)) {
        if (this.contains(neighId)) {
          const neighNode = this.getNode(neighId).node;
          this.adjacencyList[startId].edges[neighId] = {};
          this.adjacencyList[startId].edges[neighId] = {
            node: neighNode,
            weight,
          };
        }
      }
    }*/
  }

  //Checks if the nodeId is a key in the adjacencyList
  contains(nodeId) {
    return this.adjacencyList[nodeId] != undefined;
  }

  // Finds the shortest between two nodes.
  // The two nodes will either be one start node of the course or
  // a control node.
  findSegment(startId, destId) {
    let distances = {};
    let prev = {};
    let visited = new Set();
    let pq = [];

    for (const [id, node] of Object.entries(this.adjacencyList)) {
      distances[node.node.id] = node.node.id === startId ? 0 : Infinity;
      pq.push({ id: node.node.id, dist: distances[node.node.id] });
      prev[node.node.id] = null;
    }

    pq.sort((a, b) => a.dist - b.dist);

    while (pq.length !== 0) {
      let { id } = pq.shift(); //Get the node with the smallest distance
      visited.add(id);

      let node = this.getNode(id);

      if (id === destId) break;
      for (const neighbour of Object.values(node.edges)) {
        let alt = distances[node.node.id] + neighbour.weight;

        if (alt < distances[neighbour.node.id]) {
          distances[neighbour.node.id] = alt;
          prev[neighbour.node.id] = node.node.id;
          pq.push({ id: neighbour.node.id, dist: alt });
          pq.sort((a, b) => a.dist - b.dist);
        }
      }
    }

    //Reconstruct the path from start to end

    let path = [];
    for (let at = destId; at !== null; at = prev[at]) {
      path.push(at);
    }
    path.reverse();

    return path.length > 0 ? path : null;
  }

  // Finds the shortest path from the start node of the course to
  // all the control nodes.
  findShortestPath(controls) {
    let startNodeId = this.adjacencyList[1].node.id;
    let path = [startNodeId];
    let currentStart = startNodeId;

    let controlList = Object.entries(controls);
    controlList.sort((a, b) => a[1] - b[1]);

    let sortedControls = Object.fromEntries(controlList);

    for (const [id, controlnumber] of Object.entries(sortedControls)) {
      const numericId = parseInt(id);
      let segment = this.findSegment(currentStart, numericId);
      if (segment) {
        if (segment.length === 1) {
          path = path.concat(segment);
        } else {
          path = path.concat(segment.slice(1));
        }
        currentStart = numericId;
      }
    }

    return path;
  }

  //returns the edges list of the node with nodeId
  getNeighbours(nodeId) {
    return this.adjacencyList[nodeId].edges;
  }

  //returns the weight between two nodes.
  getWeight(startId, destId) {
    return this.adjacencyList[startId].edges[destId].weight;
  }

  //returns the node in the form of: {node : {posX : ... , posY : ... , ...} , edges : {id1 : {posX : ... , ...} , ... , idn : {posX : ..., ...}}}
  // If you only want the node and not the edges you should
  // call the function like: node = getNode(id).node
  getNode(nodeId) {
    return this.adjacencyList[nodeId];
  }

  // Returns the order of the graph/ how many nodes there are.
  getOrder() {
    return Object.keys(this.adjacencyList).length;
  }
}

export default Graph;
