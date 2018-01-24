const ViewerModel = require('./model/Viewer');
const mongoose = require('mongoose');
const _ = require('lodash');
const moment = require('moment');

let db = mongoose.connection;

db.once('open', () => {

    let today = moment();
    let yesterday = moment(today).subtract(1, 'days');

    ViewerModel.find({
        created_at: {
            $gte: yesterday.toDate(),
            $lte: today.toDate()
        }
    }, (err, viewers) => {
        if (err)
            console.log(err);
        else
            console.log(viewers);
    });

    var viewer = new ViewerModel({
        id: Date.now(),
        name: 'Test'
    });
    viewer.save((err) => {
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