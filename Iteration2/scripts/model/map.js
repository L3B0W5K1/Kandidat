import Graph from "./graph.js";

const mapImage = new Image();
mapImage.src = "images/karta1.jpeg";

class MapData {
  constructor(image) {
    this.image = image;

    this.statGraph = new Graph();

    this.controls = {};
  }

  async loadJSON(jsonGraph) {
    return new Promise((resolve, reject) => {
      fetch(jsonGraph)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to load the jsonGraph");
          }
          return response.json();
        })
        .then((jsonData) => {
          this.statGraph.adjacencyList = jsonData;
          resolve();
        })
        .catch((error) => {
          console.log("Error loading the JSON-file: ", error);
          reject(error);
        });
    });
  }

  addControl(nodeID, controlNum) {
    this.controls[nodeID] = controlNum;
  }

  calculateShortest() {
    const path = this.statGraph.findShortestPath(this.controls);

    return path;
  }

  getControls() {
    return this.controls;
  }
  getGraph() {
    return this.statGraph;
  }

  getControlNodes() {
    const nodes = {};
    Object.entries(this.controls).forEach(([nodeID, controlN]) => {
      nodes[controlN] = this.statGraph.getNode(nodeID);
    });

    return nodes;
  }

  getNode(nodeID) {
    return this.statGraph.getNode(nodeID);
  }
}

export default MapData;
