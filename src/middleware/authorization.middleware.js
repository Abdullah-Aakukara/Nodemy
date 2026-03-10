const { error } = require('console');
const jwt = require('jsonwebtoken');
const {resolve} = require('path');
require('dotenv').config({path: resolve(__dirname, '../../.env')})

const authorize = (authorizedPersons) => {
    return (req, res, next) => {
    try {
        if (!req.headers['authorization']) {
            return res.status(401).json({
                error : "Missing/Invalid Authentication credentials"
            })
        }
        const token = req.headers['authorization'].split(' ')[1];
        if (!token) {
            return res.status(401).json({
                error: "Missing/Invalid Authentication credentials"
            })
        }

        const user = jwt.verify(token, process.env.JWT_SECRET)

        const authorized = authorizedPersons.includes(user.role)

        if (authorized){
            req.user = user
            next();
        } else {
            res.status(403).json({
                error: "YOU ARE NOT AN AUTHORIZED PERSON!"
            })
        }

    } catch (error) {
        res.status(500).json({
            error : "Internal server error!"
        })
    }
    }
}
module.exports = authorize;