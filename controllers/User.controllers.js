const express = require("express");
const Router = express.Router();
const passport = require("passport");
const UserModel = require("../models/User.model");
const CourseModel = require("../models/Course.model");
const transporter = require("../helper/mail/config");
let ErrMsg = { news: [] };
let SucMsg = { news: [] };

//Services
const { GenerateRandom, PassCheck, HashSalt, ensureAuthenticated, forwardAuthenticated } = require("../helper/service");

//SERVICES
const { courseUpload } = require("../helper/UploadManager");

//Mails
const { verificationMail } = require("../helper/mail/content");

Router.get("/login", (req, res, next) => {
  res.render("Home/Login");
});

Router.post("/login", (req, res, next) => {
  if (req.xhr) {
    const { remember } = req.body;
    try {
      passport.authenticate("local", (err, user, info) => {
        if (err) {
          res.send(err);
        }
        if (info) {
          res.send(info.message);
        }
        if (user) {
          req.login(user, (err) => {
            if (err) {
              res.send(err);
            } else {
              if (!remember || remember === "on") {
                req.session.cookie.expires = false;
              } else {
                req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;
              }
              res.send("Login Success");
            }
          });
        }
      })(req, res, next);
    } catch (err) {
      res.send(err);
      res.end();
    }
  } else {
    res.send("Link Not Accessible");
    res.end();
  }
});

Router.post(
  "/login/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

Router.get(
  "/auth/google/confirm",
  passport.authenticate("google", {
    successRedirect: "/user/dashboard",
    failureRedirect: "/user/login",
  })
);

Router.get(
  "/login/facebook",
  passport.authenticate("facebook", {
    scope: "email",
  })
);

Router.get(
  "/login/facebook/confirm",
  passport.authenticate("facebook", {
    successRedirect: "/user/dashboard",
    failureRedirect: "/user/login",
  })
);

Router.get("/login/linkedin", passport.authenticate("linkedin"));
Router.get(
  "/login/linkedin/confirm",
  passport.authenticate("linkedin", {
    successRedirect: "/user/dashboard",
    failureRedirect: "/user/login",
  })
);

Router.get("/register", (req, res, next) => {
  res.render("Home/Register");
});

Router.post("/register", (req, res, next) => {
  ErrMsg.news = [];
  SucMsg.news = [];
  if (req.xhr) {
    try {
      const {
        uEmail,
        ufName,
        ulName,
        uPass,
        upNum,
        uRole,
        uAddr,
        uState,
        uPinCode,
        uInsti,
        ucPass,
        agreement,
      } = req.body;

      if (!agreement || agreement === "on") {
        ErrMsg.news.push("You must agree with T&C's");
        return res.send(ErrMsg);
      }

      //Check required fields
      if (
        !ufName ||
        !ulName ||
        !uEmail ||
        !upNum ||
        !uAddr ||
        !uRole ||
        !uState ||
        !uPinCode ||
        !uPass ||
        !ucPass
      ) {
        ErrMsg.news.push("Please fill in all fields");
      }

      if (ErrMsg.news.length == 0) {
        PassCheck(uPass, ucPass, ErrMsg);
      }

      if (ErrMsg.news.length > 0) {
        return res.send(ErrMsg);
      } else {
        UserModel.findOne({ uEmail: uEmail }).then((user) => {
          if (user) {
            ErrMsg.news.push("Email already exists");
            res.send(ErrMsg);
            res.end();
          } else {
            UserModel.findOne({ upNum: upNum }).then((user) => {
              if (user) {
                ErrMsg.news.push("Phone number already exists");
                res.send(ErrMsg);
                res.end();
              } else {
                const SecretToken = GenerateRandom(32);
                const NewUser = new UserModel({
                  ufName,
                  ulName,
                  uEmail,
                  upNum,
                  uAddr,
                  uRole,
                  uState,
                  uPinCode,
                  uInsti,
                  uPass,
                  SecretToken,
                });

                //Hash Password
                HashSalt(NewUser);

                let mailOptions = {
                  from: '"Edudictive" <contact@edudictive.in>', // sender address
                  to: uEmail, // list of receivers
                  subject: "Edudictive Account Verification Mail", // Subject line
                  html: verificationMail(ufName, SecretToken), // html body
                };

                // send mail with defined transport object
                transporter.sendMail(mailOptions, (error, info) => {
                  if (!error) {
                    SucMsg.news.push("Email Sent");
                    res.send(SucMsg);
                  } else {
                    res.send(
                      "The request could not be completed due to the error: " +
                        error
                    );
                  }
                });
              }
            });
          }
        });
      }
    } catch (err) {
      res.send(err);
    }
  } else {
    res.send("Link Not Accessible");
  }
});

Router.get("/reset", (req, res, next) => {
  res.render("Home/ForgotPass");
});

Router.post("/reset", async (req, res, next) => {
  const { uEmail } = req.body;

  let user = null;

  if (isNaN(uEmail)) {
    user = await UserModel.findOne({ uEmail });
  } else {
    user = await UserModel.findOne({ upNum: uEmail });
  }

  if (!user) {
    ErrMsg.news.push("User not found!");
    return res.send(ErrMsg);
  }

  let KeyToken = GenerateRandom(16);

  user.ResetToken = KeyToken;
  user.save();

  let mailOptions = {
    from: '"Edudictive" <contact@edudictive.in>', // sender address
    to: uEmail, // list of receivers
    subject: "Edudictive Password Reset", // Subject line
    html: resetMail(user.ufName, KeyToken), // html body
  };

  transporter.sendMail(mailOptions);

  SucMsg.news.push("Rest Mail Send");
  return res.send(SucMsg);
});

Router.get("/verify", async (req, res, next) => {
  const user = await UserModel.findOne({ SecretToken: req.query.token });
  if (!user) {
    return res.render("Home/UserActivate", { userVerified: false });
  }
  user.SecretToken = null;
  user.isActive = true;
  user.save();
  res.render("Home/UserActivate", { userVerified: true });
});

Router.get("/logout", (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.redirect("/");
});

/* FOR ADMINS ONLY */
//ADD COURSES
Router.get("/add-course", (req, res, next) => {
  res.render("Home/AddCourse");
});

Router.post("/add-course", courseUpload, (req, res, next) => {
  //const { name, price, description, cimage } = req.body;
  new CourseModel({
    courseTitle: req.body.courseID,
    price: req.body.price,
    duration: req.body.duration,
    about: req.body.about,
    startDate: req.body.startDate,
    mode: req.body.mode,
    contents: req.body.contents,
    key: req.body.key,
    whoShouldOpt: req.body.whoShouldOpt,
    cImage: req.body.cImage,
    cStructure: req.body.cStructure,
  });
  newCourse.save((err) => {
    if (err) {
      res.send("error");
    } else {
      res.send("done");
    }
  });
});

module.exports = Router;
