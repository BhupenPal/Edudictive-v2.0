const mongoose = require('mongoose');

const EventRegSchema = new mongoose.Schema({
    FirstName: {
        type: String,
        required: true,
    },
    LastName: {
        type: String,
        required: true,
    },
    InterestedDomain: {
        type: String
    },
    Email: {
        type: String
    },
    Phone: {
        type: Number,
        required: true
    },
    Role: {
        type: String,
        required: true
    },
    Key: {
        type: Number,
        required: true
    },
    EventName: {
        type: String,
        required: true
    },
    CollegeName: {
        type: String
    }
}, { timestamps: true })

module.exports = mongoose.model("Event Register", EventRegSchema);