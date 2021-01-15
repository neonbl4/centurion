/*
 * https://nodemailer.com
 */

const nodemailer = require('nodemailer');
let transporter = null;

module.exports = {
    init: function() {
        transporter = nodemailer.createTransport({
            host: 'smtp.dev4media.com',
            port: 465,
            auth: {
                user: 'system@dev4media.com',
                pass: 'v28srMuw'
            },
            tls: {
                rejectUnauthorized:false
            }
        });

        console.log("--nodemailer---", nodemailer);
    },
    sendMail: function( mailOptions ) {
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
                console.log('Message sent: %s', info.messageId);
            }
        });
    }
};





