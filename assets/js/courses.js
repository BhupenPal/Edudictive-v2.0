const JSON_COURSES = `${window.location.origin}/assets/Json/courses.json`

let coursedata = [];

fetch(JSON_COURSES)
  .then(response => response.json())
  .then(json => {
    json.forEach(element => {
        coursedata.push(element)
    });
  });

  console.log(coursedata)
