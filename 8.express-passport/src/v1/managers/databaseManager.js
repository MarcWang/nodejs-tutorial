const _ = require('lodash');
const Promise = require("bluebird");
const UserModel = require('./../models/user')

class databaseManagerClass {
    constructor() {}

    checkPersonExisted(name) {
        return new Promise((resolve, reject) => {
            UserModel.findOne({ name: name }, (err, user) => {
                if (err) reject(err);
                else(user) ? resolve(true) : resolve(false);
            });
        });
    }

    createPerson(data) {
        return new Promise((resolve, reject) => {

            if (data.name == undefined) {
                reject('name is undefined');
            }

            this.checkPersonExisted(data.name)
                .then((isExisted) => {
                    if (isExisted) {
                        reject('person is existed');
                    } else {
                        let createData = {
                            name: data.name,
                            faces: data.faces,
                            email: data.email,
                            phone: data.phone,
                            age: data.age,
                            gender: data.gender,
                            counts: 0
                        }

                        let user = new UserModel(createData);
                        user.save();
                        resolve(createData);
                    }
                })
                .catch((err) => {
                    reject(err);
                })
        });
    }

    deletePerson(name) {
        return new Promise((resolve, reject) => {
            UserModel.findOneAndRemove({ name: name }, (err) => {
                if (err) reject(err);
                resolve('User successfully deleted!');
            });
        });
    }

    addFaceToPerson(name, face) {
        return new Promise((resolve, reject) => {
            UserModel.findOne({ name: name }, (err, user) => {
                if (err) reject(err);
                if (user) {
                    user.faces.push(face);
                    user.counts++;
                    user.save();

                    let updateData = {
                        name: data.name,
                        email: data.email,
                        phone: data.phone,
                        age: data.age,
                        gender: data.gender,
                        counts: user.counts
                    }

                    resolve(updateData);
                } else {
                    reject('user not existed');
                }
            })
        });
    }

    removeFaceFromPerson() {

    }

    queryPersons() {
        return new Promise((resolve, reject) => {
            UserModel.find({}, (err, users) => {
                if (err) reject(err);

                let userArr = [];
                if (users) {
                    users.forEach((user) => {
                        userArr.push(user.name);
                    });
                }
                userArr.reverse();
                resolve(userArr);
            });
        });
    }

    getPersonInfo(name) {
        return new Promise((resolve, reject) => {
            UserModel.findOne({ name: name }, (err, user) => {
                if (err) reject(err);
                if (user) {
                    let userInfo = {
                        name: user.name,
                        faces: user.faces,
                        email: user.email,
                        phone: user.phone,
                        age: user.age,
                        gender: user.gender
                    }
                    resolve(userInfo);
                } else {
                    reject(`not find user : ${name}`);
                }
            });
        });
    }
}

module.exports = new databaseManagerClass;
