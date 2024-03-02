const mapImage = new Image();
mapImage.src = "images/karta1.jpeg";

export class MapData {
   constructor(jsonGraph = null) {

    this.mapImage = new Image();
    this.mapImage.src = "images/karta1.jpeg";

    this.statGraph = new Graph();
    if (jsonGraph != null) {     
      this.loadJSON(jsonGraph);
    }
    /*
    this.controlNodes = { 3: 1, 4: 2, 8: 3, 12: 4, 17: 5 };
    */
  }

  async loadJSON(jsonGraph) {
    return new Promise((resolve, reject) => {
        fetch(jsonGraph)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to load the jsonGraph');
                }
                return response.json();
            })
            .then(jsonData => {
                this.statGraph.adjacencyList = jsonData;
                console.log(`graph in mapData : ${this.statGraph}`);
                resolve();
            })
            .catch(error => {
                console.log('Error loading the JSON-file: ', error);
                reject(error);
            });
    });
}

 
  /* async loadJSON(jsonGraph) {
    let promise = new Promise()
    try{
      const response = await fetch(jsonGraph)

      if (!response.ok) {
        throw new Error('Failed to laod the json-File');
      }
      const jsonData = await response.json();
      this.statGraph.adjacencyList = jsonData;
      console.log(this.statGraph);
    } catch(error) {
      console.log('Error loading the JSON-file: ', error);
    }
  }
*/
  getGraph() {
    return this.statGraph;
  }
}
