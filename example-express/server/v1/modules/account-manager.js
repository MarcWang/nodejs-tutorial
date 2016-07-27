let DatabaseManager = require('./database-manager');

let User = require('./models/user');

let _dbEnable = false;
let databaseMgr = new DatabaseManager();
databaseMgr.initialize(function() {
    _dbInstance = true;
});

databaseMgr.onError((err) => {
    console.log(err);
});

exports.autoLogin = function(user, pass, cb) {
    User.findOne({ username: user }, function(err, user) {
        console.log(user);
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
    if (_dbInstance) {
        databaseMgr.findAll();
    }
}

exports.addNewUser = function(newData, cb) {
    User.findOne({ username: newData.username }, function(err, user) {
        if (user) {
            console.log('user has taken');
        } else {
            User.findOne({ email: newData.email }, function(err, user) {
                if (user) {
                    console.log('email has taken');
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
