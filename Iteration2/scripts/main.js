import MapData from "./model/map.js";
import View from "./view/view.js";
import Controller from "./controller/controller.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = (canvas.width = 900);
const CANVAS_HEIGHT = (canvas.height = 900);

//Pre defined graph data for the map.
const jsonGraph = "graphs/standardGraph.json";

//Init the model, view and controller
const mapData = new MapData();
await mapData.loadJSON(jsonGraph);

const view = new View(
  mapData.mapImage,
  mapData.getGraph(),
  ctx,
  mapData.getControls()
);
const controller = new Controller(mapData.statGraph, canvas, view, mapData);
