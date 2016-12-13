const Immutable = require('immutable');
const Request = require('request');
const LINE_API = require('./constants').endpoint;

function RequestPushMessage(post_data, channel_access_token) {
    return new Promise((resolve, reject) => {
        Request({
            url: LINE_API.MESSAGE_PUSH,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': channel_access_token
            },
            method: 'POST',
            body: JSON.stringify(post_data)
        }, (error, response, body) => {
            if (error) {
                reject(error);
            } else if (response.body.error) {
                reject(response.body.error);
            } else {
                resolve(JSON.parse(body));
            }
        });
    });
}

function RequestReplyMessage(post_data, channel_access_token) {
    return new Promise((resolve, reject) => {
        Request({
            url: LINE_API.MESSAGE_REPLY,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': channel_access_token
            },
            method: 'POST',
            body: JSON.stringify(post_data)
        }, (error, response, body) => {
            if (error) {
                reject(error);
            } else if (response.body.error) {
                reject(response.body.error);
            } else {
                resolve(JSON.parse(body));
            }
        });
    });
}

function ReplaceParam(url, value) {
    let strs = url.split('{ID}');
    if (strs.length === 0) {
        return `${strs[0]}${value}`;
    } else {
        return `${strs[0]}${value}${strs[1]}`;
    }
}

function RequestProfile(user_id, channel_access_token) {
    return new Promise((resolve, reject) => {
        console.log(ReplaceParam(LINE_API.PROFILE, user_id));
        Request({
            url: ReplaceParam(LINE_API.PROFILE, user_id),
            headers: {
                'Authorization': channel_access_token
            },
            method: 'GET',
        }, function (error, response, body) {
            if (error) {
                reject(error);
            } else if (response.body.error) {
                reject(response.body.error);
            } else {
                resolve(JSON.parse(body));
            }
        });
    });
}

class LineBot {
    constructor(params = {}) {
        const channel_id = (params.channel_id) ? params.channel_id : '';
        const channel_secret = (params.channel_secret) ? params.channel_secret : '';
        const channel_access_token = (params.channel_access_token) ? `Bearer ${params.channel_access_token}` : '';
        this.options = Immutable.Map({ channel_id, channel_secret, channel_access_token });
    }

    pushTextMessage(text = '', user_id = '') {
        let self = this;
        const post_data = {
            to: user_id,
            messages: [{
                "type": "text",
                "text": text
            }]
        };
        const channel_access_token = self.options.get('channel_access_token');
        return RequestPushMessage(post_data, channel_access_token);
    }

    replyTextMessage(texts = [], reply_token = '') {
        let self = this;
        let post_data = {
            replyToken: reply_token,
            messages: []
        };
        for (const text of texts) {
            post_data.messages.push({
                type: 'text',
                text: text
            })
        }
        const channel_access_token = self.options.get('channel_access_token');
        return RequestReplyMessage(post_data, channel_access_token);
    }

    replyImageMessage(image_url, reply_token = '') {
        const data = {
            replyToken: reply_token,
            messages: [{
                type: 'image',
                originalContentUrl: image_url,
                previewImageUrl: image_url
            }]
        }
        const channel_access_token = self.options.get('channel_access_token');
        return RequestReplyMessage(post_data, channel_access_token);
    }

    getProfile(user_id = '') {
        let self = this;
        const channel_access_token = self.options.get('channel_access_token');
        return RequestProfile(user_id, channel_access_token);
    }

}

module.exports = LineBot;