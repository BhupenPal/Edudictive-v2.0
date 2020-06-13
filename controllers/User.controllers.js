const passport = require("passport");
const UserModel = require("../models/User.model");
const Course = require("../models/Course.model");
const transporter = require("./mail/config/transport");
let ErrMsg = { news: [] };
let SucMsg = { news: [] };

//Services
const { GenerateRandom, PassCheck, HashSalt } = require("./services/service");

//Mails
const { verificationMail } = require("./mail/content/mails");

/* Home Routes */
module.exports = {
  getLogin: (req, res, next) => {
    res.render("Login");
  },

  postLogin: (req, res, next) => {
    if (req.xhr) {
      try {
        passport.authenticate("local", (err, user, info) => {
          if (err) {
            res.send(err);
            res.end();
          }
          if (info) {
            res.send(info.message);
            res.end();
          }
          if (user) {
            req.login(user, (err) => {
              if (err) {
                res.send(err);
                res.end();
              } else {
                res.send("Login Success");
                res.end();
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
  },

  googleLogin: passport.authenticate("google", {
    scope: ["profile", "email"],
  }),

  googleLoginConfirm: passport.authenticate("google", {
    successRedirect: "/user/dashboard",
    failureRedirect: "/user/login",
  }),

  facebookLogin: passport.authenticate("facebook", {
    scope: "email",
  }),

  facebookLoginConfirm: passport.authenticate("facebook", {
    successRedirect: "/user/dashboard",
    failureRedirect: "/user/login",
  }),

  linkedinLogin: passport.authenticate("linkedin"),

  linkedinLoginConfirm: passport.authenticate("linkedin", {
    successRedirect: "/user/dashboard",
    failureRedirect: "/user/login",
  }),

  getRegister: (req, res, next) => {
    res.render("Register");
  },

  postRegister: (req, res, next) => {
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
        } = req.body;

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
          res.send(ErrMsg);
          res.end();
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
  },

  getReset: (req, res, next) => {
    res.render("forgotPassword");
  },

  getVerify: async (req, res, next) => {
    const user = await UserModel.findOne({ SecretToken: req.query.token });
    if (!user) {
      return res.render("UserActivate", { userVerified: false });
    }
    user.SecretToken = null;
    user.isActive = true;
    user.save();
    res.render("UserActivate", { userVerified: true });
  },

  getDashboard: (req, res, next) => {
    res.render("Dashboard");
  },

  logout: (req, res, next) => {
    req.logout();
    req.session.destroy();
    res.redirect("/");
  },

  /* FOR ADMINS */
  getAddCourse: (req, res, next) => {
    res.render("AddCourse");
  },

  postAddCourse: (req, res, next) => {
    console.log(req.body);
    console.log(req.file);
    //const { name, price, description, cimage } = req.body;
    const newCourse = new Course({
      courseTitle : req.body.courseID,
      price : req.body.price,
      duration: req.body.duration,
      about: req.body.about,
      startDate: req.body.startDate,
      mode: req.body.mode,
      contents: req.body.contents,
      key: req.body.key,
      whoShouldOpt:req.body.whoShouldOpt,
      cImage: req.body.cImage,
      cStructure: req.body.cStructure
    }) 
    newCourse.save((err)=>{
      if(err){
        console.log(err.message)
        res.send("error")
        
      }
      else{
        res.send("done")  
      }
    })
  },
  
};
