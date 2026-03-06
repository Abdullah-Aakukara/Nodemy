const db = require('../db/index');

const getTransactions = async () => {
    const result  = await db.query('SELECT * FROM transactions');
    return result.rows
}

module.exports = getTransactions;