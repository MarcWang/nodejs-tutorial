const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const logRecord = require('./src/v1/utility/log');
const logHandler = new logRecord('jwt');

process.env.NODE_ENV = `production`;
process.title = process.env.PROCESS_NAME;
process.on('uncaughtException', (err) => {
    console.log(`Caught exception: ${err}`);
});

process.on('beforeExit', (code) => {});
process.on('exit', (code) => {
    console.log(`About to exit with code: ${code}`);
});


let dbName = process.env.DB_NAME || 'example-passport-jwt';
let dbHost = process.env.DB_HOST || 'localhost'
let dbPort = process.env.DB_PORT || 27017;

function dbConnect() {
    mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`, { config: { autoIndex: false } });
}

let db = mongoose.connection;
mongoose.Promise = global.Promise;
db.once('open', () => {
    let app = express();
    app.set('port', process.env.APP_PORT || 3001);
    
    app.use(bodyParser.urlencoded({ extended: true })); //for parsing application/x-www-form-urlencoded
    app.use(bodyParser.json()); // for parsing application/json
    app.use(express.static(__dirname + '/public'));

    app.use(passport.initialize());

    require('./src/v1/config/passport')(passport);

    require('./src/v1/controllers/apiJwtRoutes')(app, logHandler);

    const server = http.createServer(app).listen(app.get('port'), function() {      
        console.log(`########################################`);
        console.log(`# NodeJS Version = ${process.version}`);
        console.log(`# Hardware Arch = ${process.arch}`);
        console.log(`# Hardware Platform = ${process.platform}`);
        console.log(`# Computer Name = ${process.env.COMPUTERNAME}`);
        console.log(`# Process Name = ${process.title}`);
        console.log(`# Server listening on localhost: ${app.get('port')}`);
        console.log(`# MongoDB://${dbHost}:${dbPort}/${dbName}`);
        console.log(`########################################`); 
    });
});

db.on('error', (err) => {
    logHandler.outputError(err);
    setTimeout(dbConnect, 1000);
});
dbConnect();
