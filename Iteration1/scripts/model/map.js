const mapImage = new Image();
mapImage.src = "images/karta1.jpeg";

class MapData {

    
    constructor() {
        this.image = mapImage.src;

        this.statGraph = new Graph();

    this.statGraph.addNode(1, 200, 200, [2, 5, 4, 6] );
    this.statGraph.addNode(2, 300, 200, [1, 3, 5]);
    this.statGraph.addNode(3, 300, 100, [2, 15, 14]);
    this.statGraph.addNode(4, 100, 200,[1]);
    this.statGraph.addNode(5, 250, 150,[1, 2]);
    this.statGraph.addNode(6, 150,100, [1, 7]);
    this.statGraph.addNode(7, 100,50, [6, 8]);
    this.statGraph.addNode(8, 50, 100,[7, 9]);
    this.statGraph.addNode(9, 50, 300,[8, 10]);
    this.statGraph.addNode(10, 100, 350, [9, 11]);
    this.statGraph.addNode(11,200, 300, [10, 12]);
    this.statGraph.addNode(12, 300, 350, [11, 13]);
    this.statGraph.addNode(13,  350,  300,[12, 14]);
    this.statGraph.addNode(14,  350,  100, [13, 15 ,3, 16]);
    this.statGraph.addNode(15, 300, 50, [14, 3]);
    this.statGraph.addNode(16, 400,  200,[14, 17 ]);
    this.statGraph.addNode(17,  450,  150,[16, 18]);
    this.statGraph.addNode(18, 500, 200, [17, 19]);
    this.statGraph.addNode(19, 550, 250, [18, 20]);
    this.statGraph.addNode(20, 600, 300,[19]);


    this.controlNodes = {3:1, 4:2, 8:3, 12:4, 17:5};
        console.log(this.statGraph)
    }

    getGraph() {
        return this.statGraph;
    }
}