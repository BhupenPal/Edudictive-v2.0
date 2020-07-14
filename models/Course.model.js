const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    Key: {
        type: Number,
        required: true,
        unique: true
    },
    Title: {
        type: String,
        required: true
    },
    Price: {
        type: Number,
        required: true
    },
    Discount: {
        type: Number
    },
    Category: {
        type: String,
        enum: ['Technical', 'Finance'],
        required: true
    },
    Mode: {
        type: String,
        enum: ['Online', 'Offline', 'Online & Offline'],
        required: true
    },
    About: {
        type: String,
        required: true
    },
    WhatULearn: {
        type: String,
        required: true
    },
    StartDate: {
        type: String,
        required: true
    },
    TimeFrame: {
        type: String,
        enum: ['Week', 'Month', 'Year'],
        required: true
    },
    Duration: {
        type: String,
        required: true
    },
    Location: {
        type: String,
        required: true
    },
    WhoShouldOpt : {
        type: String,
        required: true
    },
    WhatUGet: [String],
    Batch: {
        WeekendDate: String,
        WeekdayDate: String
    },
    Structure: [{
        NumOfWeek: Number,
        Topic: String,
        Explain: String,
        ToDo: [String]
    }],
    EnrolledStudents: {
        type: Number,
        default: 0
    },
    Rating: {
        type: Number,
        default: 5
    },
    SuitedFor: {
        type: String,
        required: true,
        enum: ['School', 'College', 'School and College']
    },
    Reviews: [{
        UserID: {
            type: mongoose.Schema.ObjectId,
            required: true
        },
        Name: {
            type: String,
            required: true
        },
        College: {
            type: String,
            required: true
        },
        Msg: {
            type: String,
            required: true
        }
    }],
    Banner: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

module.exports = mongoose.model("Course List", courseSchema);