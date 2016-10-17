const Express = require('express');
const BodyParser = require('body-parser');
const CookieParser = require('cookie-parser');
const Passport = require('passport');
const Session = require('express-session');
const ConfigServer = require('./app/src/config/server');
// const https = require('https');
const http = require('http');


function* work() {
    const app = Express();
    app.set('port', ConfigServer.http_port || 3000);
    app.use(CookieParser());
    app.use(BodyParser.urlencoded({
        extended: true,
        parameterLimit: 1000,
        type: 'application/x-www-form-urlencoded'
    }));
    app.use(BodyParser.json({
        inflate: true,
        limit: '100kb',
        strict: true,
        type: 'application/json'
    }));
    app.use(Session({
        secret: 'faeb4453e5d14fe6f6d04637f78077c76c73d1b4',
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false,
            httpOnly: true
        }
    }));

    // Passport Config
    app.use(Passport.initialize());
    app.use(Passport.session());
    require('./app/src/config/passport')(Passport);
    require('./app/src/controllers/apiRoutes')(app);

    http.createServer(app).listen(app.get('port'), () => {
        console.log('create server');
        worker.next();
    });
    // https.createServer(options, app).listen(443);
}

const worker = work();
worker.next();
