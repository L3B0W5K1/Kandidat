const NODE_RADIUS = 10;
const CANVAS_WIDTH = (canvas.width = 900);
const CANVAS_HEIGHT = (canvas.height = 900);

class View {
  constructor(image, graph, ctx, controls) {
    this.image = image;
    this.graph = graph;
    this.ctx = ctx;
    this.controls = controls;

    this.render();
  }

  // Draw the given node onto the canvas.
  drawNode(node) {
    // Draw the node as a purple circle
    this.ctx.beginPath();
    this.ctx.arc(node.posX, node.posY, NODE_RADIUS, 0, Math.PI * 2);

    this.ctx.fillStyle = "purple";
    this.ctx.fill();
    this.ctx.closePath();

    // Draw the number text in white color
    if (node.id in this.controls) {
      this.ctx.fillStyle = "white";
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "middle";
      this.ctx.font = "12px Arial";
      this.ctx.fillText(this.controls[node.id], node.posX, node.posY);
    }
  }

  // Draw the edge between src and dest node with the given color.
  // The weight will be displayed ontop of the edge.
  drawEdge(srcX, srcY, destX, destY, weight, color) {
    const angle = Math.atan2(destY - srcY, destX - srcX);

    // Calculate the starting point on the perimeter of the start node
    const startX = srcX + NODE_RADIUS * Math.cos(angle);
    const startY = srcY + NODE_RADIUS * Math.sin(angle);

    // Calculate the ending point on the perimeter of the end node
    const endX = destX - NODE_RADIUS * Math.cos(angle);
    const endY = destY - NODE_RADIUS * Math.sin(angle);

    // Draw the edge line
    this.ctx.beginPath();
    this.ctx.moveTo(startX, startY);
    this.ctx.lineTo(endX, endY);
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
    this.ctx.closePath();

    // Display the weight
    const textX = (startX + endX) / 2;
    const textY = (startY + endY) / 2;
    this.ctx.fillStyle = "black";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.font = "20px Arial";
    this.ctx.fillText(weight, textX, textY);
  }

  // To render the entire graph onto the canvas.
  render() {
    this.ctx.drawImage(this.image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    for (const [id, node] of Object.entries(this.graph.adjacencyList)) {
      this.drawNode(node.node);
    }

    for (const startNode of Object.values(this.graph.adjacencyList)) {
      for (const neighbour of Object.values(startNode.edges)) {
        this.drawEdge(
          startNode.node.posX,
          startNode.node.posY,
          neighbour.node.posX,
          neighbour.node.posY,
          this.graph.getWeight(startNode.node.id, neighbour.node.id),
          "purple"
        );
      }
    }
  }

  //Display the shortest path from the start node of the course
  // to the last control node.
  showShortest(path) {
    for (let i = 0; i < path.length - 1; i++) {
      let currentId = path[i];
      let nextId = path[i + 1];

      let currentNode = this.graph.getNode(currentId).node;
      let nextNode = this.graph.getNode(nextId).node;

      this.drawEdge(
        currentNode.posX,
        currentNode.posY,
        nextNode.posX,
        nextNode.posY,
        this.graph.getWeight(currentId, nextId),
        "red"
      );
    }
  }
}

export default View;
