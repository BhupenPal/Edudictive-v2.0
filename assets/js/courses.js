let courses = document.querySelectorAll(".course-card");
let gradientArray = [
  "linear-gradient(180deg, #6A11CB 0%, #2575FC 100%);",
  "linear-gradient(180deg, #30CFD0 0%, #330867 100%);",
  "linear-gradient(180deg, #453A94 0%, #F43B47 100%);",
  "linear-gradient(180deg, #6A11CB 0%, #FA71CD 100%);",
  "linear-gradient(180deg, #FF0844 0%, #FFB199 100%);",
  "linear-gradient(180deg, #453A94 0%, #F43B47 100%);",
  "linear-gradient(180deg, #00063D 0%, #004e92 100%);",
  "linear-gradient(180deg, #30CFD0 0%, #330867 100%);",
  "linear-gradient(180deg, #6A11CB 0%, #FA71CD 100%);",
  "linear-gradient(180deg, #00063D 0%, #004e92 100%);"
]

courses.forEach(item => {
  item.setAttribute("style",`background-image: ${gradientArray[item.getAttribute("data-value")]}`)
})
