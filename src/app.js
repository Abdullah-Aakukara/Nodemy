const express = require('express');
const authRouter = require('./routes/auth.routes');
const courseRouter = require('./routes/course.routes');
const adminRouter = require('./routes/admin.routes');
const paymentRouter = require('./routes/payment.routes');

const app = express();

app.use(express.json())

app.use('/api/auth', authRouter);

app.use('/courses', courseRouter);

app.use('/admin', adminRouter);

app.use('/payment', paymentRouter);


module.exports = app;