'use strict';

const _ = require('lodash');
const passport = require('passport');
const accountMgr = require('./../../managers/accountManager');
const User = require('./../../models/user');
const jwt = require('jsonwebtoken');
const requireAuth = passport.authenticate('jwt', {
    session: false,
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: 'Invalid username or password.',
    successFlash: 'Welcome!'
});

let genResult = () => {
    return {
        result: false,
        data: undefined,
        code: -1
    }
}


module.exports = function(logHandler) {
    const router = require('express').Router();

    router.use((request, response, next) => {
        logHandler.outputInfo(`${request.method}: ${request.originalUrl} From '${request.hostname}', Time: ${Date.now()} `);
        next();
    });


    router.route('/register')
        .get((request, response, next) => { next(); })
        .post((request, response, next) => {
            let username = request.body.username;
            let password = request.body.password;

            const user = new User({
                username: username,
                password: password
            });

            user.save(function(err) {
                if (err) {
                    return response.json({ message: 'Err' });
                }
                response.json({ message: 'Success' });
            });
        });

    // Authenticate the user and get a JSON Web Token to include in the header of future requests.
    router.route('/isAuthenticate')
        .get((request, response, next) => {
            requireAuth(request, response, () => {
                let username = request.body.username;
                response.json({ username: username });
            })
        })
        .post((request, response, next) => {
            requireAuth(request, response, () => {
                tokenUserName = request.user.username;
                let username = request.body.username;
                if (tokenUserName == username)
                    response.json({ username: username });
                else
                    response.json();
            })
        });

    router.route('/login')
        .get((request, response, next) => {
            next();
        })
        .post((request, response, next) => {
            let username = request.body.username;
            console.log(username);
            User.findOne({
                username: username
            }, function(err, user) {
                if (err) throw err;

                if (!user) {
                    response.status(401).json({ success: false, message: 'Authentication failed. User not found.' });
                } else {
                    // Check if password matches
                    user.comparePassword(request.body.password, function(err, isMatch) {
                        if (isMatch && !err) {
                            const option = {
                                expiresIn: 200
                            }
                            let tokenBody = {
                                username: username
                            }
                            const token = jwt.sign(tokenBody, 'longobnoxiouspassphrase', option);
                            response.status(200).json({ success: true, token: 'JWT ' + token });
                        } else {
                            response.status(401).json({ success: false, message: 'Authentication failed. Passwords did not match.' });
                        }
                    });
                }
            });

        });

    router.route('/logout')
        .get((request, response, next) => {
            response.json('logout');
        })
        .post((request, response, next) => {
            response.json('logout');
        });

    router.route('/test')
        .get((request, response, next) => {
            next();
        })
        .post((request, response, next) => {
            requireAuth(request, response, () => {
                console.log(request.user);
                console.log(request.body);
                next();
            })
        });

    return router;
}
