class EditController {
  constructor(mapData, view) {
    this.view = view;

    this.canvas = this.view.canvas;

    this.mapData = mapData;
    this.graph = this.mapData.getGraph();

    this.id = this.graph.getOrder();
    this.addEdge = false;

    this.startNode = null;
    this.destNode = null;

    this.mouseDownX = null;
    this.mouseDownY = null;

    this.save = this.view.save;
    this.shortest = this.view.shortest;

    this.controlN = 1;
    this.controlNodes = {};

    /*
    this.save = document.getElementById("save");
    this.shortest = document.getElementById("shortest");
*/
    this.save.addEventListener("click", this.handleSave.bind(this));
    this.shortest.addEventListener("click", this.handleShortest.bind(this));

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
    const jsonData = JSON.stringify(this.graph.adjacencyList);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "graph_data.json";
    link.click();

    URL.revokeObjectURL(url);
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
      let nodeAtPos = this.findNodeAtPosition(mouseUpX, mouseUpY);
      if (nodeAtPos !== null) {
        this.controlNodes[nodeAtPos.id] = this.controlN;
        this.mapData.addControl(nodeAtPos.id, this.controlN);
        this.controlN += 1;
      } else {
        this.id++;
        this.graph.addNode(this.id, this.mouseDownX, this.mouseDownY);
      }

      // else we will create an edge.
      // To determin which nodes we will use the findNodeAtPosition() function.
    } else {
      this.startNode = this.findNodeAtPosition(
        this.mouseDownX,
        this.mouseDownY
      );

      this.destNode = this.findNodeAtPosition(mouseUpX, mouseUpY);
      if (this.startNode && this.destNode !== this.startNode) {
        this.graph.addEdge(this.startNode.id, this.destNode.id, distance);
      }
    }
    this.updateView();
  }

  // we find the node by checking if the user has pushed down/ realeased
  // the mouse inside the radius of any node in the graph.
  // The node radius = 10.
  // If no node is found, it will return null.
  findNodeAtPosition(x, y) {
    for (const [id, nodeData] of Object.entries(this.graph.adjacencyList)) {
      const node = nodeData.node;
      const distance = Math.sqrt((node.posX - x) ** 2 + (node.posY - y) ** 2);
      if (distance <= 5) {
        return node;
      }
    }
    return null;
  }

  // Make view render the updated graph:
  updateView() {
    this.view.render();
  }
}

export default EditController;
