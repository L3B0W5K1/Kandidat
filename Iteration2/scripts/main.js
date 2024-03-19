import MapData from "./model/map.js";
import EditView from "./views/editView.js";
import EditController from "./controllers/editController.js";
import Game from "./model/game.js";
import MenuView from "./views/menuView.js";
import MenuController from "./controllers/menuController.js";

const GAME_STATE = {
  MENU: "menu",
  PLAY: "play",
  EDIT: "edit",
  KILL: "kill",
};

class Main {
  constructor() {
    this.lastFrame = 0;
    this.currentState = null;
    this.lastState = null;

    this.view = null;
    this.controller = null;

    this.imagePaths = [ "images/FourLevels.jpg"];
    this.images = [];

    this.jsonGraphPaths = ["graphs/standardGraph.json"];

    this.mapDatas = [];

    this.init();
  }

  async init() {
    this.currentState = GAME_STATE.MENU;
    this.lastState = this.currentState;

    for (let i = 0; i < this.imagePaths.length; i++) {
      let image = new Image();
      image.src = this.imagePaths[i];
      this.images[i] = image;

      let mapData = new MapData(this.images[i]);

      this.mapDatas[i] = mapData;
    }

    this.view = new MenuView();
    this.constroller = new MenuController(this.view, this);
    document.body.innerHTML = "";
    this.view.render();
    this.lastFrame = performance.now();

    this.gameLoop();
  }

  gameLoop() {
    if (this.currentState === GAME_STATE.KILL) {
      return;
    }

    document.body.innerHTML = "";
    switch (this.currentState) {
      case GAME_STATE.MENU:
        this.view = new MenuView();
        this.controller = new MenuController(this.view, this);
        break;
      case GAME_STATE.EDIT:
        this.view = new EditView(
          this.mapDatas[0].image,
          this.mapDatas[0].getGraph(),
          this.mapDatas[0].getControls()
        );
        this.controller = new EditController(this.mapDatas[0], this.view);
        break;
      case GAME_STATE.PLAY:
        this.constroller = null;
        this.view = null;
        const game = new Game();
    }
    if (this.currentState !== GAME_STATE.PLAY) {
      this.lastState = this.currentState;
      this.view.render();
    }
  }

  switchState(state) {
    this.currentState = state;

    this.gameLoop();
  }
}

const main = new Main();
