const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const contactSchema = new Schema({
    Name:{
        type: String,
        required: true,
    },
    Email:{
        type: String,
        required: true
    },
    Number:{
        type: Number,
        required: true

    },
    Role: {
        type: String,
        required: true
    }
})



module.exports = mongoose.model("Contact Us", contactSchema);