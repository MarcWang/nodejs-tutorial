const DatabaseManager = require('../controllers/database');
const User = require('../models/user');
const CommunityModel = require('../models/community');
const FamilyModel = require('../models/family');
const MemberModel = require('../models/member');

let databaseMgr = new DatabaseManager();

databaseMgr.onError((err) => {
    console.log(err);
});

exports.autoLogin = function(user, pass, cb) {
    User.findOne({ username: user }, function(err, user) {
        if (user == null) {
            cb('user-not-found');
        } else {
            user.comparePassword(pass, (err, res) => {
                if (err) {
                    cb('process-error');
                } else {
                    (res) ? cb(null, user): cb('invalid-password');
                }
            })
        }
    });
}

exports.manualLogin = function(user, pass, cb) {
    User.findOne({ username: user }, function(err, user) {
        if (user == null) {
            cb('user-not-found');
        } else {
            user.comparePassword(pass, (err, res) => {
                if (err) {
                    cb('process-error');
                } else {
                    (res) ? cb(null, user): cb('invalid-password');
                }
            })
        }
    });
}

exports.findAll = function() {
    databaseMgr.findAll();
}

exports.addNewUser = function(newData, cb) {
    User.findOne({ username: newData.username }, function(err, user) {
        if (user) {
            console.log('user has taken');
            cb('user has taken');
        } else {
            User.findOne({ email: newData.email }, function(err, user) {
                if (user) {
                    console.log('email has taken');
                    cb('email has taken');
                } else {
                    databaseMgr.create(newData, cb);
                }
            });
        }
    });
}

exports.removeUser = (data, cb) => {
    User.findOne({ username: data.username }, (err, user) => {
        if (err) {
            cb(err);
        } else {
            databaseMgr.remove(user, cb);
            cb(null, 'remove was successed');
        }
    });
}

exports.updatePassword = function(data, cb) {
    User.findOne({ email: data.email }, (err, user) => {
        if (err) {
            cb(err);
        } else {
            databaseMgr.update(user, cb);
        }
    });
}

exports.getUserByEmail = function(email, cb) {
    User.findOne({ email: email }, (err, user) => {
        if (err) {
            cb(err);
        } else {
            cb(null, user);
        }
    });
}

/**
 * [createCommunity description]
 * @param  {[type]}   createData [description]
 * @param  {Function} cb         [description]
 * @return {[type]}              [description]
 */
exports.createCommunity = function(createData, cb) {
    let name = createData.name;
    let description = createData.description;
    let maxCounts = createData.maxCounts;
    let address = createData.address;

    CommunityModel.findOne({
        address: address
    }, function(err, community) {
        if (err) {
            cb(err);
            return;
        }

        if (community) {
            cb('community has taken');
            return;
        }

        const generatePassword = require('password-generator');
        let communityCode = generatePassword(7, false, /[\da-z]/, 'TPE');

        let createModel = {
            name: name,
            description: description,
            maxCounts: maxCounts,
            code: communityCode,
            address: address,
            counts: 0
        }

        let communityModel = CommunityModel({
            name: name,
            description: description,
            maxCounts: maxCounts,
            code: communityCode,
            address: address,
            counts: 0
        });

        communityModel.save((err) => {
            if (err) {
                cb(err);
                return;
            }
            cb(null, communityModel);
            return;
        })
    });
}

/**
 * [createFamily description]
 * @param  {[type]}   createData [description]
 * @param  {Function} cb         [description]
 * @return {[type]}              [description]
 */
exports.createFamily = function(createData, cb) {
    let familyCommunity = createData.community;
    let familyName = createData.name;
    let familyDescription = createData.description;
    let familyAddress = createData.address;

    CommunityModel.findOne({
        code: familyCommunity
    }, function(err, community) {
        if (err) {
            cb(err);
            return;
        }

        if (!community) {
            cb('community not taken');
            return;
        } else {
            FamilyModel.findOne({
                address: familyAddress
            }, function(err, family) {
                if (err) {
                    cb(err);
                    return;
                }

                if (family) {
                    cb('family has taken');
                    return;
                }
                const generatePassword = require('password-generator');
                let familyCode = generatePassword(6, false, /[\dA-Za-z]/);

                let createModel = {
                    community: familyCommunity,
                    name: familyName,
                    description: familyDescription,
                    code: familyCode,
                    address: familyAddress,
                    maxCounts: 5,
                    counts: 0
                }

                let familyModel = FamilyModel(createModel);

                familyModel.save((err) => {
                    if (err) {
                        cb(err);
                        return;
                    }
                    cb(null, createModel);
                    return;
                })
            });
        }
    });
}


/**
 * [createMember description]
 * @param  {[type]}   createData [description]
 * @param  {Function} cb         [description]
 * @return {[type]}              [description]
 */
exports.createMember = function(createData, cb) {
    let memberFamily = createData.family;
    let memberName = createData.name;
    let memberDescription = createData.description;

    FamilyModel.findOne({
        code: memberFamily
    }, function(err, family) {
        if (err) {
            cb(err);
            return;
        }

        if (!family) {
            cb('family not taken');
            return;
        } else {
            MemberModel.findOne({
                name: memberName
            }, function(err, member) {
                if (err) {
                    cb(err);
                    return;
                }

                if (member) {
                    cb('member has taken');
                    return;
                }

                const generatePassword = require('password-generator');
                let memberCode = generatePassword(6, false, /\d/);

                let createModel = {
                    family: memberFamily,
                    name: memberName,
                    description: memberDescription,
                    code: memberCode
                };

                let memberModel = MemberModel(createModel);

                memberModel.save((err) => {
                    if (err) {
                        cb(err);
                        return;
                    }
                    cb(null, createModel);
                    return;
                })
            });
        }
    });
}
