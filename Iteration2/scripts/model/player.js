class Player {
  constructor(graph) {
    this.graph = graph;
    this.currentNode = this.graph.getNode(1);
    this.path = [this.currentNode];
  }

  move(posX, posY) {
    let nextNode = this.graph.moveToNode(this.currentNode, posX, posY);

    if (nextNode !== null) {
      this.currentNode = nextNode;
      this.path.push(this.currentNode);
    }
  }

  getCurrentNode() {
    return this.currentNode;
  }

  getPath() {
    return this.path;
  }
}

export default Player;
