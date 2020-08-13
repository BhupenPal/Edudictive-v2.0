const mongoose = require('mongoose');

const schoolTrialSchema = new mongoose.Schema({
    ParentsName: {
        type: String,
        required: true
    },
    ParentsEmail: {
        type: String,
        required: true
    },
    ParentsPhone: {
        type: Number,
        required: true
    },
    StudentName: {
        type: String,
        required: true
    },
    SchoolName: {
        type: String,
        required: true
    },
    Grade: {
        type: String,
        required: true
    },
    LaptopPC: {
        type: String,
        required: true
    },
    State: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("School Trials", schoolTrialSchema);