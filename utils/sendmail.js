const nodemailer = require("nodemailer");

function sendmail(receiver, subject, html) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        pool: true, //
        auth: {
            user: 'avery77bradley@gmail.com', // here use your real email
            pass: 'godwinemail123' // put your password correctly (not in this question please)
        }
    });

    var message = {
        from: "avery77bradley@gmail.com",
        to: receiver,
        subject: subject,
        html: html
    };

    transporter.sendMail(message, (err, info) => {
        console.log('err', err);
        console.log("info", info);
    })
}

module.exports = sendmail;