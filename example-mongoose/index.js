const PersonModel = require('./model/Person');
const PersonDetailModel = require('./model/PersonDetail');
const mongoose = require('mongoose');
const _ = require('lodash');

let dbName = process.env.DB_NAME || 'example-mongoose';
let dbHost = process.env.DB_HOST || 'localhost'
let dbPort = process.env.DB_PORT || 27017;

function dbConnect() {
    mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`, { config: { autoIndex: false } });
}

let db = mongoose.connection;
db.once('open', () => {

    function isPersonExisted(name) {
        return new Promise((resolve, reject) => {
            PersonModel
                .findOne({ name: name })
                .exec((err, person) => {
                    if (err) reject(err);
                    (_.isObject(person)) ? resolve(true): resolve(false)
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
                        (err) ? cb(err): cb(null, 'success');
                        return;
                    });
                });
            })
            .catch((err) => {
                cb(err);
            })
    }

    let personInfo = {
        name: 'Marc',
        age: 29,
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

db.on('error', (err) => {
    console.log(err);
    setTimeout(dbConnect, 1000);
});
dbConnect();
