import MapData from "./model/map.js";
import View from "./view/view.js";
import Controller from "./controller/controller.js";
import Player from "./model/player.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = (canvas.width = 900);
const CANVAS_HEIGHT = (canvas.height = 900);

//Pre defined graph data for the map.
const jsonGraph = "graphs/standardGraph.json";

//Init the model, view and controller
const mapData = new MapData();
await mapData.loadJSON(jsonGraph);

const startNodeId = 1;
const player = new Player(startNodeId,mapData.getControls()); // Choose the startNodeId accordingly

const view = new View(
  mapData.mapImage,
  mapData.getGraph(),
  ctx,
  mapData.getControls(),
  player
);


const controller = new Controller(mapData.statGraph, canvas, view, mapData, player);


