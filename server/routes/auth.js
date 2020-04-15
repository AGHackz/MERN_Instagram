const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('./../models/user');

const router = express.Router();

router.post('/signup', (req, res, next) => {
    const { email, name, password } = req.body;
    if (!email || !password || !name) {
        return res.status(400).json({
            s: false,
            ed: 'Please send all fields.'
        });
    }
    User.findOne({ 'email': email})
    .then((oldUser) => {
        if (oldUser) {
            return res.status(400).json({
                s: false,
                ed: 'Email already used!'
            });
        } else {
            bcrypt.hash(password, 10, (err, hashedPassword) => {
                if (!err) {
                    const newUser = new User({
                        email: email,
                        name: name,
                        hashedPassword: hashedPassword
                    })
                    console.log('User2: ', newUser);
                    newUser.save()
                    .then(savedUser => {
                        res.json({
                            s: true,
                            msg: 'Signup successful!',
                            data: {
                                email,
                                name
                            }
                        });
                    })
                    .catch(err => {
                        res.status(400).json({
                            s: false,
                            ed: err.message
                        });
                    });
                } else {
                    res.status(400).json({
                        s: false,
                        ed: err.message
                    });
                }
            });
        }
    })
    .catch((err) => {
        return res.status(400).json({
            s: false,
            ed: 'Something went wrong!'
        });
    });
});

router.post('/login', (req, res, next) => {
    const { email, password } = req.body;
    User.findOne({ 'email': email})
    .then((user) => {
        if (user) {
            bcrypt.compare(password, user.hashedPassword, (err, isMatched) => {
                if (isMatched) {
                    return res.json({
                        s: true,
                        msg: 'Login successfully!',
                        data: {
                            email,
                            name: user.name
                        }
                    })
                } else {
                    return res.json({
                        s: false,
                        ed: 'Password is incorect.'
                    })
                }
            })
        } else {
            return res.status(400).json({
                s: false,
                ed: "User doesn't exists!"
            });
        }
    })
    .catch((err) => {
        return res.status(400).json({
            s: false,
            ed: 'Something went wrong!'
        });
    })
});

module.exports = router;