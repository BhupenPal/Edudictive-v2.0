const mongoose = require('mongoose');

const CourseRegSchema = new mongoose.Schema({
    UserID: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    FirstName:{
        type: String,
        required: true,
    },
    LastName:{
        type:String,
        required:true,
    },
    Email: {
        type: String
    },
    Phone:{
        type: Number,
        required: true
    },
    Role: {
        type: String,
        required: true
    },
    InstituteName: {
        type: String,
        required: true
    },
    CourseKey: {
        type: Number,
        required: true
    },
    CourseName: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("Course Register", CourseRegSchema);