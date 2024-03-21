import EditMode from "../../Iteration2/scripts/model/editMode.js";

document.addEventListener("DOMContentLoaded", function () {
  // Placeholder for adding courses dynamically, you would fetch this data or retrieve it from an array.
  const courses = ["Course 1", "Course 2", "Course 3"];

  const courseDropdown = document.getElementById("course-dropdown");
  courses.forEach((course) => {
    const option = document.createElement("option");
    option.value = course;
    option.innerText = course;
    courseDropdown.appendChild(option);
  });

  document.getElementById("play-course").addEventListener("click", function () {
    const selectedCourse = courseDropdown.value.slice(-1);
    let editMode = new EditMode(selectedCourse);

    // Add functionality to play the selected course
  });
});
