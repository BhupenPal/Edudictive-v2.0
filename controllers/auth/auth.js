module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.session.redirectTo = req.originalUrl;
    res.redirect("/user/login");
  },

  forwardAuthenticated: function(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect("/user/dashboard");
  }
};
