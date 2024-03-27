class PlayerController {
  constructor(game) {
    this.game = game;
    this.canvas = document.getElementById("canvas");
    this.rect = this.canvas.getBoundingClientRect();

    this.canvas.addEventListener("click", this.move.bind(this));
  }

  move(event) {
    this.rect = this.canvas.getBoundingClientRect();
    const x = event.clientX - this.rect.left - 5;
    const y = event.clientY - this.rect.top - 5;

    this.game.move(x, y);
  }
}

export default PlayerController;
