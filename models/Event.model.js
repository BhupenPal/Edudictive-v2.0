const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const EventSchema = new Schema({
    // Key:{
    //     type:Number,
    //     required:true,
    //     unique:true
    // },
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
})

module.exports = mongoose.model("Event Register", EventSchema);