import {MapData} from './model/map.js'

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 900;
const CANVAS_HEIGHT = canvas.height = 900;

const jsonGraph = "graphs/standardGraph.json";


    const mapData =  new MapData()
     await mapData.loadJSON(jsonGraph)
    
    const view = new View(mapData.mapImage, mapData.getGraph(), ctx);
    const controller = new Controller(mapData.statGraph, canvas, view);

    view.render();
 


