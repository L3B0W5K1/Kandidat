const NODE_RADIUS = 5;

class PlayerView   {

    constructor(game) {
        this.game = game;

        // Make the view an observer of the game.
        this.game.subscribe(this.update.bind(this));   
        
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
    
    }

    renderPlayer(playerNode) {
        this.ctx.fillStyle='red';

        this.ctx.beginPath();
        this.ctx.moveTo(playerNode.node.posX,playerNode.node.posY);
        this.ctx.arc(playerNode.node.posX, playerNode.node.posY, NODE_RADIUS, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
    }

    renderNeighbours(playerNode) {

        for (const neighbour of Object.values(playerNode.edges)) {
            this.ctx.strokeStyle = "red";

            this.ctx.beginPath();
            this.ctx.arc(neighbour.node.posX, neighbour.node.posY, NODE_RADIUS, 0, Math.PI * 2);
            this.ctx.stroke();
            this.ctx.closePath();
        }

    }

    renderpath(path) {
        for(const [order, node] of Object.entries(path)) {

            if(path[parseInt(order) + 1]) {
    
              let nextNode = path[parseInt(order) + 1].node;
    
              this.ctx.beginPath();
              this.ctx.moveTo(node.node.posX, node.node.posY);
              this.ctx.lineTo(nextNode.posX, nextNode.posY);
              this.ctx.strokeStyle = 'red'
              this.ctx.stroke();
              this.ctx.closePath();
            }
    
          }
    }

        update({startNode, playerNode, image, controlNodes, completed, shortestPath, playerPath}) {
            
            this.renderNeighbours(playerNode);
            this.renderPlayer(playerNode);

            if(completed) {
            this.renderpath(playerPath);
            }

        }
}

export default PlayerView;