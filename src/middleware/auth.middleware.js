const {doesExist} = require('../services/auth.service')
const bcrypt = require('bcrypt')

const userAuth = async (req, res, next) => {
    const {username, password, role} = req.body;
    const user = await doesExist(username, role);

    if(!user) {
        return res.status(404).json({
                error: "User not found!"
        })
    }

    const isPassValid = await bcrypt.compare(password, user.password_hash);

    if (isPassValid) {
        req.user = user
        next();
    } else {
        res.status(401).json({
            error: "Invalid Credentials!"
        })
    }
}

module.exports = userAuth