const jwt = require('jsonwebtoken');
const {resolve} = require('path');
require('dotenv').config({path: resolve(__dirname, '../../.env')})

const authorize = (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(' ')[1];
        if (!token) {
            return res.status(401).json({
                message: "JWT TOKEN REQUIRED!"
            })
        }

        const user = jwt.verify(token, process.env.JWT_SECRET)
    
        const authorizedPersons = (req.url === '/transactions') ? ['admin']:['instructor', 'admin']

        const authorized = authorizedPersons.includes(user.role)

        if (authorized){
            req.user = user
             next();
        } else {
            res.status(403).json({
                message: "YOU ARE NOT AN AUTHORIZED PERSON!"
            })
        }

    } catch (error) {
        next(error);
    }
}

module.exports = authorize;