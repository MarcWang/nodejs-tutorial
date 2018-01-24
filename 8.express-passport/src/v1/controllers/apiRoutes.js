const userRouter = require('./routers/apiUserRouter');
const passport = require('passport');

module.exports = function(app, logHandler) {

    app.use('', userRouter(logHandler));

    app.get('/', (request, response, next) => { next(); });
    app.post('/', (request, response, next) => { next(); });
};
