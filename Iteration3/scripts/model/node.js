class Node {
  constructor(id, posX, posY) {
    this.id = id;
    this.posX = posX;
    this.posY = posY;
    this.control = false;
    this.controlN = null;
  }
}

export default Node;
