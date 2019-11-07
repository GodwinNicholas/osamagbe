const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');


const User = require('../models/User');

router.get("/", (req, res) => {
    return res.render("register", { req });
});

router.post("/", (req, res) => {
    const { username, email, emailPassword, password, password2 } = req.body;
    let errors = [];

    // check required fields
    if (!username || !email || !emailPassword || !password || !password2) {
        errors.push({ msg: "please fill all fields" });
    };

    // check passwords match
    if (password !== password2) {
        errors.push({ msg: "passwords do not match" });
    }

    // check pass length
    if (password.lenth < 6) {
        errors.push({ msg: "password is too short" });
    }

    if (errors.length > 0) {
        return res.render("register", {
            errors,
            username,
            email,
            password,
            password2,
            emailPassword,
            req
        });
    }

    else {
        // validation passed
        User.findOne({ username: username })
            .then(user => {
                if (user) {
                    // User already exists
                    errors.push({ msg: "username already exists" });
                    return res.render("register", {
                        errors,
                        username,
                        email,
                        password,
                        password2,
                        emailPassword,
                        req
                    });
                }
                else {
                    const newUser = new User({
                        username,
                        email,
                        emailPassword,
                        password,
                    });

                    // hash password
                    bcrypt.genSalt(10, (err, salt) => {
                        if (err) {
                            // internal error
                            errors.push({ msg: "internal error try agin" });
                            return res.render("register", {
                                errors,
                                username,
                                email,
                                password,
                                password2,
                                emailPassword,
                                req
                            });
                        }

                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            // handle err
                            if (err) {
                                // internal error
                                errors.push({ msg: "internal error try agin" });
                                return res.render("register", {
                                    errors,
                                    username,
                                    email,
                                    password,
                                    password2,
                                    emailPassword,
                                    req
                                });
                            }
                            // set password
                            newUser.password = hash;
                            // save user
                            newUser.save()
                                .then(() => {
                                    req.flash('success_msg', 'You are now registered, login');
                                    res.redirect("/login")
                                })
                                .catch(err => {
                                    errors.push({ msg: "internal error try agin" });
                                    return res.render("register", {
                                        errors,
                                        username,
                                        email,
                                        password,
                                        password2,
                                        emailPassword,
                                        req
                                    });
                                })

                        });
                    })
                }
            })
    }
});



module.exports = router;