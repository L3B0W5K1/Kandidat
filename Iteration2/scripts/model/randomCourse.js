class randomCourse {
  constructor() {}

  //getting a random number of controls(temp)
  getRandomNumber(max, min) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  //shuffle the order of elements
  shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }   

  //choose number of controls and their difficulty.
  courseSpecifications(difficulty) {
    var numberOfControls;
    let controls = [];

    //the percentage of each type of difficulty
    if (difficulty == "Hard") {
      numberOfControls = this.getRandomNumber(35, 25);
      var hardControls = Math.round(numberOfControls * 0.4);
      var mediumControls = Math.round(numberOfControls * 0.3);
      var easyControls = Math.round(numberOfControls * 0.3);
    }

    if (difficulty == "Medium") {
      numberOfControls = this.getRandomNumber(30, 20);
      var hardControls = Math.round(numberOfControls * 0.1);
      var mediumControls = Math.round(numberOfControls * 0.6);
      var easyControls = Math.round(numberOfControls * 0.3);
    }

    if (difficulty == "Easy") {
      numberOfControls = this.getRandomNumber(15, 25);
      var hardControls = Math.round(numberOfControls * 0);
      var mediumControls = Math.round(numberOfControls * 0.1);
      var easyControls = Math.round(numberOfControls * 0.9);
    }

    //loops that put a letter in the list for the type of control it is
    for (let i = 0; i < hardControls; i++) {
      controls.push("h");
    }
    for (let i = 0; i < mediumControls; i++) {
      controls.push("m");
    }
    for (let i = 0; i < easyControls; i++) {
      controls.push("e");
    }

    return this.shuffleArray(controls);
  }
}
//to be able to use it is html file (?)
export default randomCourse;
