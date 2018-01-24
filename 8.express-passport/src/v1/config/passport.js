// const JwtStrategy = require('passport-jwt').Strategy;
// const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('./../models/user');

// Setup work and export for the JWT passport strategy
// module.exports = function(passport) {
//     const opts = {
//         jwtFromRequest: ExtractJwt.fromAuthHeader(),
//         secretOrKey: 'longobnoxiouspassphrase',
//         ignoreExpiration: false
//     };
//     passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
//         User.findOne({ id: jwt_payload.id }, function(err, user) {
//             if (err) {
//                 return done(err, false);
//             }
//             if (user) {
//                 done(null, user);
//             } else {
//                 done(null, false);
//             }
//         });
//     }));
// };

module.exports = function(passport) {
    passport.use(new FacebookStrategy({
            clientID: FACEBOOK_APP_ID,
            clientSecret: FACEBOOK_APP_SECRET,
            callbackURL: "http://localhost:3000/auth/facebook/callback"
        },
        function(accessToken, refreshToken, profile, cb) {
            User.findOrCreate({ facebookId: profile.id }, function(err, user) {
                return cb(err, user);
            });
        }
    ));
};

// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     User.findOne({ username: username }, function(err, user) {
//       if (err) { return done(err); }
//       if (!user) {
//         return done(null, false, { message: 'Incorrect username.' });
//       }
//       if (!user.validPassword(password)) {
//         return done(null, false, { message: 'Incorrect password.' });
//       }
//       return done(null, user);
//     });
//   }
// ));
