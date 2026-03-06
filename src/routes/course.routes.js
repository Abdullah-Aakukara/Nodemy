const express = require('express')
const authorize = require('../middleware/authorization.middleware');
const courseRouter = express.Router();

courseRouter.post('/upload', authorize, (req, res) => {
    res.status(200).json({
         message:`Welcome ${req.user.role}! YOU CAN UPLOAD NEW COURSE BY PRESSING THE UPLOAD - BUTTON BELOW!`
     });
})

module.exports = courseRouter;