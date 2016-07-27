'use strict';

var express = require('express');
var router = express.Router();
var AM = require('./managers/accountMgr');
let emailManager = require('./managers/email');
let mailMgr = new emailManager();

router.use(function timeLog(request, response, next) {
    console.log('Time: ', Date.now());
    request.session.views = (request.session.views || 0) + 1
        // console.log(`isNew = ${request.session.isNew}`);
        // console.log(`views = ${request.session.views}`);
        // console.log(`length = ${request.session.length}`);

    if (request.session.logined) {
        console.log('user still login');
    } else {
        console.log('user not login');
    }
    next();

});

router.route('/')
    .get((request, response, next) => {
        let user = request.session.username;
        let pass = request.session.password;
        console.log(user);
        if (user == undefined || pass == undefined) {
            response.json({ result: false, message: 'not login' });
        } else {
            if (!request.session.logined) {
                AM.autoLogin(user, pass, (err, res) => {
                    if (err) {
                        request.session.logined = false;
                        request.session.username = user;
                        request.session.password = pass;
                        response.json({ result: false });
                    } else {
                        request.session.logined = true;
                        response.json({ result: true, message: 'login', user: user });
                    }
                    next();
                })
            } else {
                response.json({ result: true, message: 'still login', user: user });
                next();
            }
        }

    });

router.route('/login')
    .post((request, response, next) => {
        console.log("apiLogin");
        let user = request.body.user;
        let pass = request.body.pass;

        if (!request.session.logined) {
            AM.manualLogin(user, pass, (err, res) => {
                if (err) {
                    request.session.logined = false;
                    response.json({ result: false });
                } else {
                    request.session.logined = true;
                    request.session.username = user;
                    request.session.password = pass;
                    response.json({ result: true, message: 'login', user: user });
                }
                next();
            })
        } else {
            response.json({ result: true, message: 'still login', user: user });
            next();
        }
    });

router.route('/logout')
    .get((request, response, next) => {
        console.log("apiLogout");
        request.session.logined = false;
        request.session.username = undefined;
        request.session.password = undefined;
        response.json({ result: true, message: 'logout' });
        next();
    })
    .post((request, response, next) => {
        console.log("apiLogout");
        request.session.logined = false;
        request.session.username = undefined;
        request.session.password = undefined;
        response.json({ result: true, message: 'logout' });
        next();
    });

router.route('/signup')
    .post(function(request, response, next) {
        console.log("apiSignup");
        let user = request.body.user;
        let pass = request.body.pass;
        let email = request.body.email;

        AM.addNewUser({
            username: user,
            password: pass,
            email: email
        }, (err, res) => {
            if (err) {
                response.json({ result: false, message: err });
            } else {
                response.json({ result: true, message: 'signup' });
            }
            next();
        });
    });

router.route('/reset-password')
    .post(function(request, response, next) {
        console.log("apiResetPassword");
        let newPass = request.body.pass;
        let email = request.body.email;

        AM.updatePassword({
            email: email,
            password: newPass
        }, (err, res) => {
            if (err) {
                response.json({ result: false, message: err });
            } else {
                response.json({ result: true, message: 'reset-password' });
            }
            next();
        })
    });

router.route('/lost-password')
    .post(function(request, response, next) {
        console.log("apiLostPassword");
        let email = request.body.email;

        AM.getUserByEmail(email, (err, res) => {
            if (err) {
                response.json({ result: false, message: err });
            } else {
                response.json({ result: true, message: 'lost-password' });
                mailMgr.send(email, 'This is Subject', 'This is Text');
            }
            next();
        })
    });

router.route('/delete')
    .get((request, response, next) => {
        console.log("delete");
        next();
    })
    .post(function(request, res, next) {
        console.log("delete");

        let user = request.body.user;
        let pass = request.body.pass;

        AM.removeUser({
            username: user
        }, (err, res) => {
            if (err) {
                console.log(err);
            } else {
                console.log(res);
            }
            next();
        })
        next();
    });

module.exports = router;
