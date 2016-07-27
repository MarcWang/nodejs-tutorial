var express    = require('express');        
var app        = express();                 
var bodyParser = require('body-parser');
var request    = require('request');

var LINE_API = 'https://trialbot-api.line.me/v1/events';
var LINE_API_GET_PROFILES = 'https://trialbot-api.line.me/v1/profiles?mids=';

var CHANNEL_ID = '';
var CHANNEL_SERECT = '';
var MID = '';


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

app.post('/callback', function(req, res) {
    var result = req.body.result;
    console.log( "-----------------------------------------------------" );
    for(var i = 0; i < result.length; i++){
        var userFrom = result[i].content.from;
        var userText = result[i].content.text;
        sendText( userFrom, userText);
        sendImage( userFrom);
    }
});

app.listen(port, function () {
    console.log('Example app listening on port ' + port );
    getProfile('MID-USER-KEY');
});

var getProfile = function(mids){
    request({
        url: LINE_API_GET_PROFILES + mids,
        headers: {
            'X-Line-ChannelID': CHANNEL_ID,
            'X-Line-ChannelSecret': CHANNEL_SERECT,
            'X-Line-Trusted-User-With-ACL': MID
        },
        method: 'GET',
        }, function(error, response, body) {
        if (error) {
            console.log('Error sending message: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
        console.log('send response: ', body);
    });
}

var sendText = function( userTo, msg){
    var data = {
        to: ['MID-KEY'],
        toChannel: 1383378250,
        eventType: '138311608800106203',
        content: {
            contentType: 1,
            toType: 1,
            text: msg
        }
    };
    
    request({
        url: LINE_API,
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'X-Line-ChannelID': CHANNEL_ID,
            'X-Line-ChannelSecret': CHANNEL_SERECT,
            'X-Line-Trusted-User-With-ACL': MID
        },
        method: 'POST',
        body: JSON.stringify(data) 
        }, function(error, response, body) {
        if (error) {
            console.log('Error sending message: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
        console.log('send response: ', body);
    });
}

var sendImage = function( userTo){
    var data = {
        to: ['MID-KEY'],
        toChannel: 1383378250,
        eventType: '138311608800106203',
        content: {
            contentType: 2,
            toType: 1,
            originalContentUrl: "http://img.chinatimes.com/newsphoto/2015-02-12/656/20150212002559.jpg",
            previewImageUrl: "http://img.chinatimes.com/newsphoto/2015-02-12/656/20150212002559.jpg"
        }
    };
    
    request({
        url: LINE_API,
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'X-Line-ChannelID': CHANNEL_ID,
            'X-Line-ChannelSecret': CHANNEL_SERECT,
            'X-Line-Trusted-User-With-ACL': MID
        },
        method: 'POST',
        body: JSON.stringify(data) 
        }, function(error, response, body) {
        if (error) {
            console.log('Error sending message: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
        console.log('send response: ', body);
    });
}
