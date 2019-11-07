const router = require("express").Router();
const Email = require("../models/Email");

router.post("/", (req, res) => {
    const id = req.body.id;
    Email.deleteOne({ _id: id })
        .then((doc) => {
            res.redirect("/");
        });
});

module.exports = router;