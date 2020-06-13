const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const espSchema = new Schema({
    fName:{
        type: String,
        required: true,
    },
    cName:{
        type: String,
        required: true
    },
    pState:{
        type: String,
        required:true,
    },
    pCity:{
        type: String,
    },
    pEmail:{
        type: String,
        required: true,
    },
    ppNum:{
        type: Number,
        required: true

    },
    pAvailability: {
        type: String,
        required: true
    },
    Q1:{
        type: String,
    },
    Q2:{
        type: String,
    },
    Q3:{
        type: String,
    },
})



module.exports = mongoose.model("Student_Partner", espSchema);