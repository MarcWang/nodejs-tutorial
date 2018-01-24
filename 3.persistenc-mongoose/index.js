const PersonModel = require('./model/Person');
const PersonDetailModel = require('./model/PersonDetail');
const mongoose = require('mongoose');
const _ = require('lodash');

let db = mongoose.connection;

db.once('open', () => {
    function isPersonExisted(name) {
        return new Promise((resolve, reject) => {
            PersonModel
                .findOne({ name: name })
                .exec((err, person) => {
                    if (err) reject(err);
                    (_.isObject(person)) ? resolve(true) : resolve(false)
                });
        })
    }

    function createPerson(personInfo, cb) {
        isPersonExisted(personInfo.name)
            .then((isExisted) => {
                if (isExisted) {
                    cb('person was created');
                    return;
                }

                var personDetailModel = new PersonDetailModel({
                    age: personInfo.age,
                    gender: personInfo.gender
                });

                personDetailModel.save((err) => {
                    if (err) {
                        cb(err);
                        return;
                    }

                    var person = new PersonModel({
                        name: personInfo.name,
                        detail: personDetailModel._id
                    });

                    person.save((err) => {
                        (err) ? cb(err) : cb(null, 'success');
                        return;
                    });
                });
            })
            .catch((err) => {
                cb(err);
            })
    }

    let personInfo = {
        name: 'Marc1',
        age: 33,
        gender: 1
    }

    createPerson(personInfo, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            let person = { name: personInfo.name };
            PersonModel
                .findOne(person)
                .populate('detail')
                .exec((err, personDetail) => {
                    if (err) return console.log(err);
                    console.log(`Find Person: ${person.name}, age: ${personDetail.detail.age}, gender: ${personDetail.detail.gender}`);
                });
        }
    })
});

db.on('connected', () => {
    console.log('connected!');
});

db.on('reconnected', () => {
    console.log('reconnected!');
});

db.on('disconnected', () => {
    console.log('disconnected!');
    setTimeout(dbConnect, 1000);
});

db.on('error', (err) => {
    console.log(err);
});

db.on('close', () => {
    console.log('close');
});

function dbConnect() {
    let dbName = process.env.DB_NAME || 'example-mongoose';
    let dbHost = process.env.DB_HOST || 'localhost'
    let dbPort = process.env.DB_PORT || 27017;
    let dbUser = '';
    let dbPass = '';
    const uri = `mongodb://${dbHost}:${dbPort}/${dbName}`;
    const options = {
        server: {
            auto_reconnect: true,
            reconnectTries: 10,
            reconnectInterval: 1000,
            socketOptions: {
                autoReconnect: true,
                keepAlive: 10,
                connectTimeoutMS: 5000,
                socketTimeoutMS: 10000
            }
        },
        user: 'waffle1',
        pass: 'waffle',
        config: { autoIndex: false }
    };
    mongoose.connect(uri, options);
}

dbConnect();
