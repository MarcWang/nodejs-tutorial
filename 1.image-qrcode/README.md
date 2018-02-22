# QRCode

> 本篇介紹如何使用 NodeJS 產生 QRCode，這裡使用的是[soldair/node-qrcode](https://github.com/soldair/node-qrcode)的套件，以下將介紹幾個較常用的情境和範例程式。

## 產生 QRCode 並輸出成 url

``` js
const QRCode = require('qrcode');
const text = 'Hello Marc!!';

QRCode.toDataURL(text, (err, url) => {
    if (err) throw err;
    console.log(url);
});
```

---

## 產生 QRCode 並儲存成圖片

``` js
const QRCode = require('qrcode');

// 容錯率 L < M < Q < H
const opts = {
    errorCorrectionLevel: 'H',
    version: 2
};
const text = 'Hello Marc!!';
const path = './qrcode.png';
QRCode.toFile(path, text, opts, (err) => {
    if (err) throw err;
    console.log('saved.');
});
```

## 產生自訂顏色的 QRCode

``` js
const QRCode = require('qrcode');

// 容錯率 L < M < Q < H
const opts = {
    errorCorrectionLevel: 'H',
    version: 2,
    color: {
        dark: '#00F',
        light: '#0000'
    }
};
const text = 'Hello Marc!!';
const path = './qrcode.png';
QRCode.toFile(path, text, opts, (err) => {
    if (err) throw err;
    console.log('saved.');
});
```