// const userJwtRouter = require('./routers/apiUserJwtRouter');
// const express = require('express');
const passport = require('passport');
// const jwt = require('jsonwebtoken');

module.exports = function(app, logHandler) {
    // app.use('/jwt', userJwtRouter(logHandler));
    app.get('/auth/facebook',
        passport.authenticate('facebook'));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', { failureRedirect: '/login' }),
        function(req, res) {
            // Successful authentication, redirect home.
            res.redirect('/');
        });
};
