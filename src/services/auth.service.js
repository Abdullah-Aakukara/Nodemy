const db = require('../db/index');

const doesExist = async (username) => {
    const result = await db.query('SELECT * FROM app_users WHERE username = $1',[username]);
    return result.rows.length > 0 ? result.rows[0]:false
};

const addNewUser = async (username, password, role) => {
    const result = await db.query('INSERT INTO app_users(username, password_hash, role) VALUES($1, $2, $3) RETURNING *', [username, password, role]);
    return result.rows[0];
}


module.exports = {doesExist, addNewUser};



