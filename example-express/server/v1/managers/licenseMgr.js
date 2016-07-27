const DatabaseManager = require('../controllers/database');
const License = require('../models/license');
const logRecord = require('../../utility/log4record');
let logHandler = new logRecord('DB');
let databaseMgr = new DatabaseManager();

databaseMgr.onError((err) => {
    console.log(err);
});

/**
 * @param  {[type]}
 * @param  {[type]}
 * @param  {[type]}
 * @param  {Function}
 * @return {[type]}
 */
function genCommunity(name, counts, addresses, cb) {
    const generatePassword = require('password-generator');
    let communityCode = generatePassword(7, false, /[\da-z]/, 'TPE');
    let createCounts = 0;
    for (let i = 0; i < counts; i++) {
        databaseMgr.createLicense({
            communityName: name,
            communityCode: communityCode,
            familyCode: generatePassword(6, false, /[\dA-Za-z]/),
            address: addresses[i]
        }, (err, res) => {
            if (err) {
                cb(err);
            }

            createCounts++;
            console.log(`createCounts = ${createCounts}, counts = ${counts}`);
            if (createCounts == counts) {
                logHandler.outputInfo(`create community is success ${counts}`)
                cb(null, res);
            }
        });
    }
}


/**
 * [create community]
 * @param {[type]} name
 * @param {[type]} counts
 * @param {Function} callback
 */
exports.createCommunity = function(name, counts, addresses, cb) {

    let communityName = undefined;
    let communityCounts = undefined;
    let familyAddresses = undefined;

    if (name == undefined || counts == undefined) {
        logHandler.outputError(`params is undefined`);
        cb(`params is undefined`);
    } else {
        communityName = name;
        communityCounts = counts;
    }

    if (cb == undefined) {
        cb = addresses;
        familyAddresses = new Array(counts).fill('address');
    } else {
        if (addresses.length > counts) {
            logHandler.outputError(`addrresser are more than create counts`);
            cb(`addrresser are more than create counts`);
        } else {
            familyAddresses = addresses;
        }
    }


    License.findOne({
        communityName: communityName
    }, function(err, community) {
        if (err) {
            cb(err);
        }

        if (community) {
            logHandler.outputError(`community has taken`);
            cb('community has taken');
        } else {
            genCommunity(communityName, communityCounts, familyAddresses, cb);
        }
    });
}

exports.addNewFamily = function(name, address, cb) {
    User.findOne({
        communityName: name,
        address: address
    }, function(err, family) {
        if (family) {
            console.log('user has taken');
            cb('family has taken');
        } else {
            const generatePassword = require('password-generator');
            let communityName = name;
            let communityCode = generatePassword(7, false, /[\da-z]/, 'TPE');
            let familyCode = generatePassword(6, false, /[\dA-Za-z]/);
            let address = address;

            databaseMgr.createLicense({
                communityName: communityName,
                communityCode: communityCode,
                familyCode: familyCode,
                address: address
            }, cb);
        }
    });
}

exports.registFamily = function(communityCode, familyCode, cb) {
    User.findOne({
        communityCode: communityCode,
        familyCode: familyCode
    }, function(err, family) {
        if (family == null) {
            cb('family-not-found');
        } else {
            cb(null, family);
        }
    });
}
