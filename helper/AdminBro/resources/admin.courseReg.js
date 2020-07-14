const CourseRegister = require("../../../models/CourseRegister");

const options = {
    parent: { name: "Courses" }
}

module.exports = {
    options,
    resource: CourseRegister
}