class Controller {

    constructor(graph, canvas, view) {
        this.graph = graph;
        this.canvas = canvas;
        this.view = view;

        this.id = 1;
        this.addEdge = false;

        this.startNode = null;
        this.destNode = null;

        this.mouseDownX = null;
        this.mouseDownY = null;

        this.save = document.getElementById("save");
 

        canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
        canvas.addEventListener('mouseup', this.handleMouseup.bind(this));
    }

    handleSave(event) {
        const jsonData = JSON.stringify(this.graph.adjacencyList);
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
    
        const link = document.createElement('a');
        link.href = url;
        link.download = 'graph_data.json';
        link.click();
    
        URL.revokeObjectURL(url)
    }

    handleMouseDown(event) {

        const rect = this.canvas.getBoundingClientRect();
        this.mouseDownX = event.clientX - rect.left;
        this.mouseDownY = event.clientY - rect.top;

    }

    handleMouseup(event){

        const rect = this.canvas.getBoundingClientRect();
        const mouseUpX = event.clientX - rect.left;
        const mouseUpY = event.clientY - rect.top;

        const distance = Math.sqrt((this.mouseDownX - mouseUpX) ** 2 + (this.mouseDownY- mouseUpY) ** 2);
        
        if(distance < 2) {
            this.graph.addNode(this.id, this.mouseDownX, this.mouseDownY);
            this.id++;
        } else {
            this.startNode = this.findNodeAtPosition(this.mouseDownX, this.mouseDownY);

            this.destNode = this.findNodeAtPosition(mouseUpX, mouseUpY);
            console.log(this.destNode);
            if (this.startNode && this.destNode !== this.startNode) {
                this.graph.addEdge(this.startNode.id, [this.destNode.id], 1);
            }

        }

        this.updateView();

    }

    findNodeAtPosition(x, y) {
        for (const [id, nodeData] of Object.entries(this.graph.adjacencyList)) {
            const node = nodeData.node;
            const distance = Math.sqrt((node.posX - x) ** 2 + (node.posY - y) ** 2);
            if (distance <= 10) { // Assuming node radius is 10
                return node;
            }
        }
        return null;
    }



    updateView() {
        this.view.render()
    }


    
}