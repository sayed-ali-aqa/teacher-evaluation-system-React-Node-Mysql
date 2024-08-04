const db = require('../config/db');

class Faculty {

    static findAll() {
        try {
            const sql = `SELECT f_id, faculty, faculties.created_at, COUNT(dep_id) AS numOfDepts FROM faculties
                    JOIN departments ON faculties.f_id = departments.faculty_id
                    GROUP BY f_id, faculty, faculties.created_at;
                    `;

            return db.execute(sql);

        } catch (error) {
            console.log(error);
            throw new Error('Failed to retrieve dashboard information.');
        }
    }


    // get a faculty by id
    static findById(id) {
        const sql = `SELECT * FROM faculties WHERE f_id = ${id}`;
        return db.execute(sql);
    }

    // update a faculty record
    static update(id, facultyName) {
        const sql = "UPDATE faculties SET faculty = ? WHERE f_id = ?";
        return db.execute(sql, [facultyName, id]);
    }

    // delete faculty 
    static delete(id) {
        const sql = `DELETE FROM faculties WHERE f_id = '${id}'`;
        return db.execute(sql);
    }

    static countFaculties() {
        const sql = "SELECT COUNT(f_id) AS facultiesCount from faculties";
        return db.execute(sql);
    }

    static createFaculty(faculty){
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        const createdAt = `${year}-${month}-${day}`;

        const sql = 'INSERT INTO faculties(faculty, created_at) VALUES(?, ?)';
        return db.execute(sql, [faculty, createdAt]);
    }
}


module.exports = Faculty