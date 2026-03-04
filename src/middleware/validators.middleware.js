const {body, validationResult} = require('express-validator')

const registerValidate = [
    body('username').isEmail(), 
    body('password').isLength({min:5}),
    (req, res, next) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.json({error: error.array()})
        }
        next();
    } ];

const loginValidate = [
    body('username').isEmail(),
    body('password').isLength({min:5}),
    (req, res, next) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.json({error: error.array()})
        }
        next();
    }
]

module.exports = {registerValidate, loginValidate};







