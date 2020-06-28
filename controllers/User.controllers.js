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
                if (!remember || remember === 'on') {
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
          agreement
        } = req.body;

        if(!agreement || agreement === 'on') {
          ErrMsg.news.push("You must agree with T&C's")
          return res.send(ErrMsg)
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
  },

  getReset: (req, res, next) => {
    res.render("ForgotPass");
  },

  postReset: async (req, res, next) => {

    const { uEmail } = req.body;
    
    let user = null;
    
    if(isNaN(uEmail)) {
      user = await UserModel.findOne({ uEmail })
    } else {
      user = await UserModel.findOne({ upNum: uEmail })
    }

    if(!user) {
      ErrMsg.news.push('User not found!')
      return res.send(ErrMsg)
    }

    let KeyToken = GenerateRandom(16);

    user.ResetToken = KeyToken
    user.save()

    let mailOptions = {
      from: '"Edudictive" <contact@edudictive.in>', // sender address
      to: uEmail, // list of receivers
      subject: "Edudictive Password Reset", // Subject line
      html: resetMail(user.ufName, KeyToken), // html body
    };

    transporter.sendMail(mailOptions)

    SucMsg.news.push('Rest Mail Send')
    return res.send(SucMsg)
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
