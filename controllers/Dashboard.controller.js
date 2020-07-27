const express = require('express')
const Router = express.Router()

const { ensureAuthenticated, ensureAdmin } = require("../helper/service");

Router.get("/", ensureAuthenticated, (req, res, next) => {
  res.render("Dashboard/Profile");
});

module.exports = Router