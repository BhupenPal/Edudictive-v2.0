const express = require("express");
const app = express();

//Connecting MongoDB
require('./config/database')()

//View Engine & Static File Routing
app.set("view engine", "ejs");
app.use("/assets", express.static("assets"));

//Environment Variables
require("dotenv").config({
  path: './config/.env'
});

//Admin Bro
app.use("/admin", require('./controllers/Admin.controller'));

//Parsing Body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Passport Config
const passport = require("passport");
require("./helper/auth/passport")(passport);

//Creating a session
const session = require("express-session");
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Passing user to application
app.use(function (req, res, next) {
  res.locals.user = req.user || null;
  res.locals.session = req.session;
  next();
});

// INTIALISING Controllers
app.use("/", require('./controllers/Home.controller'));
app.use("/user", require('./controllers/User.controllers'));
app.use("/user/dashboard", require('./controllers/Dashboard.controller'));

const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`Server started on ${PORT}`));