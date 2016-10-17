const moment = require('moment');
const userRouter = require('./routers/apiUserRouter');
const router = require('express').Router();

module.exports = function(app, logHandler) {

    router.use((request, response, next) => {
        console.log(`${request.method}: ${request.originalUrl} From '${request.hostname}', Time: ${moment().format()} `);
        next();
    });

    app.use('', router);
    app.use('', userRouter());

};
