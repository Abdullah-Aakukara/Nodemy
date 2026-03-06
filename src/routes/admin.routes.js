const express = require('express');
const authorize = require('../middleware/authorization.middleware');
const getTransactions = require('../util/getTransactions')
const adminRouter = express.Router();

adminRouter.get('/transactions', authorize, async (req, res) => {
    const allTransactions = await getTransactions();
    res.status(200).json({
        message: `Welcome ${req.user.role}! Here is the list of Recent Transactions`,
        transactions: allTransactions
    })
})

module.exports = adminRouter;