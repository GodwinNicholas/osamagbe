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
            sendmail(req.body.subject, req.body.body, emailList);
            return res.redirect("/");
        })
});

module.exports = router;