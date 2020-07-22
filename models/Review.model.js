const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema({
    UserID: {
        type: mongoose.Schema.ObjectId
    },
    Name: {
        type: String,
        required: true
    },
    College: {
        type: String,
        required: true
    },
    Msg: {
        type: String,
        required: true
    },
    CourseKey: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Course Reviews", ReviewSchema);
