class EditController {
  constructor(game, view) {
    this.game = game;
    this.view = view;

    this.canvas = this.view.canvas;

    this.save = this.view.save;

    document.addEventListener("keydown", this.goToHomePage.bind(this));

    /*
    this.save = document.getElementById("save");
    this.shortest = document.getElementById("shortest");
*/
    this.save.addEventListener("click", this.handleSave.bind(this));

    canvas.addEventListener("mousedown", this.handleMouseDown.bind(this));
    canvas.addEventListener("mouseup", this.handleMouseup.bind(this));
  }

  // Handle the event of the user clicking "show shortest path button"
  handleShortest() {
    const path = this.mapData.calculateShortest();
    this.view.showShortest(path);
  }

  //Handle the event of the user clicking the "save" button.
  // This will saved the currently displayed graph.
  // This is more of a tool to easily create a standard graph for
  // multiple different images.
  handleSave() {
    this.game.handleSave();
  }

  // Fires when the user pushes down the mouse button.
  handleMouseDown(event) {
    const rect = this.canvas.getBoundingClientRect();
    this.mouseDownX = event.clientX - rect.left - 5;
    this.mouseDownY = event.clientY - rect.top - 5;
  }

  // Fires when the user realeases the mouse button.
  // It keeps track of the distance that the user has
  // moved the mouse when pushing it down.
  // The distance will determin if the user wants to
  // create a node or an edge between two nodes.
  handleMouseup(event) {
    const rect = this.canvas.getBoundingClientRect();
    const mouseUpX = event.clientX - rect.left - 5;
    const mouseUpY = event.clientY - rect.top - 5;

    const distance = Math.sqrt(
      (this.mouseDownX - mouseUpX) ** 2 + (this.mouseDownY - mouseUpY) ** 2
    );

    // if the user has barely moved the mouse, then we create a node.
    if (distance < 2) {
      this.game.addNode(mouseUpX, mouseUpY);

      // else we will create an edge.
      // To determin which nodes we will use the findNodeAtPosition() function.
    } else {
      this.game.addEdge(
        this.mouseDownX,
        this.mouseDownY,
        mouseUpX,
        mouseUpY,
        distance
      );
    }
  }

  // we find the node by checking if the user has pushed down/ realeased
  // the mouse inside the radius of any node in the graph.
  // The node radius = 10.
  // If no node is found, it will return null.

  goToHomePage() {
    this.game.goToHomePage();
  }
}

export default EditController;
