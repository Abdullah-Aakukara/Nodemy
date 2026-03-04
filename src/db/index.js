const {Pool} = require('pg');
const {resolve} = require('path');

require('dotenv').config({path: resolve(__dirname, '../../.env')})
const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
});

module.exports = pool;
