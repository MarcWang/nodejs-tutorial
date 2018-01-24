var http = require("http");
var express = require("express");
var app = express();
var request = require('request');
var bodyParser = require('body-parser');
var morgan = require('morgan')
var fs = require('fs');
var path = require('path');

//to log every request for debugging
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }))

//to accept JSON and form urlencoded data from client
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//middleware function to verify each and every request
var authchecker = function(req, res, next) {
    var accesstoken = req.body.accesstoken;
    //probably clean accesstoken to avoid injections
    //request to Account kit API endpoint to authenticate user
    request('https://graph.accountkit.com/v1.0/me/?access_token=' + accesstoken, function(error, response, body) {
        if (error) {
            res.send({
                "data": [],
                "message": 'Authentication service Facing Down time',
                "status": 500,
                "data_count": 0
            });
        } else if (response.statusCode !== 200) {
            res.send({
                "data": [],
                "message": 'Authentication failed',
                "status": 500,
                "data_count": 0
            });
        } else {
            //here we got the Mobile Number -> Query DB -> identify the user to service
            var temp = JSON.parse(body);
            req.body.phone = temp.phone.national_number;
            next();
        }
    });
}

app.use('/api/v1', authchecker);

app.get('/api/v1/getCurrentUserInfo', function(req, res) {
    res.send("Hello authenticated user");
});

app.post('/api/v1/CreateRecord', function(req, res) {
    //process the post data via req.body or header
    res.send("Hello authenticated user, Created record for you");
});

app.use(function(req, res, next) {
    res.status(404);

    if (req.accepts('html')) {
        res.render('404', { url: req.url });
        return;
    }

    if (req.accepts('json')) {
        res.send({ error: 'Not found' });
        return;
    }

    res.type('txt').send('Not found');
});

http.createServer(app).listen(process.env.NODE_PORT || 3000, process.env.NODE_IP || 'localhost', function() {
    console.log('Application worker started');
});