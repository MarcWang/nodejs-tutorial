'use strict';

const express = require('express');
const LM = require('./managers/licenseMgr');
const logRecord = require('../utility/log4record');
const AccountMgr = require('./managers/AccountMgr')
let router = express.Router();
let logHandler = new logRecord('Router');

router.use(function timeLog(request, response, next) {
    console.log('Time: ', Date.now());
    if (request.session.logined) {
        logHandler.outputInfo('user is login');
        let admin = true;
        if (!admin) {
            logHandler.outputError(`createCommunity is not admin`);
            response.json({ result: false, message: 'not admin' });
        } else {
            logHandler.outputInfo(`createCommunity is admin`);
            next();
        }
    } else {
        logHandler.outputError('user not login');
        response.json({ result: false, message: 'not login' });
    }
});


router.route('/community/create')
    .post((request, response, next) => {
        logHandler.outputInfo(`Post : /community/create`);
        let name = request.body.name;
        let description = request.body.description;
        let address = request.body.address;
        let maxCounts = request.body.maxCounts;

        if (name == undefined || address == undefined) {
            logHandler.outputError(`/community/create : params is null`)
            response.json({ result: false, message: 'params is null' });
        } else {
            AccountMgr.createCommunity({
                name: name,
                description: description,
                address: address,
                maxCounts: maxCounts
            }, (err, res) => {
                if (err) {
                    response.json({ result: false, message: err });
                } else {
                    logHandler.outputInfo(`createCommunity`);
                    response.json({ result: true, message: res });
                }
            })
        }
    });

router.route('/community/delete')
    .post((request, response, next) => {})
    .get((request, response, next) => {});

router.route('/community/addFamily')
    .post((request, response, next) => {
        logHandler.outputInfo(`addFamily`);
        let name = request.body.name;
        let address = request.body.address;

        if (!request.session.logined) {
            response.redirect('/v1/user/login');
            next();
        } else {
            let admin = true;
            if (admin) {
                LM.addNewFamily(name, address, (err, res) => {
                    if (err) {

                    } else {
                        response.json({ result: true, message: '', license: res });
                    }
                })
            } else {

            }
            console.log('login');
            next();
        }
    })
    .get((request, response, next) => {});

router.route('/community/removeFamily')
    .post((request, response, next) => {})
    .get((request, response, next) => {});


router.route('/family/create')
    .post((request, response, next) => {
        logHandler.outputInfo(`Post : /family/create`);
        let community = request.body.community;
        let name = request.body.name;
        let description = request.body.description;
        let address = request.body.address;

        if (community == undefined || name == undefined || address == undefined) {
            logHandler.outputError(`/family/create : params is null`)
            response.json({ result: false, message: 'params is null' });
        } else {
            AccountMgr.createFamily({
                community: community,
                name: name,
                description: description,
                address: address
            }, (err, res) => {
                if (err) {
                    response.json({ result: false, message: err });
                } else {
                    logHandler.outputInfo(`createFamily`);
                    response.json({ result: true, message: res });
                }
            })
        }
    })
    .get((request, response, next) => {});

router.route('/family/delete')
    .post((request, response, next) => {})
    .get((request, response, next) => {});

router.route('/family/addMember')
    .post((request, response, next) => {})
    .get((request, response, next) => {});

router.route('/family/removeMember')
    .post((request, response, next) => {})
    .get((request, response, next) => {});


router.route('/member/create')
    .post((request, response, next) => {
        logHandler.outputInfo(`Post : /member/create`);
        let family = request.body.family;
        let name = request.body.name;
        let description = request.body.description;

        if (family == undefined || name == undefined) {
            logHandler.outputError(`/member/create : params is null`)
            response.json({ result: false, message: 'params is null' });
        } else {
            AccountMgr.createMember({
                family: family,
                name: name,
                description: description
            }, (err, res) => {
                if (err) {
                    response.json({ result: false, message: err });
                } else {
                    logHandler.outputInfo(`createMember`);
                    response.json({ result: true, message: res });
                }
            })
        }
    })
    .get((request, response, next) => {});

router.route('/member/delete')
    .post((request, response, next) => {})
    .get((request, response, next) => {});

module.exports = router;
