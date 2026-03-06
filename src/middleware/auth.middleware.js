const {doesExist} = require('../services/auth.service')
const bcrypt = require('bcrypt')

const userAuth = async (req, res, next) => {
    const {username, password} = req.body;
    const user = await doesExist(username);

    if(!user) {
        return res.status(404).json({
                message: "User not found!"
        })
    }

    const isPassValid = await bcrypt.compare(password, user.password_hash);

    if (isPassValid) {
        req.user = user
        next();
    } else {
        res.status(402).json({
            message: "Invalid Credentials!"
        })
    }
}

module.exports = userAuth