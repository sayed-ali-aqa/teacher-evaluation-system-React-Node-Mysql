const db = require('../config/db');

class Department {
    // get all departments
    static findAll() {
        const sql = `SELECT dep_id, department, departments.created_at, faculty FROM departments
        JOIN faculties ON departments.faculty_id = faculties.f_id
        ORDER BY faculty`;
        return db.execute(sql);
    }

    // get all departments based on the faculty
    static findAllDepts(faculty) {
        const sql = `SELECT dep_id, department
        FROM departments
        JOIN faculties ON  departments.faculty_id = faculties.f_id
        WHERE faculties.faculty = ?`;

        return db.execute(sql, [faculty])
    }

    // get a department by id
    static findById(id) {
        const sql = `
            SELECT dep_id, department, faculty_id, faculty FROM departments 
            JOIN faculties ON  departments.faculty_id = faculties.f_id
            WHERE departments.dep_id = ?`;
        return db.execute(sql, [id]);
    }

    // update a department record
    static update(id, department, facultyId) {
        const sql = `UPDATE departments SET department = ?, faculty_id =? WHERE dep_id = ?`;
        return db.execute(sql, [department, facultyId, id]);
    }

    // delete department 
    static delete(id) {
        const sql = `DELETE FROM departments WHERE dep_id = ${id}`;
        return db.execute(sql);
    }

    static departmentsCount() {
        const sql = "SELECT COUNT(dep_id) AS departmentsCount from departments";
        return db.execute(sql);
    }

    static createDepartment(department, facultyId) {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const createdAt = `${year}-${month}-${day}`;

        const sql = 'INSERT INTO departments(department, faculty_id, created_at) VALUES(?, ?, ?)';
        return db.execute(sql, [department, facultyId, createdAt]);
    }
}


module.exports = Department