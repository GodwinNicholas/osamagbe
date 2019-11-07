const router = require("express").Router();
const sendmail = require("../utils/sendmail");
const { ensureAuthenticated } = require('../config/auth');
const Email = require("../models/Email");

router.get("/", ensureAuthenticated, (req, res) => {
    res.render("send", { req });
});

router.post("/", (req, res) => {
    Email.find({ user: req.user })
        .then((emailList) => {
            emailList.forEach(e => {
                sendmail(e.address, req.body.subject, req.body.body);
            });
            setTimeout(() => {
                return res.redirect("/");
            }, 0)
        })
});

module.exports = router;