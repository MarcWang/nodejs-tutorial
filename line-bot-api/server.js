const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const linebot = require('./lib');

const options = {
    channel_id: ,
    channel_secret: '',
    channel_access_token: 'Pys+XEMIa//ZNnAdB04t89/1O/w1cDnyilFU='
}

const sdk = new linebot(options);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;

let user_map = new Map();

app.get('/push', (request, response) => {
    const {name, message} = request.query;
    const user_id = user_map[name];
    console.log(name, user_id, message);
    sdk.pushTextMessage(message, user_id)
        .then(value => console.log(value))
        .catch(err => console.log(err));
});

app.post('/line/callback', function (request, response) {
    console.log("-----------------------------------------------------");
    let events = request.body.events;
    for (const event of events) {
        const text = event.message.text;
        const user_id = event.source.userId;
        const room_id = event.source.room_id;
        const reply_token = event.replyToken;
        console.log(event);


        sdk.getProfile(user_id)
            .then(value => {
                const name = (value.displayName)?value.displayName:'everybody';
                user_map[name] = user_id;
                return sdk.replyTextMessage([`hello ${name}`, `say ${text}, continue...`], reply_token);
            })
            .then(value => console.log(value))
            .catch(err => console.log(err));


        // replyTemplate({ reply_token });
        // replyImage({ reply_token });
        // pushText({ text, user_id });
    }
});

app.listen(port, function () {
    console.log('Example app listening on port ' + port);
    // getProfile({ user_id: 'U41c326e474097f65bef1841dd1a7dd9d' })
});




// function replyTemplate(params) {
//     const {reply_token} = params;
//     let template_confirm = {
//         "type": "template",
//         "altText": "this is a confirm template",
//         "template": {
//             "type": "confirm",
//             "text": "Are you sure?",
//             "actions": [
//                 {
//                     "type": "message",
//                     "label": "Yes",
//                     "text": "yes"
//                 },
//                 {
//                     "type": "message",
//                     "label": "No",
//                     "text": "no"
//                 }
//             ]
//         }
//     }

//     let template_buttons = {
//         "type": "template",
//         "altText": "this is a buttons template",
//         "template": {
//             "type": "buttons",
//             "thumbnailImageUrl": "https://example.com/bot/images/image.jpg",
//             "title": "Menu",
//             "text": "Please select",
//             "actions": [
//                 {
//                     "type": "postback",
//                     "label": "Buy",
//                     "data": "action=buy&itemid=123"
//                 },
//                 {
//                     "type": "postback",
//                     "label": "Add to cart",
//                     "data": "action=add&itemid=123"
//                 },
//                 {
//                     "type": "uri",
//                     "label": "View detail",
//                     "uri": "http://example.com/page/123"
//                 }
//             ]
//         }
//     }

//     let template_carousel = {
//         "type": "template",
//         "altText": "this is a carousel template",
//         "template": {
//             "type": "carousel",
//             "columns": [
//                 {
//                     "thumbnailImageUrl": "https://i1.read01.com/image.php?url=0CfnZW00",
//                     "title": "this is menu",
//                     "text": "description",
//                     "actions": [
//                         {
//                             "type": "postback",
//                             "label": "Buy",
//                             "data": "action=buy&itemid=111"
//                         },
//                         {
//                             "type": "postback",
//                             "label": "Add to cart",
//                             "data": "action=add&itemid=111"
//                         },
//                         {
//                             "type": "uri",
//                             "label": "View detail",
//                             "uri": "http://example.com/page/111"
//                         }
//                     ]
//                 },
//                 {
//                     "thumbnailImageUrl": "https://i1.read01.com/image.php?url=0CfnZW00",
//                     "title": "this is menu",
//                     "text": "description",
//                     "actions": [
//                         {
//                             "type": "postback",
//                             "label": "Buy",
//                             "data": "action=buy&itemid=222"
//                         },
//                         {
//                             "type": "postback",
//                             "label": "Add to cart",
//                             "data": "action=add&itemid=222"
//                         },
//                         {
//                             "type": "uri",
//                             "label": "View detail",
//                             "uri": "http://example.com/page/222"
//                         }
//                     ]
//                 }
//             ]
//         }
//     }

//     const data = {
//         replyToken: reply_token,
//         messages: [template_carousel, template_buttons, template_confirm]
//     }
//     replyMessage(data);

// }
