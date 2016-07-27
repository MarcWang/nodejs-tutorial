const bunyan = require('bunyan');
const path = require('path');
const fs = require('fs');
const colors = require('colors');

class LogHandler {
    constructor(name, path) {
        this.log = {};
        this.log.name = name || 'app';
        this.log.path = path || './log';
        this.log.output = {};
        this.log.output.info = bunyan.createLogger({
            name: this.log.name,
            src: false,
            streams: [{
                level: 'debug',
                path: `${this.log.path}/info.log`
            }]
        });
        this.log.output.error = bunyan.createLogger({
            name: this.log.name,
            src: false,
            streams: [{
                level: 'debug',
                path: `${this.log.path}/error.log`
            }]
        });
        this.log.output.debug = bunyan.createLogger({
            name: this.log.name,
            src: false,
            streams: [{
                level: 'debug',
                path: `${this.log.path}/debug.log`
            }]
        });

        mkdirSync(this.log.path);
    }

    outputInfo(msg) {
        let self = this;
        self.log.output.info.debug(msg);
        console.log(colors.green.bold(msg));
    }

    outputError(msg) {
        let self = this;
        self.log.output.error.debug(msg);
        console.log(colors.red.bold('Error : ' + msg));
    }

    outputDebug(msg){
        let self = this;
        if( process.env.NODE_ENV !== 'production' )
            self.log.output.debug.debug(msg);
        console.log(colors.bgYellow.blue.bold(msg));
    }

    outputBlue(msg) {
        console.log(colors.blue.bold(msg));
    };

    outputRed(msg) {
        console.log(colors.red.bold(msg));
    };

    outputGreen(msg) {
        console.log(colors.green.bold(msg));
    };

    outputYellow(msg) {
        console.log(colors.yellow.bold(msg));
    };

    outputBlack(msg) {
        console.log(colors.black.bold(msg));
    };

    outputWhite(msg) {
        console.log(colors.white.bold(msg));
    };

    outputGray(msg) {
        console.log(colors.gray.bold(msg));
    };

}

function mkdirSync(path) {
    try {
        fs.mkdirSync(path);
    } catch (e) {
        if (e.code != 'EEXIST') {
            throw e;
        }
    }
}

module.exports = LogHandler;
