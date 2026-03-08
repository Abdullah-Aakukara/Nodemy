const {body, validationResult, query} = require('express-validator')

const registerValidate = [
    body('username').isEmail().notEmpty(), 
    body('password').isLength({min:5}).notEmpty(),
    (req, res, next) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({error: error.array()})
        }
        next();
    } ];

const loginValidate = [
    body('username').isEmail().notEmpty(),
    body('password').notEmpty(),
    (req, res, next) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({error: error.array()})
        }
        next();
    }
]

const checkoutValidate = [
    query('course_id').notEmpty(),
    (req, res, next) => {
        const error = validationResult(req);
        if(!error.isEmpty()) {
            return res.status(400).json({error: error.array()})
        }
        next();
    }
]

const uploadValidate = [
    body('description').exists().isLength({min:10, max: 50}).withMessage("Please provide course description!"),
    body('price').isNumeric().withMessage("Please provide course\'s price!"), 
    body('instructor_id').isNumeric().withMessage("Please provide course instructor\'s ID!"), 
    (req, res, next) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array()})
        }
        next();
    }
]

module.exports = {registerValidate, loginValidate, checkoutValidate, uploadValidate};







