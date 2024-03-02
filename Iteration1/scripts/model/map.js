import Graph from "./graph.js";

const mapImage = new Image();
mapImage.src = "images/karta1.jpeg";

class MapData {
  constructor(jsonGraph = null) {
    this.mapImage = new Image();
    this.mapImage.src = "images/karta1.jpeg";

    this.statGraph = new Graph();
    if (jsonGraph != null) {
      this.loadJSON(jsonGraph);
    }

    this.controls = { 3: 1, 4: 2, 8: 3, 12: 4, 17: 5 };
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
}

export default MapData;
