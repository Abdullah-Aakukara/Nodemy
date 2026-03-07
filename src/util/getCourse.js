const db = require('../db/index');

const getCourse = async (courseId) => {
    const course = await db.query('SELECT * FROM courses WHERE id = $1', [courseId]);
    if(!course.rowCount) {
        return false
    }
    return course.rows[0];
}

module.exports = getCourse;