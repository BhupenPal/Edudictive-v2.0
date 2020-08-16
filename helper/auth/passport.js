const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;
const bcrypt = require("bcryptjs");

// Load User model
const userModel = require("../../models/User.model");

module.exports = function (passport) {
    passport.use(
        new LocalStrategy(
            { usernameField: "Email", passwordField: "Password" },
            async (Email, Password, done) => {
                // Match user
                await userModel
                    .findOne({ Email })
                    .then((user) => {
                        if (!user) {
                            return done(null, false, {
                                message: "Email is not registered",
                            });
                        }

                        // Match password
                        bcrypt.compare(Password, user.Password, (err, isMatch) => {
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
                userModel.findOne({ Email: profile.email }, async function (err, user) {
                    if (user) {
                        if (typeof user.google.id !== 'undefined') {
                            await userModel.updateOne({ _id: user._id }, { $set: { "google.id": profile.id } })
                        }
                        return done(err, user);
                    }

                    if (!user) {
                        let NewUser = new userModel({
                            Email: profile.email,
                            FirstName: profile.given_name,
                            LastName: profile.family_Name,
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
                callbackURL: "https://www.edudictive.in/user/login/facebook/confirm",
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
                userModel.findOne({ Email: profile.emails[0].value }, async function (err, user) {
                    if (user) {
                        if (typeof user.facebook.id !== 'undefined') {
                            await userModel.updateOne({ _id: user._id }, { $set: { "facebook.id": profile.id } })
                        }
                        return done(err, user);
                    }

                    if (!user) {
                        let NewUser = new userModel({
                            Email: profile.emails[0].value,
                            FirstName: profile.name.givenName,
                            LastName: profile.name.familyName,
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
                userModel.findOne({ Email: profile.emails[0].value }, async function (err, user) {
                    if (user) {
                        if (typeof user.google.id !== 'undefined') {
                            await userModel.updateOne({ _id: user._id }, { $set: { "linkedin.id": profile.id } })
                        }
                        return done(err, user);
                    }

                    if (!user) {
                        let NewUser = new userModel({
                            Email: profile.emails[0].value,
                            FirstName: profile.name.givenName,
                            LastName: profile.name.familyName,
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
