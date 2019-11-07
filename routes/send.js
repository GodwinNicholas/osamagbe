const router = require("express").Router();
const sendmail = require("../utils/sendmail");
const { ensureAuthenticated } = require('../config/auth');
const Email = require("../models/Email");

router.get("/", ensureAuthenticated, (req, res) => {
    res.render("send", { req });
});

router.post("/", (req, res) => {
    let counter = 0;
    Email.find({ user: req.user })
        .then((emailList) => {
            emailList.forEach(e => {
                (async function send() {
                    if (counter < emailList.length) {
                        await setTimeout(() => {
                            sendmail(e.address, req.body.subject, req.body.body);
                            counter++;
                            console.log(counter)
                            return send()
                        }, 30000);
                    }
                    else {
                        console.log("done")
                        return res.redirect("/");
                    }
                })()
            });
            return res.redirect("/");
        })
});

module.exports = router;