const bcrypt = require("bcryptjs");

module.exports = {

  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.session.redirectTo = req.originalUrl;
    res.redirect("/user/login");
  },

  ensureAdmin: function (req, res, next) {
    if (req.isAuthenticated() && req.user.isAdmin) {
      return next();
    }
    req.session.redirectTo = req.originalUrl;
    res.redirect("/user/login");
  },

  forwardAuthenticated: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect("/user/dashboard");
  },

  GenerateOTP: () => {
    return Math.floor(100000 + Math.random() * 900000);
  },

  GenerateRandom: (digits) => {
    var RandomString = "";
    var possible =
      "YU3IOAT1a8NM6qSKt1yuszxc6HJ2bXCVBERwe9rklL5Zv4dfghj5DFG27iopWnm3QP4";
    for (var i = 0; i < digits; i++) {
      RandomString += possible.charAt(
        Math.floor(Math.random() * possible.length)
      );
    }
    return RandomString;
  },

  PassCheck: (passcode, cpasscode, ErrMsg) => {
    //Check passwords match
    if (passcode !== cpasscode) {
      ErrMsg.news.push("Passwords do not match");
      return;
    }

    //Check password length
    if (passcode.length < 6) {
      ErrMsg.news.push("Password should be atleast 6 characters");
    }

    if (passcode.length > 14) {
      ErrMsg.news.push("Password length should not exceed 14 characters");
    }

    //Check password strength
    if (!passcode.match(/[a-z]/)) {
      ErrMsg.news.push("Password must contain a Lowercase Letter");
    }

    if (!passcode.match(/[A-Z]/)) {
      ErrMsg.news.push("Password must contain a Uppercase Letter");
    }

    if (!passcode.match(/[0-9]/)) {
      ErrMsg.news.push("Password must contain a Numeric Digit");
    }

    if (!passcode.match(/[\W]/)) {
      ErrMsg.news.push("Password must contain a Special Character");
    }

    return;
  },

  HashSalt: async (Passcode) => {
    return await new Promise((resolve, reject) => {
      bcrypt.genSalt(12, (err, salt) =>
        bcrypt.hash(Passcode, salt, (err, hash) => {
          if (err) reject(err)
          resolve(hash)
        })
      )
    })
  },

  EmailCheck: (userEmail, ErrMsg) => {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    userEmail = userInput.value.replace(/\s/g, "");
    if (userEmail.match(mailformat)) {
      return
    } else {
      ErrMsg.news.push("EMAIL NOT VALID")
    }
  },

  escapeRegex: (text) => {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  }
};
