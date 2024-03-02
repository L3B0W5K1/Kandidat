
const NODE_RADIUS = 10;
const CANVAS_WIDTH = canvas.width = 900;
const CANVAS_HEIGHT = canvas.height = 900;

class View {

    constructor(image, graph, ctx) {
        this.image = image;
        this.graph = graph;
        this.ctx = ctx
        console.log(this.graph)
        
        this.render();
    }

    drawNode(id, posX, posY) {
        // Draw the node as a purple circle
        this.ctx.beginPath();
        this.ctx.arc(posX, posY, NODE_RADIUS, 0, Math.PI * 2);
        
        this.ctx.fillStyle = 'purple';
        this.ctx.fill();
        this.ctx.closePath();
        
        // Draw the number text in white color
        this.ctx.fillStyle = 'white';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.font = '12px Arial';
        this.ctx.fillText(id, posX, posY);
    }

    drawEdge(srcX, srcY, destX, destY, weight) {
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
        this.ctx.strokeStyle = 'purple';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
        this.ctx.closePath();
    
        // Display the weight
        const textX = (startX + endX) / 2;
        const textY = (startY + endY) / 2;
        this.ctx.fillStyle = 'black';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.font = '20px Arial';
        this.ctx.fillText(weight, textX, textY);
    }

    render(){
        console.log(this.graph)
        console.log(this.graph.adjacencyList)
        this.ctx.drawImage(this.image,0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
        for (const [id, node] of Object.entries(this.graph.adjacencyList)) {
            this.drawNode(id, node.node.posX, node.node.posY);
        }

        for (const startNode of Object.values(this.graph.adjacencyList)) {
            for (const neighbour of Object.values(startNode.edges)) {
                this.drawEdge(startNode.node.posX, startNode.node.posY, neighbour.node.posX, neighbour.node.posY, this.graph.getWeight(startNode.node.id, neighbour.node.id));
            }
        }
    
    }
}