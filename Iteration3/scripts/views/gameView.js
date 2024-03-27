const TRIANGLE_SIZE = 20;
const CONTROL_RADIUS = 15;

class GameView {
  constructor(game) {
    this.game = game;

    // init the canvas
    this.canvas = document.createElement("canvas");
    this.canvas.id = "canvas";
    this.canvas.width = 900;
    this.canvas.height = 900;
    this.canvas.style.border = "5px solid black";
    // this.canvas.style.position = "absolute";
    // this.canvas.style.top = "50%";
    // this.canvas.style.left = "50%";
    // this.canvas.style.transform = "translate(-50%,-50%)";
    this.ctx = this.canvas.getContext("2d");

    //Clears the entire html from rendering done by the menu
    document.body.innerHTML = "";

    // Append canvas to document body or any other container
    document.body.appendChild(this.canvas);

    /* Do this for different observers. Like one for only tracking 
            tracking the player pos or the menu.
        const playerObservers = new Observable();
        const mapObservers = new Observable();
        */
    this.menuContainer = document.createElement("div");
    this.game.subscribe(this.update.bind(this));
    this.menuButton = document.createElement("button");
    this.menuButton.setAttribute("id", "menuButton");
    this.menuButton.textContent = "Quit";

    this.menuContainer.appendChild(this.menuButton);
  }
  //Render the startNode as a triangle
  renderStartNode(startNode, angle, fstControl) {
    //this.ctx.arc(startNode.node.posX,startNode.node.posY)

    // Calculate the coordinates of the vertices relative to the start node's position
    const x = startNode.node.posX;
    const y = startNode.node.posY;
    const x1 = x + TRIANGLE_SIZE * Math.cos(angle);
    const y1 = y + TRIANGLE_SIZE * Math.sin(angle);
    const x2 = x + TRIANGLE_SIZE * Math.cos(angle + (2 * Math.PI) / 3);
    const y2 = y + TRIANGLE_SIZE * Math.sin(angle + (2 * Math.PI) / 3);
    const x3 = x + TRIANGLE_SIZE * Math.cos(angle + (4 * Math.PI) / 3);
    const y3 = y + TRIANGLE_SIZE * Math.sin(angle + (4 * Math.PI) / 3);

    // Draw the triangle
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.lineTo(x3, y3);
    this.ctx.closePath();

    // Set the stroke style and draw the triangle outline
    this.ctx.strokeStyle = "purple";
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(
      fstControl.node.posX - CONTROL_RADIUS * Math.cos(angle),
      fstControl.node.posY - CONTROL_RADIUS * Math.sin(angle)
    );
    this.ctx.stroke();
    this.ctx.closePath();
  }

  //Rendering of the controlNodes.
  rendercontrolNodes(controlNodes) {
    for (const [controlNum, node] of Object.entries(controlNodes)) {
      // Render control as a circle
      this.ctx.beginPath();
      this.ctx.arc(
        node.node.posX,
        node.node.posY,
        CONTROL_RADIUS,
        0,
        Math.PI * 2
      );

      this.ctx.strokeStyle = "purple";
      this.ctx.stroke();
      this.ctx.closePath();

      // Render control number
      this.ctx.fillStyle = "black";
      this.ctx.font = "12px Arial";
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "middle";
      this.ctx.fillText(controlNum, node.node.posX + 15, node.node.posY - 15);

      if (controlNodes[parseInt(controlNum) + 1]) {
        let nextNode = controlNodes[parseInt(controlNum) + 1].node;
        const angle = Math.atan2(
          nextNode.posY - node.node.posY,
          nextNode.posX - node.node.posX
        );

        // Set line color and width
        const startX = node.node.posX + CONTROL_RADIUS * Math.cos(angle);
        const startY = node.node.posY + CONTROL_RADIUS * Math.sin(angle);
        const endX = nextNode.posX - CONTROL_RADIUS * Math.cos(angle);
        const endY = nextNode.posY - CONTROL_RADIUS * Math.sin(angle);

        // Set line color and width
        this.ctx.strokeStyle = "purple";

        // Draw line between current control and next control
        this.ctx.beginPath();
        this.ctx.moveTo(startX, startY);
        this.ctx.lineTo(endX, endY);
        this.ctx.stroke();
        this.ctx.closePath();
      } else {
        // Render the extra circle for the last control node
        this.ctx.beginPath();
        this.ctx.arc(
          node.node.posX,
          node.node.posY,
          CONTROL_RADIUS - 3,
          0,
          Math.PI * 2
        );

        this.ctx.strokeStyle = "purple";
        this.ctx.stroke();
        this.ctx.closePath();
      }
    }
  }

  calculateAngle(startNode, fstControl) {
    const deltaX = fstControl.node.posX - startNode.node.posX;
    const deltaY = fstControl.node.posY - startNode.node.posY;

    // Calculate the angle using atan2
    const angle = Math.atan2(deltaY, deltaX);

    // Ensure the angle is in the range [0, 2*PI)
    return angle >= 0 ? angle : angle + 2 * Math.PI;
  }

  renderShortestPath(path) {
    for (const [order, node] of Object.entries(path)) {
      if (path[parseInt(order) + 1]) {
        let nextNode = path[parseInt(order) + 1].node;

        this.ctx.beginPath();
        this.ctx.moveTo(node.node.posX, node.node.posY);
        this.ctx.lineTo(nextNode.posX, nextNode.posY);
        this.ctx.strokeStyle = "blue";
        this.ctx.stroke();
        this.ctx.closePath();
      }
    }
  }

  // update function which is called from the observerable.
  update({
    startNode,
    playerNode,
    image,
    controlNodes,
    completed,
    shortestPath,
    playerPath,
  }) {

    

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.canvas.width = image.naturalWidth;
    this.canvas.height = image.naturalHeight;
    this.ctx.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight);

    
    const controlNodeValues = Object.values(controlNodes);
    const fstControl = controlNodeValues[0];

    let angle = this.calculateAngle(startNode, fstControl);

    this.renderStartNode(startNode, angle, fstControl);
    this.rendercontrolNodes(controlNodes);

    if (completed) {
      this.renderShortestPath(shortestPath);
    }
  }
}

export default GameView;
