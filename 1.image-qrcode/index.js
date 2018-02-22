const QRCode = require('qrcode')

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

QRCode.toDataURL(text, opts, (err, url) => {
    if (err) throw err;
    console.log(url);
});

const path = './qrcode.png';
QRCode.toFile(path, text, opts, (err) => {
    if (err) throw err;
    console.log('saved.')
})