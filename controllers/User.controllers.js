const express = require("express");
const Router = express.Router();
const passport = require("passport");
const UserModel = require("../models/User.model");

//Pilot is sent to client with status
let Pilot = { status: 'failed', news: [] };

//Services
const { GenerateRandom, PassCheck, HashSalt, ensureAuthenticated, forwardAuthenticated } = require("../helper/service");

const { SendMail } = require("../helper/mail/config");

//Mails
const { verificationMail, resetMail } = require("../helper/mail/content");

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
  Pilot.news = []
  if (req.xhr) {
    try {
      const {
        Email,
        FirstName,
        LastName,
        Password,
        Phone,
        Role,
        Address,
        State,
        PinCode,
        Institute,
        cPassword,
        agreement,
      } = req.body;

      if (!agreement || agreement === "on") {
        Pilot.news.push("You must agree with T&C's");
        return res.send(Pilot);
      }

      //Check required fields
      if (
        !FirstName ||
        !LastName ||
        !Email ||
        !Phone ||
        !Address ||
        !Role ||
        !State ||
        !PinCode ||
        !Password ||
        !cPassword
      ) {
        Pilot.news.push("Please fill in all fields");
      }

      if (Pilot.news.length == 0) {
        PassCheck(Password, cPassword, Pilot);
      }

      if (Pilot.news.length > 0) {
        return res.send(Pilot);
      } else {
        UserModel.findOne({ Email }).then((user) => {
          if (user) {
            Pilot.news.push("Email already exists");
            res.send(Pilot);
            res.end();
          } else {
            UserModel.findOne({ Phone }).then((user) => {
              if (user) {
                Pilot.news.push("Phone number already exists");
                res.send(Pilot);
                res.end();
              } else {
                const SecretToken = GenerateRandom(32);
                const NewUser = new UserModel({
                  FirstName,
                  LastName,
                  Email,
                  Phone,
                  Address,
                  Role,
                  State,
                  PinCode,
                  Institute,
                  Password,
                  SecretToken
                });

                //Hash Password
                HashSalt(NewUser);

                // send mail with defined transport object
                let MailHTML = verificationMail(FirstName, SecretToken)
                SendMail(Email, 'HooHoop Account Activation Email', MailHTML, Pilot.news)
                if (Pilot.news > 0) {
                  return res.json(Pilot)
                }

                Pilot.status = 'success'
                res.json(Pilot)
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
  Pilot.news = []

  const { Email } = req.body;

  let user = null;

  if (isNaN(Email)) {
    user = await UserModel.findOne({ Email });
  } else {
    user = await UserModel.findOne({ Phone: Email });
  }

  if (!user) {
    Pilot.news.push("User not found!");
    return res.send(Pilot);
  }

  let KeyToken = GenerateRandom(16);

  user.ResetToken = KeyToken;
  user.save();

  let MailHTML = resetMail
  SendMail(Email, 'Edudictive Password Reset Email', MailHTML, Pilot.news)
  if (Pilot.news > 0) {
    return res.json(Pilot)
  }

  Pilot.news.push("Rest Mail Send");
  return res.send(Pilot);
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

module.exports = Router;
