const bunyan = require('bunyan');
const path = require('path');
const fs = require('fs');
const colors = require('colors');

const LOG_FILE = './log';
const LOG_INFO_FILE_NAME = LOG_FILE + '/info.log';
const LOG_DEBUG_FILE_NAME = LOG_FILE + '/debug.log';
const LOG_ERROR_FILE_NAME = LOG_FILE + '/error.log';

var LogHandler = function( name ) {
    var self = this;
    if( name == 'undefined' ){
        self._name = 'Non-Name';
    }else{
        self._name = name;
    }
    
    mkdirSync(LOG_FILE);

    self.logInfo = bunyan.createLogger({
        name: name,
        src: false,
        streams: [{
            level: 'debug',
            path: LOG_INFO_FILE_NAME
        }]
    });

    self.logInfo.on('error', function(err) {
        console.warn('- The logger emitted an error:', err);
    });

    self.logDebug = bunyan.createLogger({
        name: name,
        src: false,
        streams: [{
            level: 'debug',
            path: LOG_DEBUG_FILE_NAME
        }]
    });

    self.logDebug.on('error', function(err) {
	    console.warn('- The logger emitted an error:', err);
	});

	self.logError = bunyan.createLogger({
        name: name,
        src: false,
        streams: [{
            level: 'debug',
            path: LOG_ERROR_FILE_NAME
        }]
    });

    self.logError.on('error', function(err) {
	    console.warn('- The logger emitted an error:', err);
	});
};

LogHandler.prototype.outputInfo = function(msg){
    let self = this;
    self.logInfo.debug(msg);
    console.log(colors.green.bold(msg));
};

LogHandler.prototype.outputDebug = function(msg){
	let self = this;
	self.logDebug.debug(msg);
	console.log(colors.bgYellow.blue.bold(msg));
};

LogHandler.prototype.outputError = function(msg){
	let self = this;
	self.logError.debug(msg);
	console.log(colors.red.bold('Error : ' + msg));
};

LogHandler.prototype.displayTitle = function(msg){
    let self = this;
    console.log(colors.red.bold(msg));
};

LogHandler.prototype.displayValue = function(msg){
    let self = this;
    console.log(colors.green(msg));
};

function mkdirSync(path) {
    try {
        fs.mkdirSync(path);
    } 
    catch(e) {
        if ( e.code != 'EEXIST' ) {
            throw e;
        }
    }
}

module.exports = LogHandler;