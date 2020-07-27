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
    Live: {
        type: Boolean
    },
    Archive: {
        type: Boolean
    },
    EventName: {
        type: String,
        required: true
    },
    StartTime: {
        type: String,
        required: true
    },
    EndTime: {
        type: String,
        required: true
    },
    EventType: {
        type: String,
        enum: ['Webinar', 'Session']
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
        position: String,
        company: String
    }]
},{ timestamps: true })

module.exports = mongoose.model("Events List", EventSchema);