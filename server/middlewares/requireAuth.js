const jwt = require('jsonwebtoken');
const User = require('./../models/user');
const { JWT_SECRET } = require('./../config');

const requireAuthorization = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({
            s: false,
            ed: 'Authorization Token missing!'
        })
    } else {
        jwt.verify(authorization, JWT_SECRET, (err, payload) => {
            if (err) {
                return res.status(400).json({
                    s: false,
                    ed: err.message
                })
            } else {
                User.findOne({'_id': payload._id})
                .then(user => {
                    req.user = user;
                    req.user.hashedPassword = undefined;
                    next()
                })
                .catch(err => {
                    return res.status(400).json({
                        s: false,
                        ed: 'Something went wrong!',
                        error: err 
                    })
                })
            }
        });
    }
}

module.exports = {
    requireAuthorization
}