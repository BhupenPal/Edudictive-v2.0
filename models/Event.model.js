const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    Key: {
        type: Number,
        required: true,
        unique: true
    },
    Enrolled: {
        type: Number,
        default: 0
    },
    EventName: {
        type: String,
        required: true
    },
    StartTime: {
        type: Date,
        required: true
    },
    EndTime: {
        type: Date,
        required: true
    },
    Duration: {
        type: Number,
        required: true
    },
    Fees: {
        type: Number,
        required: true
    },
    About: {
        type: String,
        required: true
    },
    WhoShouldAttend: {
        type: String,
        required: true
    },
    Speakers: [{
        name: String,
        linkedin: String,
        position: String
    }]
},{ timestamps: true })

module.exports = mongoose.model("Events List", EventSchema);