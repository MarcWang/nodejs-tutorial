'use strict';

const passport = require('passport');

module.exports = function(logHandler) {
    const router = require('express').Router();

    router.route('/signup')
        .post((request, response, next) => {
            passport.authenticate('local-signup', {
                successRedirect: '/profile',
                failureRedirect: '/signup',
                failureFlash: true,
            }, (err, user, info) => {
                if (err) {
                    response.json({ result: false, msg: err });
                } else {
                    response.json({ result: true });
                }

            })(request, response, next);
        })
        .get((request, response, next) => { response.status(400).send('not implemented'); })
        .put((request, response, next) => { response.status(400).send('not implemented'); })
        .delete((request, response, next) => { response.status(400).send('not implemented'); });

    router.route('/login')
        .post((request, response, next) => {
            passport.authenticate('local-login', {
                successRedirect: '/profile',
                failureRedirect: '/login',
                failureFlash: true,
            }, (err, user, info) => {
                if (err) {
                    console.log(info);
                    response.json({ result: false, msg: err });
                } else {
                    response.json({ result: true });
                }

            })(request, response, next);
        })
        .get((request, response, next) => { response.status(400).send('not implemented'); })
        .put((request, response, next) => { response.status(400).send('not implemented'); })
        .delete((request, response, next) => { response.status(400).send('not implemented'); });

    router.route('/auth/facebook/callback')
        .get((request, response, next) => {
            passport.authenticate('facebook', {
                scope: ['user_friends', 'user_birthday', 'user_hometown', 'user_location', 'email']
            }, (err, user, info) => {
                if (err) {
                    response.json({ result: false, msg: err });
                } else {
                    response.json({ result: true });
                }

            })(request, response, next);
        })
        .post((request, response, next) => { response.status(400).send('not implemented'); })
        .put((request, response, next) => { response.status(400).send('not implemented'); })
        .delete((request, response, next) => { response.status(400).send('not implemented'); });

    router.route('/auth/twitter/callback')
        .get((request, response, next) => {
            passport.authenticate('twitter', {
                successRedirect: '/profile',
                failureRedirect: '/',
                failureFlash: true,
            }, (err, user, info) => {
                if (err) {
                    console.log(err);
                    response.json({ result: false, msg: err });
                } else {
                    response.json({ result: true });
                }

            })(request, response, next);
        })
        .post((request, response, next) => { response.status(400).send('not implemented'); })
        .put((request, response, next) => { response.status(400).send('not implemented'); })
        .delete((request, response, next) => { response.status(400).send('not implemented'); });

    router.route('/auth/google/callback')
        .get((request, response, next) => {
            passport.authenticate('google', {
                scope: ['profile', 'email']
            }, (err, user, info) => {
                if (err) {
                    console.log(err);
                    response.json({ result: false, msg: err });
                } else {
                    response.json({ result: true });
                }

            })(request, response, next);
        })
        .post((request, response, next) => { response.status(400).send('not implemented'); })
        .put((request, response, next) => { response.status(400).send('not implemented'); })
        .delete((request, response, next) => { response.status(400).send('not implemented'); });

    return router;
}
