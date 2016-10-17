const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');
const ConfigAuth = require('./auth');

let memoryDB = new Map();

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        console.log('session keep');
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: false,
        },
        function(username, password, done) {
            console.log('local-signup on passport middleware');
            console.log(`username : ${username} , password : ${password}`);

            if (memoryDB.has(username)) {
                done('Username already exists');
            } else {
                // password has to be hash
                memoryDB.set(username, password);
                done(null, true);
            }
        }));

    passport.use('local-login', new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: false,
        },
        function(username, password, done) {
            console.log('local-login on passport middleware');
            console.log(`username : ${username} , password : ${password}`);
            if (memoryDB.has(username)) {
                const _pwd = memoryDB.get(username);
                if (_pwd === password) {
                    done(null, true);
                } else {
                    done('Password is error');
                }
            } else {
                done('Username not exists');
            }
        }));

    passport.use(new TwitterStrategy({
            consumerKey: ConfigAuth.twitterAuth.consumerKey,
            consumerSecret: ConfigAuth.twitterAuth.consumerSecret,
            callbackURL: ConfigAuth.twitterAuth.callbackURL,
        },
        function(token, tokenSecret, profile, done) {
            console.log('twitter');
            // console.log(`token ${token}`);
            // console.log(`tokenSecret ${tokenSecret}`);
            // console.log(`profile ${profile}`);
            // console.log(JSON.stringify(profile));
            done(null, 'success');
        }));

    passport.use(new FacebookStrategy({
        clientID: process.env.OAUTH2_FB_ID || ConfigAuth.facebookAuth.clientID,
        clientSecret: process.env.OAUTH2_FB_SECRET || ConfigAuth.facebookAuth.clientSecret,
        callbackURL: ConfigAuth.facebookAuth.callbackURL,
        profileFields: ['id', 'email', 'first_name', 'last_name', 'displayName'],
    }, (token, refreshToken, profile, done) => {
        console.log('facebook');
        console.log(`token ${token}`);
        console.log(`refreshToken ${refreshToken}`);
        console.log(`facebook id ${profile.id}`);
        console.log(`facebook email ${profile.emails[0].value}`);
        console.log(profile);

        done();
        // process.nextTick(function() {
        //     User.findOne({ 'facebook.id': profile.id }, function(err, user) {
        //         if (err)
        //             return done(err);
        //         if (user) {
        //             return done(null, user);
        //         } else {
        //             var newUser = new User();
        //             newUser.facebook.id = profile.id;
        //             newUser.facebook.token = token;
        //             newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
        //             newUser.facebook.email = (profile.emails[0].value || '').toLowerCase();

        //             newUser.save(function(err) {
        //                 if (err)
        //                     throw err;
        //                 return done(null, newUser);
        //             });
        //         }
        //     });
        // });

    }));

    passport.use(new GoogleStrategy({
            clientID: process.env.OAUTH2_GOOGLE_ID || ConfigAuth.googleAuth.clientID,
            clientSecret: process.env.OAUTH2_GOOGLE_SECRET || ConfigAuth.googleAuth.clientSecret,
            callbackURL: ConfigAuth.googleAuth.callbackURL,
        },
        function(token, refreshToken, profile, done) {
            console.log('google');
        }));
};
