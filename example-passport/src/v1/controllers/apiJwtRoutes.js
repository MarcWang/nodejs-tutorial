const userJwtRouter = require('./routers/apiUserJwtRouter');
// const express = require('express');
// const passport = require('passport');
// const jwt = require('jsonwebtoken');

module.exports = function(app, logHandler) {
    app.use('/jwt', userJwtRouter(logHandler));
};
