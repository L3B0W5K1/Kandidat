document.addEventListener("DOMContentLoaded", function () {
  // Placeholder data
  const maps = ["Map 1", "Map 2", "Map 3"];
  const difficulties = ["Easy", "Medium", "Hard"];

  const mapDropdown = document.getElementById("map-dropdown");
  const difficultyDropdown = document.getElementById("difficulty-dropdown");

  // Populate maps dropdown
  maps.forEach((map) => {
    const option = document.createElement("option");
    option.value = map;
    option.innerText = map;
    mapDropdown.appendChild(option);
  });

  // Populate difficulty dropdown
  difficulties.forEach((difficulty) => {
    const option = document.createElement("option");
    option.value = difficulty;
    option.innerText = difficulty;
    difficultyDropdown.appendChild(option);
  });

  // Form submission handler
  document
    .getElementById("random-start-form")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent the form from submitting the traditional way

      const selectedMap = mapDropdown.value;
      const selectedDifficulty = difficultyDropdown.value;
      const numberOfControls = document.getElementById("number-controls").value;

      console.log(
        `Map: ${selectedMap}, Difficulty: ${selectedDifficulty}, Number of Controls: ${numberOfControls}`
      );
      // You can add your logic to handle the chosen options here.
    });
});
