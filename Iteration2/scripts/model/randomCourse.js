class randomCourse {
  constructor() {}

  //shuffle the order of elements
  shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  //choose number of controls and their difficulty.
  courseSpecifications(difficulty, controlNumber) {
    let controls = [];

    //the percentage of each type of difficulty
    if (difficulty == "Hard") {
      var hardControls = Math.round(controlNumber * 0.4);
      var mediumControls = Math.round(controlNumber * 0.3);
      var easyControls = Math.round(controlNumber * 0.3);
    }

    if (difficulty == "Medium") {
      var hardControls = Math.round(controlNumber * 0);
      var mediumControls = Math.round(controlNumber * 0.6);
      var easyControls = Math.round(controlNumber * 0.4);
    }

    if (difficulty == "Easy") {
      var hardControls = Math.round(controlNumber * 0);
      var mediumControls = Math.round(controlNumber * 0);
      var easyControls = Math.round(controlNumber * 1);
    }

    var totalControls = hardControls + mediumControls + easyControls;

    //to make sure the number of controls is exactly what the user inputs
    if (totalControls !== controlNumber) {
      let diff = Math.abs(totalControls - controlNumber);

      if (totalControls < controlNumber) {
        easyControls += diff;
      } else {
        if (hardControls > 0) {
          mediumControls -= diff;
        } else {
          easyControls -= diff;
        }
      }
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
