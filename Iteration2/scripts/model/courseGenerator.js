import Graph from "./graph.js"

let currentControlNode = 1; //startId

class randomCourse {
  constructor() {}

  
  buildCourse(startId,courseDifficulty, controlAmount) {
    const legList = this.courseSpecifications(courseDifficulty,controlAmount) // generate list of legs
    


    for  (const leg in legList) {
      this.buildLeg(startId,leg)
    }
    
    updateCourse

  

  }

  buildLeg(currentControlNode, legDifficulty){ //  id where to start from last control

      let currentNode = nextNode;
      let currentJumps = 0;
    
      if (legDifficulty == "e") {
        let nextNode = _.sample(Graph.GetNeighbours(id)); // random granne
        let maxJumps = Math.random(10) //
        let maxFloorChange = 2;
        
       
        //Graph.adjacencyList[currentNode].edges[nextNode]; // 

        if (currentJumps < maxJumps && currentFloorChanges <= maxFloorChange) {
          placeraControl
        }

        if (floorchangeslogik) {
          currentFloorChanges = logik;
        }

        currentJumps += 1;

      }

      if (legDifficulty == "m") {
        let nextNode = _.sample(Graph.GetNeighbours(id)); // random granne
        let maxJumps = Math.random(20) // vet att detta är fel, fixar sen
        let maxFloorChange = 4;


        if (currentJumps < maxJumps && currentFloorChanges <= maxFloorChange) {
          placeraControl
        }

        if (floorchangeslogik) {
          currentFloorChanges = logik;
        }

        currentJumps += 1;

      }
      if (legDifficulty == "h") {
        let nextNode = _.sample(Graph.GetNeighbours(id)); // random granne
        let maxJumps = Math.random(30) //
        let maxFloorChange = 10;

        if (currentJumps < maxJumps && currentFloorChanges <= maxFloorChange) {
          placeraControl
        }

        if (floorchangeslogik) {
          currentFloorChanges = logik;
        }

        currentJumps += 1;


      
    }
    currentControl = newControlNode;
  }


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
