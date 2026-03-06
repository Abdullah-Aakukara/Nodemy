const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {resolve} = require('path');
require('dotenv').config({path: resolve(__dirname, '../../.env')})
const {doesExist, addNewUser} = require('../services/auth.service');



const handleRegister = async (req, res) => {
    const {username, password} = req.body
    
    if(await doesExist(username)) {
        return res.status(529).json(
            {
                error: `User Already Exists!`
            }
        )
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await addNewUser(username, hashedPassword, 'student');

    res.status(201).json({
       message: `Welcome ${user.role}!
       Your account has been successfully created!`
    });
}


const handleLogin = async (req, res) => {
    const {username, id, role} = req.user;
    const payload = {
        username: username, 
        id: id,
        role: role
    }

    const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
        message: `Welcome ${role} You\'re successfully logged in!`, 
        token: jwtToken
    })
}

module.exports = {handleRegister, handleLogin};
