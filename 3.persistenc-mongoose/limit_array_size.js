const BookcaseModel = require('./model/Bookcase');
const mongoose = require('mongoose');
const _ = require('lodash');

let db = mongoose.connection;

db.once('open', () => {

    let bookList = [];
    for (let i = 0; i < 15; i++) {
        bookList.push(i);
    }

    var bookcase = new BookcaseModel({
        id: Date.now(),
        list: bookList
    });
    bookcase.save((err) => {
        console.log(err);
    });

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
    let dbName = process.env.DB_NAME || 'example-mongoose-pass';
    let dbHost = process.env.DB_HOST || 'localhost'
    let dbPort = process.env.DB_PORT || 27017;
    let dbUser = '';
    let dbPass = '';
    const uri = `mongodb://${dbHost}:${dbPort}/${dbName}`;
    const options = { server: { auto_reconnect: false } };
    mongoose.connect(uri, options);
}

dbConnect();
