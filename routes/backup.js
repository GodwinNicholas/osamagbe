const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const router = require("express").Router();

router.get("/", ensureAuthenticated, (req, res) => {
    res.send("backup");
});

module.exports = router;