const express = require('express')
const {registerValidate, loginValidate} = require('../middleware/validators.middleware');
const userAuth = require('../middleware/auth.middleware');
const {handleRegister, handleLogin} = require('../controllers/auth.controller');

const authRouter = express.Router();


authRouter.post('/register', registerValidate, handleRegister);

authRouter.post('/login', loginValidate, userAuth, handleLogin);

module.exports = authRouter;
