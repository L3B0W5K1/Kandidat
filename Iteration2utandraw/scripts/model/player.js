class Player {
  constructor(startNodeId, controls) {
    this.currentNodeId = startNodeId;
    this.controls = controls;
    this.collectedControls = []; // New property to store collected control IDs
  }

  moveToNode(graph, newNodeId) {
    if (graph.isNeighbour(this.currentNodeId, newNodeId)) {
      this.currentNodeId = newNodeId;
      this.tryCollectControl(newNodeId); // Try to collect control if present on the new node
      // Example place to check game completion could be right after collecting a control
      if (this.isGameCompleted()) {
        console.log("All controls collected, game completed!");
        // You can add any additional logic here to handle game completion, such as displaying a message to the player.
      }

      return true;
    }
    return false;
  }

  getCurrentNodeId() {
    return this.currentNodeId;
  }

  tryCollectControl(nodeId) {
    const controlNumber = this.controls[nodeId]; // Use the instance variable
    if (controlNumber && this.collectedControls.length + 1 === controlNumber) { // Check order
        this.collectedControls.push(nodeId); // Collect control
        console.log(`Control ${controlNumber} collected!`);
    }
}


  isGameCompleted() {
    return (
      this.collectedControls.length === Object.keys(this.controls).length
    ); // Check if all controls are collected
  }
}

export default Player;
