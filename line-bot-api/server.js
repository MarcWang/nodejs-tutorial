const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');

const LINE_API_GET_PROFILES = 'https://api.line.me/v2/bot/profile/';
const LINE_API_PUSH_MESSAGE = 'https://api.line.me/v2/bot/message/push';
const LINE_API_REPLY_MESSAGE = 'https://api.line.me/v2/bot/message/reply';

const CHANNEL_ACCESS_TOKEN = 'Bearer ';
const CHANNEL_ID = '';
const CHANNEL_SERECT = '';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;

app.post('/line/callback', function (request, response) {
    console.log("-----------------------------------------------------");
    let events = request.body.events;
    for (const event of events) {
        const text = event.message.text;
        const user_id = event.source.userId;
        const reply_token = event.replyToken;
        console.log(text, user_id, reply_token);
        replyTemplate({ reply_token });
        // replyText({ text, reply_token });
        // replyImage({ reply_token });
        // pushText({ text, user_id });
    }
});

app.listen(port, function () {
    console.log('Example app listening on port ' + port);
    getProfile({ user_id: 'U41c326e474097f65bef1841dd1a7dd9d' })
});

function pushText(params) {
    const {text, user_id} = params;

    let data = {};
    if (user_id) data.to = user_id;
    data.messages = [{
        "type": "text",
        "text": text
    }];

    request({
        url: LINE_API_PUSH_MESSAGE,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': CHANNEL_ACCESS_TOKEN
        },
        method: 'POST',
        body: JSON.stringify(data)
    }, (error, response, body) => {
        if (error) {
            console.log('Error sending message: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
        console.log('send response: ', body);
    });
}




function getProfile(params) {
    const {user_id} = params;
    request({
        url: LINE_API_GET_PROFILES + user_id,
        headers: {
            'Authorization': CHANNEL_ACCESS_TOKEN
        },
        method: 'GET',
    }, function (error, response, body) {
        if (error) {
            console.log('Error sending message: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
        console.log('send response: ', body);
    });
}

function replyMessage(data) {
    request({
        url: LINE_API_REPLY_MESSAGE,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': CHANNEL_ACCESS_TOKEN
        },
        method: 'POST',
        body: JSON.stringify(data)
    }, (error, response, body) => {
        if (error) {
            console.log('Error sending message: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
        console.log('send response: ', body);
    });
}

function replyImage(params) {
    const {reply_token} = params;
    const data = {
        replyToken: reply_token,
        messages: [{
            type: "image",
            originalContentUrl: "https://i1.read01.com/image.php?url=0CfnZW00",
            previewImageUrl: "https://i1.read01.com/image.php?url=0CfnZW00"
        }]
    }
    replyMessage(data);
}

function replyText(params) {
    const {text, reply_token} = params;
    const data = {
        replyToken: reply_token,
        messages: [{
            type: 'text',
            text: text
        }]
    }
    replyMessage(data);
}

function replyTemplate(params) {
    const {reply_token} = params;
    let template_confirm = {
        "type": "template",
        "altText": "this is a confirm template",
        "template": {
            "type": "confirm",
            "text": "Are you sure?",
            "actions": [
                {
                    "type": "message",
                    "label": "Yes",
                    "text": "yes"
                },
                {
                    "type": "message",
                    "label": "No",
                    "text": "no"
                }
            ]
        }
    }

    let template_buttons = {
        "type": "template",
        "altText": "this is a buttons template",
        "template": {
            "type": "buttons",
            "thumbnailImageUrl": "https://example.com/bot/images/image.jpg",
            "title": "Menu",
            "text": "Please select",
            "actions": [
                {
                    "type": "postback",
                    "label": "Buy",
                    "data": "action=buy&itemid=123"
                },
                {
                    "type": "postback",
                    "label": "Add to cart",
                    "data": "action=add&itemid=123"
                },
                {
                    "type": "uri",
                    "label": "View detail",
                    "uri": "http://example.com/page/123"
                }
            ]
        }
    }

    let template_carousel = {
        "type": "template",
        "altText": "this is a carousel template",
        "template": {
            "type": "carousel",
            "columns": [
                {
                    "thumbnailImageUrl": "https://i1.read01.com/image.php?url=0CfnZW00",
                    "title": "this is menu",
                    "text": "description",
                    "actions": [
                        {
                            "type": "postback",
                            "label": "Buy",
                            "data": "action=buy&itemid=111"
                        },
                        {
                            "type": "postback",
                            "label": "Add to cart",
                            "data": "action=add&itemid=111"
                        },
                        {
                            "type": "uri",
                            "label": "View detail",
                            "uri": "http://example.com/page/111"
                        }
                    ]
                },
                {
                    "thumbnailImageUrl": "https://i1.read01.com/image.php?url=0CfnZW00",
                    "title": "this is menu",
                    "text": "description",
                    "actions": [
                        {
                            "type": "postback",
                            "label": "Buy",
                            "data": "action=buy&itemid=222"
                        },
                        {
                            "type": "postback",
                            "label": "Add to cart",
                            "data": "action=add&itemid=222"
                        },
                        {
                            "type": "uri",
                            "label": "View detail",
                            "uri": "http://example.com/page/222"
                        }
                    ]
                }
            ]
        }
    }

    const data = {
        replyToken: reply_token,
        messages: [template_carousel, template_buttons, template_confirm]
    }
    replyMessage(data);

}
