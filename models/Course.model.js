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
    class: {
        type: String,
        enum: ['6-8', '9-12', 'college']
    },
    Category: {
        type: String,
        enum: ['Web Development', 'App Development', 'Game Development', 'Graphic Designing', 'AR/VR', 'Programming Core', 'Data Science', 'Graphics', 'Finance'],
        required: true
    },
    Mode: {
        type: String,
        enum: ['Online (Live)', 'Offline', 'Online & Offline'],
        required: true
    },
    About: {
        type: String,
        required: true
    },
    WhatULearn: [String],
    StartDate: {
        type: String,
        required: true
    },
    TimeFrame: {
        type: String,
        enum: ['Day', 'Week', 'Month', 'Year'],
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
    EarlyBird: {
        type: Boolean
    },
    WhatUGet: [String],
    Batch: {
        WeekendDate: String,
        WeekdayDate: String
    },
    Structure: [{
        NumOfTimeFrame: Number,
        Topic: String,
        Explain: String,
        ToDo: [String]
    }],
    Enrolled: {
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
        enum: ['Schools', 'Colleges', 'Schools and Colleges']
    },
    TotalReview: {
        type: Number,
        default: 0
    },
    Banner: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

module.exports = mongoose.model("Course List", courseSchema);