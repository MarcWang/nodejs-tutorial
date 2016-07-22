'use strict';

const _ = require('lodash');
const passport = require('passport');
const accountMgr = require('./../../managers/accountManager');

let genResult = () => {
    return {
        result: false,
        data: undefined,
        code: -1
    }
}

function accountRegister(username, password, permission, thumbnail, email, phone) {
    let respData = genResult();

    return new Promise((resolve, reject) => {
        accountMgr.signup(username, password, permission, thumbnail, email, phone)
            .then((resultData) => {
                (resultData.code == 0) ? (respData.result = true) : (respData.result = false)
                respData.data = resultData.details;
                respData.code = resultData.code;
                resolve(respData);
            })
            .catch((error) => {
                respData.message = error;
                reject(respData);
            });
    });
}

module.exports = function(logHandler) {
    const router = require('express').Router();

    router.use((request, response, next) => {
        logHandler.outputInfo(`${request.method}: ${request.originalUrl} From '${request.hostname}', Time: ${Date.now()} `);
        next();
    });


    router.route('/register')
        .get((request, response, next) => {
            next();
        })
        .post((request, response, next) => {
            let username = request.body.username;
            let password = request.body.password;
            let email = request.body.email;
            let phone = request.body.phone;
            let permission = request.body.permission;
            let thumbnail = request.body.thumbnail;
            accountRegister(username, password, permission, thumbnail, email, phone)
                .then((value) => {
                    passport.authenticate('local')(request, response, () => {
                        console.log(request.session);
                        response.json(value);
                    });
                })
                .catch((error) => {
                    logHandler.outputError(`${request.originalUrl}` + error);
                    response.json(error);
                });
        });

    router.route('/login', passport.authenticate('local'))
        .get((request, response, next) => {
            next();
        })
        .post((request, response, next) => {
            console.log(request.session);
            let username = request.body.username;
            accountMgr.getProfile(username)
                .then((resultData) => {
                    response.json(resultData);
                })
                .catch((error) => {
                    response.json(error);
                });
        });

    router.route('/logout')
        .get((request, response, next) => {
            next();
        })
        .post((request, response, next) => {
            console.log(request.session);
            request.logout();
            console.log(request.session);
            response.json('logout');
        });

    return router;
}
