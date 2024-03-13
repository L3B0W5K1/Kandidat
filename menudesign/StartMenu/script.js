import Game from "../../Iteration2/scripts/model/game.js";



document.getElementById('premade-course').addEventListener('click', function() {
  console.log('Play Pre-Made Course clicked');
  const game = new Game()
});

document.getElementById('random-course').addEventListener('click', function() {
  console.log('Play Random Course clicked');
  // Add functionality for playing a random course here
});

document.getElementById('build-course').addEventListener('click', function() {
  console.log('Play Build Your Own Course clicked');
  // Add functionality for building your own course here
});
