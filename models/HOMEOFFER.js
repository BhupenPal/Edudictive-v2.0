const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const HOMEOFFERSCHEMA = new Schema({
    uEmail: {
        type: String
    },
    uName: {
        type: String
    },
    uNum: {
        type: Number
    },
    uInsti: {
        type: String
    },
    csName: {
        type: String
    },
    uCourse: {
        type: String
    },
    KeyCode: String
})



module.exports = mongoose.model("HOMEOFFER", HOMEOFFERSCHEMA);