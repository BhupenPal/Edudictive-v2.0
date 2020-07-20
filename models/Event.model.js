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
    EventURL: {
        type: String
    },
    EventName: {
        type: String,
        required: true
    },
    StartTime: {
        type: Date,
        required: true
    },
    EventType: {
        type: String,
        enum: ['Webinar', 'Session']
    },
    EndTime: {
        type: Date,
        required: true
    },
    Duration: {
        type: String,
        required: true
    },
    Fees: {
        type: String,
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