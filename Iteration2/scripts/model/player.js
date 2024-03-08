class Player {
    constructor(startNodeId) {
      this.currentNodeId = startNodeId;
    }
  
    
    moveToNode(graph, newNodeId) {
      if (graph.isNeighbour(this.currentNodeId, newNodeId)) {
        this.currentNodeId = newNodeId;
        return true;
      }
      return false;
    }
  
    getCurrentNodeId() {
      return this.currentNodeId;
    }
  }
  
  export default Player;
  
