import MapData from "./map.js";
import Observable from "./observers.js";

class Mode {
  constructor(imageIndex) {
    this.imagePaths = ["images/karta1.jpeg", "images/FourLevels.jpg"];

    this.image = new Image();
    this.image.src = this.imagePaths[imageIndex - 1];

    this.map = new MapData();
    this.observers = new Observable();
  }

  goToHomePage() {
    window.location.href = "index.html";
  }

  // Method to subscribe observers
  subscribe(observer) {
    this.observers.subscribe(observer);
  }

  // Method to unsubscribe observers
  unsubscribe(observer) {
    this.observers.unsubscribe(observer);
  }
}

export default Mode;
