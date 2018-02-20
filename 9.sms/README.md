# SMS

## 三竹Mitake

> 三竹簡訊API使用方式，必須先跟三竹業務申請開通以公司帳號註冊的帳號，第一次必須先變更密碼才能成功發送簡訊，三竹 API 的 Host 位置為 smexpress.mitake.com.tw ， 選擇 Http 方式使用 Port(9600)，Https 方式則用 Port(9601)，如果是 Http 方式大概會像 `http://smexpress.mitake.com.tw:9600/XXX?username=XXX&password=XXX&...`，以下簡單介紹基本發送及查詢的使用方式。價格最低消費500元=582點，等於每一筆0.86元。

- [三竹簡訊(二站)](https://sms.mitake.com.tw/member/index.jsp?t=1519109355166C3CCD2FE752F47DFE186CD3B006CE327)
- [三竹簡訊(三站)](https://msg2.mitake.com.tw/SMS/Home.jsp?t=1519109439596FDDE6CD1EB896E19D4B743073986A64A) - 本文章介紹是使用三站的帳號

### 發送單筆簡訊

> 三竹發送簡訊方式分為單筆跟多筆，多筆會用POST方式，因為我的使用情境用不到多筆發送，所以這裡只介紹單筆的方式。

```js
const Request = require('request');
const querystring = require('querystring');
const username = process.env.MITAKE_USR;
const password = process.env.MITAKE_PWD;
const phone = '0931XXXXXX';
const text = '你好嗎？？';
const msg = querystring.escape(text);
const api = `${HTTP_HOST}/SmSendGet.asp?username=${username}&password=${password}&dstaddr=${phone}&smbody=${msg}&encoding=UTF8`;
Request.get(api, (error, response, body) => {
    if (error) console.error(error);
    else console.log(body);
});
```

### 查詢餘額

> 回傳剩餘點數

``` js
const Request = require('request');
const username = process.env.MITAKE_USR;
const password = process.env.MITAKE_PWD;
const api = `${HTTP_HOST}/SmQueryGet.asp?username=${username}&password=${password}`;
Request.get(api, (error, response, body) => {
    if (error) console.error(error);
    else console.log(body);
});
```