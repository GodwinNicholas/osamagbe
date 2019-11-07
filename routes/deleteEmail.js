const router = require("express").Router();
const Email = require("../models/Email");

router.post("/", (req, res) => {
    const id = req.body.id;
    Email.deleteOne({ _id: id })
        .then((doc) => {
            res.redirect("/");
        });
});

router.post("/all", (req, res) => {
    Email.deleteMany({})
        .then(() => {
            res.redirect("/");
        })
})

module.exports = router;