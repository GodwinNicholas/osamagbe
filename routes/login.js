const router = require("express").Router();
const passport = require('passport');
// Login


router.get("/", (req, res) => {
    return res.render("login")
});

router.post('/', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
});

module.exports = router;