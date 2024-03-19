const NODE_RADIUS = 5;

class EditView {
  constructor(game) {
    
    this.game = game;

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

        // init the canvas
        this.canvas = document.createElement("canvas");
        this.canvas.id = "canvas";
        this.canvas.width = 900;
        this.canvas.height = 900;
        this.canvas.style.border = "5px solid black";
        this.canvas.style.position = "absolute";
        this.canvas.style.top = "50%";
        this.canvas.style.left = "50%";
        this.canvas.style.transform = "translate(-50%,-50%)";
        this.ctx = this.canvas.getContext("2d");

        //Clears the entire html from rendering done by the menu
        document.body.innerHTML="";

    // Append canvas to document body or any other container
    document.body.appendChild(this.canvas);

    this.game.subscribe(this.update.bind(this));

  }

  // Draw the given node onto the canvas.
  drawNode(node, controls) {
    // Draw the node as a purple circle
    this.ctx.beginPath();
    this.ctx.arc(node.posX, node.posY, NODE_RADIUS, 0, Math.PI * 2);

    this.ctx.fillStyle = "purple";
    this.ctx.fill();
    this.ctx.closePath();

    // Draw the number text in white color
    if (node.id in controls) {
      this.ctx.fillStyle = "white";
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "middle";
      this.ctx.font = "12px Arial";
      this.ctx.fillText(controls[node.id], node.posX, node.posY);
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

  update({graph, image, controlNodes}) {

    const self = this;

    this.ctx.clearRect(0, 0,this.canvas.width, this.canvas.height);
    this.canvas.width = image.naturalWidth;
    this.canvas.height = image.naturalHeight;

    if (image.complete) {
      self.ctx.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight);
  } else {
      image.onload = function() {
          self.ctx.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight);
      };
  }

    for (const [id, node] of Object.entries(graph.adjacencyList)) {
      this.drawNode(node.node, controlNodes);
    }

    for (const startNode of Object.values(graph.adjacencyList)) {
      for (const neighbour of Object.values(startNode.edges)) {
        this.drawEdge(
          startNode.node.posX,
          startNode.node.posY,
          neighbour.node.posX,
          neighbour.node.posY,
          graph.getWeight(startNode.node.id, neighbour.node.id),
          "purple"
        );
      }
    }
  }
}

export default EditView;
