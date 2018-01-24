require('dotenv').config();
const nodemailer = require('nodemailer');

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT;
const SMTP_AUTH_USER = process.env.SMTP_AUTH_USER;
const SMTP_AUTH_PASS = process.env.SMTP_AUTH_PASS;
const SMTP_AUTH_MAIL_1 = process.env.SMTP_AUTH_MAIL_1;

console.log('Credentials obtained, sending message...');
let transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: false,
    auth: {
        user: SMTP_AUTH_USER,
        pass: SMTP_AUTH_PASS
    },
    logger: false,
    debug: false // include SMTP traffic in the logs
});

// Message object
let options = {
    from: SMTP_AUTH_MAIL_1,
    to: ['s4161035@gmail.com'],
    subject: '我們不一樣✔',
    text: `這麼多年的兄弟
    有誰比我更瞭解你
    太多太多不容易
    磨平了歲月和脾氣
    時間轉眼就過去
    這身後不散的筵席
    只因為我們還在
    心留在原地
    張開手 需要多大的勇氣
    這片天 你我一起撐起
    更努力 只為了我們想要的明天
    好好的 這份情好好珍惜
    我們不一樣
    每個人都有不同的境遇
    我們在這裡
    在這裡等你
    我們不一樣
    雖然會經歷不同的事情
    我們都希望
    來生還能相遇
    這麼多年的兄弟
    有誰比我更瞭解你
    太多太多不容易
    磨平了歲月和脾氣
    時間轉眼就過去
    這身後不散的筵席
    只因為我們還在
    心留在原地
    張開手 需要多大的勇氣
    這片天 你我一起撐起
    更努力 只為了我們想要的明天
    好好的 這份情好好珍惜
    我們不一樣
    每個人都有不同的境遇
    我們在這裡
    在這裡等你
    我們不一樣
    雖然會經歷不同的事情
    我們都希望
    來生還能相遇
    我們不一樣
    每個人都有不同的境遇
    我們在這裡
    在這裡等你
    我們不一樣
    雖然會經歷不同的事情
    我們都希望
    來生還能相遇
    我們不一樣
    雖然會經歷不同的事情
    我們都希望
    來生還能相遇
    我們都希望
    來生還能相遇`,
    html: '',
    attachments: []
};

transporter.sendMail(options, (error, info) => {
    if (error) {
        console.log('Error occurred');
        console.log(error.message);
        return process.exit(1);
    }
    console.log('Message sent successfully!');
    transporter.close();
});