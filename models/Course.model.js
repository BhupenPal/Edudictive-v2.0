const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const courseSchema = new Schema({
    key: Number,
    courseTitle:String,
    price: Number,
    cStructure: String,
    cImage: String,
    duration: String,
    about: String,
    startDate: Date,
    batch: String,
    mode: String,
    contents: String,
    whoShouldOpt: String
})

module.exports = mongoose.model("Course", courseSchema);