import Graph from "./graph.js";

// The Map module implements all the functionality necessary to initialize and work with a map structure.
// The map structure includes a visualisation of a literal map, a graph structure representing mobility through that map,
//  and a Controls structure representing a series of points that need to be reached.

  //Classes:
  //  MapData,
  //  Controls

// The Map class stores a visual, a graph, and an object of the Controls class
// 
class MapData {
  // Arguements should be of type: image_link, json link containing a graph, [node id]
  constructor(image, jsonGraph, controlLocations){
      this._image = new Image(); this._image.src = image;
      this._controls = new Controls(controlLocations);
      this._graph = new Graph; this.loadGraph(jsonGraph);
  }

  // Setters & getters
  get image() {
      return this._image;
  }
  get graph() {
      return this._graph;
  }
  get controls() {
      return this._controls;
  }
  set image(image) {
    this._image.src = image;
  }
  set graph(jsonGraph) {
    this._graph.adjacencyList = this.loadGraph(jsonGraph);
    
  }
  set controls(controlLocations) {
    this._controls= new Controls(controlLocations);
  }

  //Load graph from JSON
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
          this.graph.adjacencyList = jsonData;
          resolve();
        })
        .catch((error) => {
          console.log("Error loading the JSON-file: ", error);
          reject(error);
        });
    });
  }


  // Wait for the graph then return it
  async loadGraph(jsonGraph){
     await this.loadJSON(jsonGraph);
  }
  
  //Calculate the shortest path through the controls in ascending order
  calculateShortest() {
    const path = this.graph.findShortestPath(this.controls.obj);

    return path;
  }

 // Return object with nodes where controls are located
  getControlNodes() {
    const nodes = {};
    Object.entries(this.controls.obj).forEach(([nodeID, controlN]) => {
      nodes[controlN] = this.graph.getNode(nodeID);
    });
    return nodes;
  }

  getGraph() {
    return this.graph;
  }
  getControls() {
    return this.controls;
  }
  getImage() {
    return this.image;
  }

  // Lifted from underlying classes
 getNode(nodeID) {
    return this.graph.getNode(nodeID);
  }
  addControls(controls){
    this.controls.addControls(controls);
  }
  addControl(control){
    this.controls.addControls(control);
  }
  
}

// The controls class stores an object of controls and a number denoting the number of controls
class Controls {
  constructor(controlLocations){
    this.i = 0;
    this._obj = new Object(); this.addControls(controlLocations);
  }

  //setter/getter for the controls object
  set obj(controls){
    this._obj=controls
  }
  get obj(){
    return this._obj;
  }

// Given a list of control locations,
// add each control to the controls object with location as key and i as value.
// Undefined, null, and duplicates will raise exceptions that are then logged in console.
addControls(controls){
  if (controls.length==0) return;
  if (typeof controls=== 'number') {
    try {this.addControl(controls);}
    catch (error) {console.warn(error);}
    return;
  };

  controls.forEach(c => {
    try {this.addControl(c);}
    catch (error) {console.warn(error)}
  });
}
addControl(control) {
  if (control == null || control == undefined) {throw new Error("Tried to add illegal control!");}
  if (control in this.obj) {throw new Error("Tried to add duplicate control!");}
      this.i = this.i+1;
      this.obj[control]=this.i;
  }
 remove_control(control) {
      delete this.obj[control];
  }

 //Unnecessary functions ?
  getControlsObj(){
    return this._obj;
  }
  numberOfcontrols() {
    return this.i;
  }

}


export default MapData; Controls;