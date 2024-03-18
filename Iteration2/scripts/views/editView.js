const NODE_RADIUS = 5;

class EditView {
  constructor(image, graph, controls) {
    this.image = image;
    this.graph = graph;
    this.controls = controls;

    this.menuContainer = document.createElement("div");
    this.menuContainer.classList.add("menu-container");

    this.save = document.createElement("button");
    this.save.textContent = "Save";
    this.save.classList.add("menu-button");

    this.shortest = document.createElement("button");
    this.shortest.textContent = "Show Shortest Path";
    this.shortest.classList.add("menu-button");

    this.menuContainer.appendChild(this.save);
    this.menuContainer.appendChild(this.shortest);

    this.canvas = document.createElement("canvas");
    this.canvas.id = "canvas";
    this.canvas.width = this.image.naturalWidth;
    this.canvas.height = this.image.naturalHeight;
    this.canvas.style.border = "5px solid black";
    this.canvas.style.position = "absolute";
    this.canvas.style.top = "50%";
    this.canvas.style.left = "50%";
    this.canvas.style.transform = "translate(-50%,-50%)";
    this.ctx = this.canvas.getContext("2d");

    // Append canvas to document body or any other container
    document.body.appendChild(this.canvas);
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
   /* const textX = (startX + endX) / 2;
    const textY = (startY + endY) / 2;
    this.ctx.fillStyle = "black";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.font = "20px Arial";
    this.ctx.fillText(weight, textX, textY);
    */
  }

  // To render the entire graph onto the canvas.
  render() {
    document.body.appendChild(this.menuContainer);

      this.ctx.drawImage(
      this.image,
      0,
      0,
      this.image.naturalWidth,
      this.image.naturalHeight
    );

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

export default EditView;
