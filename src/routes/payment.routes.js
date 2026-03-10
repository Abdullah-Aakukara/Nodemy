const express = require('express');
const jwt = require('jsonwebtoken');
const { checkoutValidate } = require('../middleware/validators.middleware');
const pool = require('../db/index');
const getCourse = require('../util/getCourse');
const paymentRouter = express.Router();

const dbClientInit = async () => {
    const client = await pool.connect();
    return client;
}

paymentRouter.post('/checkout', checkoutValidate, async (req, res) => {
    const courseId = Number(req.query.course_id);
    const course = await getCourse(courseId);
    if (!course) {
        return res.status(404).json({
            error : `Course ${courseId} not found!` 
        })
    }
    let client;

    try{
            const token = req.headers['authorization'].split(' ')[1];
            if (!token) {
                return res.status(401).json({
                    error: "Create a Student account to enroll in a Course!"
                })
            }
            const user = jwt.verify(token, process.env.JWT_SECRET);

            //check for student account only 
            if (user.role !== 'student') {
                return res.status(403).json({ error : "Student Account is required to enroll in Course"});
            }
            // Initialize a db client for critical transactions
            client = await dbClientInit();
            // check if the student already enrolled
            const isAlreadyEnrolled = await client.query('SELECT * FROM enrollments WHERE student_id = $1 AND enrolled_in = $2',[user.id, req.query.course_id]);
            if (isAlreadyEnrolled.rowCount) {
                 return res.status(409).json({
                     error: `${user.username} is already enrolled in Course: ${course.description}`
                 })    
            }   
            
            await client.query('BEGIN');
            
            const result = await client.query('INSERT INTO transactions (user_id, amount, status) VALUES ($1, $2, $3) RETURNING *',[user.id, course.price, 'pending'])
            const transactionId = result.rows[0].transaction_id;

            const paymentResult = await new Promise((resolve, reject) => {
                setTimeout(()=> resolve(Math.random() > 0.3), 3000)
            })

            if (paymentResult) {
                await client.query('UPDATE transactions SET status = $1 WHERE transaction_id = $2',['completed', transactionId]);
                await client.query('INSERT INTO enrollments (student_id, enrolled_in) VALUES ($1, $2) RETURNING *', [user.id, courseId]);
                await client.query('COMMIT');
                res.status(200).json({
                    message: `PAYMENT SUCCESSFUL! ✅\nYou have successfully enrolled in Course: ${course.description}`
                })

            } else {
                await client.query('UPDATE transactions SET status = $1 WHERE user_id = $2',['failed', user.id]);
                await client.query('COMMIT');
                res.status(500).json({
                    error: "Transaction Failed! ❌\nInsufficient Balance!"
                })
            }       
        } catch(error) {
            await client.query('ROLLBACK');
            console.error(error.stack);
            res.status(500).json({ error: "Internal server error!"})
        } finally {
            if(client) {
                client.release();
            }
    }
});

module.exports = paymentRouter;