var nodemailer = require('nodemailer');
let appConfig = require('../../utility/json-manager').getAppConfig();
let _instance = null;

module.exports = function() {

    function Class() {

        var smtpConfig = {
            host: process.env.MAIL_HOST,
    		port: process.env.MAIL_PORT,
            secure: (process.env.MAIL_SSL == "true"), 
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        };

        console.log(smtpConfig);
        this.transporter = nodemailer.createTransport(smtpConfig);
    }

    Class.prototype.send = function( sendMail, subject, text ) {
        var self = this;
        
        var mailOptions = {
            from: `"User" <${process.env.MAIL_USER}>`, // sender address
            to: sendMail, 
            subject: subject, 
            text: text, 
            html: '<b>Hello world 🐴</b>' // html body
        };

        console.log(mailOptions);

        // send mail with defined transport object
        self.transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
        });
    }

    if (_instance === null) {
        _instance = new Class();
    }

    return _instance;
}
