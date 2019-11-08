const nodemailer = require("nodemailer");
const Email = require("../models/Email");

function sendmail(subject, html, list) {
    let counter = list.length - 1;
    let email_counter = 0;
    console.log("counter", counter)
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
    console.log("stage 2")
    send(emails[email_counter].address, emails[email_counter].password, counter, email_counter, list);
    function send(address, password, counter, email_counter) {
        console.log("stage 3")
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
            to: list[counter].address,
            subject: subject,
            html: html
        };

        transporter.sendMail(message, (err, info) => {
            if (err) {
                console.log(err.response);
                counter--;
                email_counter++;
                if (counter != 0) {
                    if (email_counter > 4) {
                        email_counter = 0;
                        transporter.close();
                        return send(emails[email_counter].address, emails[email_counter].password, counter, email_counter, list);
                    }
                    transporter.close();
                    return send(emails[email_counter].address, emails[email_counter].password, counter, email_counter, list);
                }
                console.log("done....")
            }
            else {
                console.log(list[counter].address)
                Email.deleteOne({ address: [list[counter].address] })
                    .then(() => {
                        console.log(`message sent`)
                        if (counter != 0) {
                            counter--;
                            email_counter++;
                            console.log(email_counter)
                            if (email_counter > 4) {
                                email_counter = 0;
                                transporter.close();
                                return send(emails[email_counter].address, emails[email_counter].password, counter, email_counter, list);
                            }
                            transporter.close();
                            return send(emails[email_counter].address, emails[email_counter].password, counter, email_counter, list);
                        }
                        console.log("done....")
                    })
            }
        })
    }
}

module.exports = sendmail;