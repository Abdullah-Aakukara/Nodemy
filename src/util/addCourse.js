const db = require('../db/index');

const addCourse = async (courseDetails) => {
    const {description, price, instructorId} = courseDetails;

    const newCourse = await db.query('INSERT INTO courses (description, price, instructor_id) VALUES($1, $2, $3) RETURNING *', [description, price, instructorId])
    return newCourse.rows[0];
}

module.exports = addCourse;