const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

const validateLoginInput = require("../../validation/login");
const validateRegisterInput = require("../../validation/register");

const Account = require("../../models/Account");

// route for registration
router.post("/register", (req, res) => {

    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    Account.findOne({ email: req.body.email }).then(account => {
        if (account) {
            return res.status(400).json({ email: "Email taken" });
        } else {
            const newAccount = new Account ({
                fname: req.body.fname,
                lname: req.body.lname,
                email: req.body.email,
                uanetid: req.body.uanetid,
                password: req.body.password
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newAccount.password, salt, (err, hash) => {
                    if (err) throw err;
                    newAccount.password = hash;
                    newAccount
                        .save()
                        .then(account => res.json(account))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

// route for logging in
router.post("/login", (req,res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    Account.findOne({ email }).then(account => {
        if(!account) {
            return res.status(404).json({ emailnotfound: "Email not found"});
        }
        bcrypt.compare(password, account.password).then(isMatch => {
            if (isMatch) {
                const payload = {
                    id: account.id,
                    fname: account.fname
                };
            
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 86400
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Incorrect password" });
            }
        });
    });
});

module.exports = router;