const router = require("express").Router();
const { ensureAuthenticated } = require('../config/auth');
const fs = require("fs");
const path = require("path");
const upload = require("../utils/multerConfig");

// IMPORT MODELS
const Email = require("../models/Email");

router.get("/", ensureAuthenticated, (req, res) => {
    return res.render("upload", { req, msg: "" });
});

router.post("/", (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.render('upload', {
                msg: err
            });
        } else {
            if (req.file == undefined) {
                res.render('upload', {
                    msg: 'Error: No File Selected!'
                });
            } else {
                // add emails to database
                fs.readFile(path.join(__dirname, "../public", "uploads", "list.txt"), "utf8", (err, data) => {
                    if (err) console.log(err);
                    const emailList = data.replace(/\n/g, " ").split(" ");
                    let counter = emailList.length - 1;
                    (function addEmail() {
                        const newEmail = new Email({
                            address: emailList[counter],
                            user: req.user
                        });

                        Email.findOne({ address: [emailList[counter]] })
                            .then(email => {
                                if (email) {
                                    if (counter > 0) {
                                        counter--;
                                        return addEmail();
                                    }
                                    else {
                                        return res.render('upload', {
                                            msg: 'some emails already exist!'
                                        });
                                    }

                                } else {
                                    newEmail.save()
                                        .then(() => {
                                            if (counter > 0) {
                                                counter--;
                                                return addEmail();
                                            }
                                            else {
                                                return res.render('upload', {
                                                    msg: 'Emails Uploaded!'
                                                });
                                            }
                                        })
                                }
                            })
                    })()
                })
            }
        }
    });
})

module.exports = router;