require('dotenv').config();
const Request = require('request');
const querystring = require('querystring');
const HTTPS_HOST = `https://smexpress.mitake.com.tw:9601`;
const HTTP_HOST = `http://smexpress.mitake.com.tw:9600`;

const GetAPI = (host) => {
    return new Promise((resolve, reject) => {
        Request.get(host, (error, response, body) => {
            if (error) reject(error);
            else resolve(body);
        });
    });
}

class MitakeModule {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    async getStatus(id) {
        let self = this;
        const username = self.username;
        const password = self.password;
        if (!username) {
            return Promise.reject('no username');
        }
        if (!password) {
            return Promise.reject('no password');
        }
        const api = `${HTTP_HOST}/SmQueryGet.asp?username=${username}&password=${password}$msgid=${id}`;
        const result = await GetAPI(api).catch(err => Promise.reject(err));
        return Promise.resolve(result);
    }

    async sendMessage(phone, text) {
        let self = this;
        const username = self.username;
        const password = self.password;
        if (!username) {
            return Promise.reject('no username');
        }
        if (!password) {
            return Promise.reject('no password');
        }
        const msg = querystring.escape(text);
        const api = `${HTTP_HOST}/SmSendGet.asp?username=${username}&password=${password}&dstaddr=${phone}&smbody=${msg}&encoding=UTF8`;
        const result = await GetAPI(api).catch(err => Promise.reject(err));
        return Promise.resolve(result);
    }

    async getAccountPoint() {
        let self = this;
        const username = self.username;
        const password = self.password;
        if (!username) {
            return Promise.reject('no username');
        }
        if (!password) {
            return Promise.reject('no password');
        }
        const api = `${HTTP_HOST}/SmQueryGet.asp?username=${username}&password=${password}`;
        const result = await GetAPI(api).catch(err => Promise.reject(err));
        return Promise.resolve(result);
    }
}

const username = process.env.MITAKE_USR;
const password = process.env.MITAKE_PWD;
const mitake = new MitakeModule(username, password);
// mitake.getAccountPoint().then(value => {
//     console.log(value);
// }).catch(err => {
//     console.log(err);
// });

// const text = '你好';
// mitake.sendMessage('0931XXXXXX', text).then(value => {
//     console.log(value);
// }).catch(err => {
//     console.log(err);
// });

// mitake.getStatus('1209889141,1209888900').then(value => {
//     console.log(value);
// }).catch(err => {
//     console.log(err);
// });