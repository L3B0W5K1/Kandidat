import EditController from "../controllers/editController.js";
import EditView from "../views/editView.js";
import MapData from "./map.js";
import Mode from "./Mode.js";

class EditMode extends Mode {
  constructor(imageIndex) {
    super(imageIndex);
    this.mapData = new MapData(this.image);

    this.view = new EditView(this);
    this.controller = new EditController(this, this.view);
    this.nodeID = 1;
    this.controlN = 1;

    this.state = {
      graph: this.mapData.getGraph(),
      image: this.image,
      controlNodes: this.mapData.getControls(),
    };

    this.observers.update(this.state);
  }

  handleSave() {
    const jsonData = JSON.stringify(this.mapData.getGraph());
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "graph_data.json";
    link.click();

    URL.revokeObjectURL(url);
  }

  addNode(x, y) {
    let nodeAtPos = this.mapData.findNodeAtPosition(x, y);

    //If there is a node at the position, we will make it a control
    if (nodeAtPos !== null) {
      this.mapData.addControl(nodeAtPos.id, this.controlN);
      this.controlN += 1;

      // Otherwise we just create a new node
    } else {
      this.mapData.addNode(this.nodeID, x, y);
      this.nodeID++;
    }

    this.observers.update(this.state);
  }

  addEdge(startX, startY, destX, destY, distance) {
    const startNode = this.mapData.findNodeAtPosition(startX, startY);

    const destNode = this.mapData.findNodeAtPosition(destX, destY);
    if (startNode && destNode !== startNode) {
      this.mapData.addEdge(startNode.id, destNode.id, distance);
    }
    console.log(this.mapData.getGraph());
    this.observers.update(this.state);
  }
}

export default EditMode;
