const mongoose = require('mongoose');

const collegeTrialSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Phone: {
        type: Number,
        required: true
    },
    CollegeYear: {
        type: String,
        required: true
    },
    CollegeName: {
        type: String,
        required: true
    },
    DomainInterested: {
        type: String,
        required: true
    },
    LaptopPC: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("College Trials", collegeTrialSchema);