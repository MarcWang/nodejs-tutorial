const LogHandler = require('./index');

// process.env.NODE_ENV = 'production';

let logHandler = new LogHandler('test');

logHandler.outputInfo('outputInfo');
logHandler.outputDebug('outputDebug');
logHandler.outputError('outputError');
logHandler.outputBlue('outputBlue');
logHandler.outputRed('outputRed');
logHandler.outputGreen('outputGreen');
logHandler.outputYellow('outputYellow');
logHandler.outputBlack('outputBlack');
logHandler.outputWhite('outputWhite');
logHandler.outputGray('outputGray');