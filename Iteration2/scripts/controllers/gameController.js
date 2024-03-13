class GameController {
    constructor(game, view) {
        this.game = game;
        this.view = view;

        this.menuButton = this.view.menuButton;

        this.menuButton.addEventListener('click', this.goToHomePage.bind(this));

        document.addEventListener('keydown', this.goToHomePage.bind(this))
    }

    goToHomePage() {
        this.game.goToHomePage();
    }
} 

export default GameController;