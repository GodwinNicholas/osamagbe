const router = require("express").Router();
const { ensureAuthenticated } = require("../config/auth");
// Logout
router.get('/', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/login');
});

module.exports = router;