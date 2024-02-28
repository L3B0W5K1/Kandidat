class View {

    constructor(image, graph) {
        this.image = image;
        this.graph = graph;
    }

    drawNode(posX, posY, num) {
        // Draw the node as a purple circle
        ctx.beginPath();
        ctx.arc(posX, posY, 10, 0, Math.PI * 2);
        ctx.fillStyle = 'purple';
        ctx.fill();
        ctx.closePath();
        
        // Draw the number text in white color
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = '12px Arial';
        ctx.fillText(num, posX, posY);
    }

    drawEdge(srcX, srcY, destX, destY, weight) {
        // Draw the edge line
        ctx.beginPath();
        ctx.moveTo(srcX, srcY);
        ctx.lineTo(destX, destY);
        ctx.strokeStyle = 'purple';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
    
        // Display the weights
        const textX = (srcX + destX) / 2;
        const textY = (srcY + destY) / 2;
        ctx.fillStyle = 'cyan';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = '20px Arial';
        ctx.fillText(weight, textX, textY);
    }

    render(){
        for (const [id, node] of Object.entries(this.graph.adjacencyList)) {
            this.drawNode(id, node.posX, node.posY);
        }
    
        for (const node of Object.values(this.graph.adjacencyList)) {
            for (const neighbour of Object.values(this.graph.adjacencyList[node.id].edges)) {
                this.drawEdge(node.posX,node.posY, this.graph.adjacencyList[neighbour.id].posX, graph.adjacencyList[neighbour.id].posY, neighbour.weight);
            }
        }
    
    }
}