const express = require('express');
const cors = require('cors');
const authRouter = require('./routes/auth.routes');
const courseRouter = require('./routes/course.routes');
const adminRouter = require('./routes/admin.routes');
const paymentRouter = require('./routes/payment.routes');

const app = express();

app.use(express.json())
app.use(cors());
app.use(express.static('public'))


app.use('/api/auth', authRouter);

app.use('/courses', courseRouter);

app.use('/admin', adminRouter);

app.use('/payment', paymentRouter);


module.exports = app;