const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const EventSchema = new Schema({
    FirstName:{
        type: String,
        required: true,
    },
    LastName:{
        type:String,
        required:true,
    },
    Email:{
        type:String,
        required:true
    },
    Role: {
        type: String,
        required: true
    },
    Phone:{
        type: Number,
        required: true
    },
    CollegeName:{
        type: String,
        required: true
    }
},{ timestamps: true })

module.exports = mongoose.model("Events List", EventSchema);
