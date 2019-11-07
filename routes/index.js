const router = require("express").Router();
const { ensureAuthenticated } = require('../config/auth');
const emailType = require("../utils/typeEmail");

const Email = require("../models/Email");

router.get("/", ensureAuthenticated, (req, res) => {
    const user = req.user;
    Email.find({ user }).sort({ 'address': 1 })
        .then((list) => {
            return res.render("index", { req, list, emailType });
        })
});


module.exports = router;

