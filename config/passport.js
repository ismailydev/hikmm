const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");

module.exports = function (passport) {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL:
                    `${process.env.HOST || ""}` + "/auth/google/callback",
            },
            async function (acessToken, refreshToken, profile, done) {
                console.log(profile);
                const newUser = {
                    googleId: profile.id,
                    displayName: profile.displayName,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    image: profile.photos[0].value,
                };
                try {
                    let user = await User.findOne({ googleId: profile.id });
                    if (user) {
                        done(null, user);
                    } else {
                        user = await User.create(newUser);
                        done(null, user);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        )
    );
    passport.use(
        new LocalStrategy(
            { usernameField: "email" },
            (email, password, done) => {
                User.findOne({ email: email.toLowerCase() }, (err, user) => {
                    if (err) {
                        return done(err);
                    }
                    if (!user) {
                        return done(null, false, {
                            msg: `Email ${email} not found.`,
                        });
                    }
                    if (!user.password) {
                        return done(null, false, {
                            msg: "Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.",
                        });
                    }
                    user.comparePassword(password, (err, isMatch) => {
                        if (err) {
                            return done(err);
                        }
                        if (isMatch) {
                            return done(null, user);
                        }
                        return done(null, false, {
                            msg: "Invalid email or password.",
                        });
                    });
                });
            }
        )
    );
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user));
    });
};
