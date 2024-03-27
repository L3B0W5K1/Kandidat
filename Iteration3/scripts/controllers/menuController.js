class MenuController {
  constructor(view, main) {
    this.view = view;
    this.main = main;

    this.view.playButton.addEventListener("click", () => {
      this.play();
    });
    this.view.editButton.addEventListener("click", () => {
      this.edit();
    });
  }

  play() {
    this.main.switchState("play");
  }

  edit() {
    this.main.switchState("edit");
  }
}

export default MenuController;
