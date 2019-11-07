module.exports = {
    ensureAuthenticated: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash('error_msg', 'Please log in to view that resource');
        res.redirect('/login');
    },
    forwardAuthenticated: function (req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        res.redirect('/');
    },
    ensureIsAdmin: function (req, res, next) {
        if (req.isAuthenticated && req.user.isAdmin == true) {
            return next()
        }
        res.render("index");
    }
};