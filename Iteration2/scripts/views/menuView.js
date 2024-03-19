class MenuView {
  constructor() {
    this.menuContainer = document.createElement("div");
    this.menuContainer.classList.add("menu-container");

    this.playButton = document.createElement("button");
    this.playButton.textContent = "Play";
    this.playButton.classList.add("menu-button");

    this.editButton = document.createElement("button");
    this.editButton.textContent = "Edit Mode";
    this.editButton.classList.add("menu-button");


    this.menuContainer.appendChild(this.playButton);
    this.menuContainer.appendChild(this.editButton);
    this.menuContainer.appendChild(this.playButton);
  }

  render() {
    document.body.appendChild(this.menuContainer);
  }
}

export default MenuView;
