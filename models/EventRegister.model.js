const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const EventRegSchema = new Schema({
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
    }
})

module.exports = mongoose.model("Event Register", EventRegSchema);