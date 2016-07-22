'use strict';

const _ = require('lodash');
const Promise = require("bluebird");
const DatabaseMgr = require('./databaseManager');
const moment = require('moment');
const passport = require('passport');
const AccountModel = require('./../models/account');
const AccountDetailsModel = require('./../models/accountDetails');

let genResult = () => {
    return {
        details: {
            processTime: undefined
        },
        code: -1
    }
}

class AccountManager {
    constructor() {

    }

    signup(username, password, permission, thumbnail, email, phone) {
        let self = this;
        let resultData = genResult();

        return new Promise((resolve, reject) => {
            let account = new AccountModel({ username: username });
            AccountModel.register(account, password, (err, account) => {
                if (err) {
                    resolve(resultData)
                    return;
                }

                let accountDetails = {
                    account_id: account._id,
                    thumbnail: thumbnail,
                    permission: permission,
                    email: email,
                    phone: phone
                }

                console.log(accountDetails)

                let details = new AccountDetailsModel(accountDetails);
                details.save();

                console.log(details)

                resultData.code = 0;
                resultData.details.username = account.username;
                resolve(resultData);
            });
        });
    }

    getProfile(username) {
        let self = this;
        let resultData = genResult();
        return new Promise((resolve, reject) => {
            AccountModel.findOne({ username: username }).exec((err, account) => {
                AccountDetailsModel.findOne({ account_id: account._id }).exec((err, details) => {
                    if (err) {
                        resolve(resultData)
                        return;
                    }

                    let profile = {
                        username: username,
                        thumbnail: details.thumbnail,
                        permission: details.permission,
                        email: details.email,
                        phone: details.phone
                    }
                    resultData.code = 0;
                    resultData.details = profile;

                    resolve(resultData);
                })
            })
        })
    }
}

module.exports = new AccountManager;
