const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ESPSchema = new Schema({
    FullName:{
        type: String,
        required: true,
    },
    CollegeName:{
        type: String,
        required: true
    },
    State:{
        type: String,
        required:true,
    },
    Email:{
        type: String,
        required: true,
    },
    Phone:{
        type: Number,
        required: true
    },
    Availability: {
        type: String,
        required: true
    },
    Ques1:{
        type: String,
        required: true
    },
    Ques2:{
        type: String,
        required: true
    },
    Ques3:{
        type: String,
        required: true
    }
}, { timestamps: true })



module.exports = mongoose.model("Student Partner", ESPSchema);