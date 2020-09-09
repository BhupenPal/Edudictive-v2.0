const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Number: {
        type: Number,
        required: true
    },
    Role: {
        type: String,
        required: true
    },
    Message: {
        type: String,
        // required: true
    }
}, {timestamps: true})

module.exports = mongoose.model("Contact Us", contactSchema);