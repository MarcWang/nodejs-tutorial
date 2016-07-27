const http = require('http');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const dotenv = require('dotenv');
const logRecord = require('./server/utility/log4record');
const appConfig = require('./server/utility/json-manager').getAppConfig();

let logHandler = new logRecord( appConfig.process.name );

const licenseConfig = require('./server/utility/json-manager').getLicenseConfig();

// var https = require('https');
// https.globalAgent.options.secureProtocol = 'SSLv3_method';

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({ path: '.env' });

process.env.NODE_ENV = process.env.PROCESS_NAME;
process.title = process.env.PROCESS_NAME;
process.on('uncaughtException', (err) => {
    logHandler.outputError(`Caught exception: ${err}`);
});

process.on('beforeExit', (code) => {
    //logHandler.outputInfo(`to do something before Exit(): ${code}`);
});

process.on('exit', (code) => {
    logHandler.outputInfo(`About to exit with code: ${code}`);
});

function outputHardwareInfo(){
	logHandler.outputInfo(`NodeJS Version = ${process.version}`);
	logHandler.outputInfo(`Hardware Arch = ${process.arch}`);
	logHandler.outputInfo(`Hardware Platform = ${process.platform}`);
	logHandler.outputInfo(`Computer Name = ${process.env.COMPUTERNAME}`);
	logHandler.outputInfo(`Process Name = ${process.title}`);
}

let app = express();
app.set('port', process.env.APP_PORT || 3000);
app.use(cookieParser());
app.use(cookieSession({
    name: 'session',
    secret: 'faeb4453e5d14fe6f6d04637f78077c76c73d1b4'
}))

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.set('trust proxy', (ip) => {
    console.log(ip);
  // if (ip === '127.0.0.1' || ip === '123.123.123.123') return true; // trusted IPs
  // else return false;
});

require('./server/v1/routes')(app, logHandler);

http.createServer(app).listen(app.get('port'), function(){
	outputHardwareInfo();
    logHandler.outputInfo(`Server listening on localhost: ${app.get('port')}`);
});
