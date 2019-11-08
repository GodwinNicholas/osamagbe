const nodemailer = require("nodemailer");
const Email = require("../models/Email");

function sendmail(subject, html, list) {
    let counter = list.length;
    let email_counter;
    const emails = [
        {
            address: "donaldcris176@gmail.com",
            password: "godwinemail123"
        },
        {
            address: "wadefumi@gmail.com",
            password: "osamagbe123"
        },
        {
            address: "harikuwade@gmail.com",
            password: "osamagbe123"
        },
        {
            address: "Grace7sure@gmail.com",
            password: "osamagbe123"
        },
        {
            address: "laurajo77hnson@gmail.com",
            password: "osamagbe123"
        }
    ];


    // call initial
    send(emails[email_counter].address, emails[email_counter].password, counter);

    function send(address, password, counter, email_counter) {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            pool: true, //
            auth: {
                user: address, // here use your real email
                pass: password // put your password correctly (not in this question please)
            }
        });

        var message = {
            from: address,
            to: list[counter],
            subject: subject,
            html: html
        };

        transporter.sendMail(message, (err, info) => {
            if (err) {
                console.log(err);
                counter--;
                email_counter++;
                if (counter != 0) {
                    transporter.close();
                    return send(emails[email_counter].address, emails[email_counter].password, counter, email_counter);
                }
                console.log("done....")
            }
            else {
                Email.deleteOne({ address })
                    .then(() => {
                        if (email_counter > 4) {
                            email_counter = 0;
                        }
                        console.log(`message sent ${info}`)
                        counter--;
                        email_counter++;
                        if (counter != 0) {
                            transporter.close();
                            return send(emails[email_counter].address, emails[email_counter].password, counter, email_counter);
                        }
                        console.log("done....")
                        return
                    })
            }
        })
    }
}

module.exports = sendmail;