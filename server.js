const express = require("express");
const app = express();

//Connecting MongoDB
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/Edudictive", {
  useNewUrlParser: !0,
  useUnifiedTopology: !0,
  useCreateIndex: !0,
  useFindAndModify: !0
});

//View Engine & Static File Routing
app.set("view engine", "ejs");
app.use("/assets", express.static("assets"));

//Environment Variables
require("dotenv").config();

///////////////////////////////////TO BE DELETED
//ADMIN ROUTES
const AdminController = require("./controllers/Admin.controller");
app.use("/admin", AdminController)
///////////////////////////////////TO BE DELETED

//Parsing Body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Passport Config
const passport = require("passport");
require("./controllers/auth/passport")(passport);

//Creating a session
const session = require("express-session");
app.use(
  session({
    secret: process.env.SECRET,
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

///////////////////////////////////TO BE DELETED
app.get('/summerbootcamp', (req, res) => {
  res.render('OFFERINDEX')
})

app.get('/summerbootcamp/register', (req, res) => {
  res.render('auth')
})

const registerer = require('./models/HOMEOFFER')
app.post('/summerbootcamp/register', (req, res) => {
  const { uName, uEmail, csName, uCourse, uInsti, uNum, KeyCode } = req.body;

  const RegisterThis = new registerer();
  RegisterThis.uName = uName;
  RegisterThis.uEmail = uEmail;
  RegisterThis.csName = csName;
  RegisterThis.uInsti = uInsti;
  RegisterThis.uCourse = uCourse
  RegisterThis.uNum = uNum;
  RegisterThis.KeyCode = KeyCode;

  RegisterThis.save();

  res.render('confirm');
})
///////////////////////////////////TO BE DELETED

// INTIALISING Controllers
app.use("/", require('./controllers/Home.controller'));
app.use("/user", require('./controllers/User.controllers'));

const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`Server started on ${PORT}`));