const express = require('express')
const authorize = require('../middleware/authorization.middleware');
const { uploadValidate } = require('../middleware/validators.middleware');
const addCourse = require('../util/addCourse');
const courseRouter = express.Router();

courseRouter.post('/upload', uploadValidate, authorize(['admin', 'instructor']), async (req, res) => {
    try {
        const course = await addCourse(req.body); 
        res.status(201).json({
            message : `WELLDONE FACULTY! \nYou have uploaded a NEW COURSE named: ${course.description}!`
     });
    } catch(error) {
        console.error(error.stack);
        res.status(500).json({
            error : "Internal server error, try again !"
        })
    }
    

})

module.exports = courseRouter;