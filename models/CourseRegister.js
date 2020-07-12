const mongoose = require('mongoose');

const CourseRegSchema = new mongoose.Schema({
    FirstName:{
        type: String,
        required: true,
    },
    LastName:{
        type:String,
        required:true,
    },
    Phone:{
        type: Number,
        required: true
    },
    Role: {
        type: String,
        required: true
    },
    CollegeName:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Course Register", CourseRegSchema);