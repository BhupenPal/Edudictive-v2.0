const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    Key: {
        type: Number,
        required: true,
        unique: true
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
    }
},{ timestamps: true })

module.exports = mongoose.model("Events List", EventSchema);