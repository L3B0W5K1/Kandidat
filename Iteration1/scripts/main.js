const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 1000;
const CANVAS_HEIGHT = canvas.height = 1000;



const mapData = new MapData() 
const view = new View(mapData.image, mapData.statGraph);
const controller = new Controller(mapData.statGraph);



onload = function() {
    view.render();
};


