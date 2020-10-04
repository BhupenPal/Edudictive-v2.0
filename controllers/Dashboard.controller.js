const express = require('express')
const Router = express.Router()
const CourseRegister = require('../models/CourseRegister')

const { ensureAuthenticated } = require("../helper/service");

Router.get("/", ensureAuthenticated, (req, res, next) => {
  res.render("Dashboard/Profile");
});

Router.get('/programs', (req, res, next) => {
  CourseRegister.find({ UserID: req.user._id}, (err, doc) => {
    res.render("Dashboard/MyPrograms", { doc })
  })
})

module.exports = Router