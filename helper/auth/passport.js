const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;
const bcrypt = require("bcryptjs");

let ErrMsg = { news: [] };
let SucMsg = { news: [] };

// Load User model
const userModel = require("../../models/User.model");

module.exports = function (passport) {
    passport.use(
        new LocalStrategy(
            { usernameField: "uEmail", passwordField: "uPass" },
            async (uEmail, uPass, done) => {
                // Match user
                await userModel
                    .findOne({
                        uEmail: uEmail,
                    })
                    .then((user) => {
                        if (!user) {
                            return done(null, false, {
                                message: "Email is not registered",
                            });
                        }
                        //Activated User Check
                        if (!user.isActive) {
                            return done(null, false, {
                                message: "Please activate your account first",
                            });
                        }

                        // Match password
                        bcrypt.compare(uPass, user.uPass, (err, isMatch) => {
                            if (err) throw err;
                            if (isMatch) {
                                return done(null, user);
                            } else {
                                return done(null, false, { message: "The password does not match" });
                            }
                        });
                    });
            }
        )
    );

    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GCLIENTID,
                clientSecret: process.env.GCLIENTSECRET,
                callbackURL: "https://www.edudictive.in/user/auth/google/confirm",
                passReqToCallback: true,
            },
            (request, accessToken, refreshToken, profile, done) => {
                userModel.findOne({ uEmail: profile.email }, async function (err, user) {
                    if (user) {
                        if (typeof user.google.id !== 'undefined') {
                            await userModel.updateOne({ _id: user._id }, { $set: { "google.id": profile.id } })
                        }
                        return done(err, user);
                    }

                    if (!user) {
                        let NewUser = new userModel({
                            uEmail: profile.email,
                            ufName: profile.given_name,
                            ulName: profile.family_Name,
                            "google.id": profile.id,
                            isActive: true,
                        });

                        NewUser.save()
                            .then((user) => {
                                return done(err, user);
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    }
                });
            }
        )
    );

    passport.use(
        new FacebookStrategy(
            {
                clientID: process.env.FAPPID,
                clientSecret: process.env.FCLIENTSECRET,
                callbackURL: "https://www.edudictive.in/user/login/fb/confirm",
                profileFields: [
                    "id",
                    "displayName",
                    "photos",
                    "email",
                    "gender",
                    "name",
                ],
            },
            (accessToken, refreshToken, profile, done) => {
                userModel.findOne({ uEmail: profile.emails[0].value }, async function (err, user) {
                    if (user) {
                        if (typeof user.facebook.id !== 'undefined') {
                            await userModel.updateOne({ _id: user._id }, { $set: { "facebook.id": profile.id } })
                        }
                        return done(err, user);
                    }

                    if (!user) {
                        let NewUser = new userModel({
                            uEmail: profile.emails[0].value,
                            ufName: profile.name.givenName,
                            ulName: profile.name.familyName,
                            "facebook.id": profile.id,
                            isActive: true,
                        });
                        NewUser.save()
                            .then((user) => {
                                return done(err, user);
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    }
                });
            }
        )
    );

    passport.use(
        new LinkedInStrategy(
            {
                clientID: process.env.LCLIENTID,
                clientSecret: process.env.LCLIENTSECRET,
                callbackURL: "https://www.edudictive.in/login/linkedin/confirm",
                scope: ["r_liteprofile", "r_emailaddress"],
                profileFields: ["id", "firstName", "lastName", "handle"],
            },
            (accessToken, refreshToken, profile, done) => {
                userModel.findOne({ uEmail: profile.emails[0].value }, async function (err, user) {
                    if (user) {
                        if (typeof user.google.id !== 'undefined') {
                            await userModel.updateOne({ _id: user._id }, { $set: { "linkedin.id": profile.id } })
                        }
                        return done(err, user);
                    }

                    if (!user) {
                        let NewUser = new userModel({
                            uEmail: profile.emails[0].value,
                            ufName: profile.name.givenName,
                            ulName: profile.name.familyName,
                            "linkedin.id": profile.id,
                            isActive: true,
                        });

                        NewUser.save()
                            .then((user) => {
                                return done(err, user);
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    }
                });
            }
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        userModel.findById(id).then((user) => {
            done(null, user);
        });
    });
};
