const mongoose = require('mongoose');

const careerModel = new mongoose.Schema({
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
    LinkedIn: {
        type: String,
        required: true
    },
    Resume: {
        type: String,
        required: true
    },
    Reference: {
        type: String,
        required: true
    },
    Field: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("Career Forms", careerModel);