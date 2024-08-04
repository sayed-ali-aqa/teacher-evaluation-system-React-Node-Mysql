const db = require('../config/db');

class Teacher {
    
    static findAll() {
        const sql = `
        SELECT t_id, name, degree, gender, academic_acheivement, faculty FROM teachers
        JOIN departments ON teachers.department_id = departments.dep_id
        JOIN faculties ON departments.faculty_id = faculties.f_id
        `;
        return db.execute(sql);
    }

    static getAllFacultyTeachers(departmentId) {
        const sql = 'SELECT t_id, name FROM teachers WHERE department_id = ?';
        return db.execute(sql, [departmentId]);
    }

    static findById(id) {
        const sql = `
        SELECT t_id, name, degree, gender, academic_acheivement, faculty, department, department_id FROM teachers
        JOIN departments ON teachers.department_id = departments.dep_id
        JOIN faculties ON departments.faculty_id = faculties.f_id
         WHERE t_id = ?`;
        return db.execute(sql, [id]);
    }

    static update(id, name, degree, gender, academic_acheivement, department_id) {
        const sql = "UPDATE teachers SET name = ?, degree = ?, gender = ?, academic_acheivement = ?, department_id = ? WHERE t_id = ?";
        return db.execute(sql, [name, degree, gender, academic_acheivement, department_id, id]);
    }

    static getByDept(department) {
        const sql = `SELECT t_id, name FROM teachers 
        JOIN departments ON teachers.department_id = departments.dep_id
        WHERE departments.department = ?`;
        return db.execute(sql, [department]);
    }

    static delete(id) {
        const sql = "DELETE FROM teachers WHERE t_id = ?";
        return db.execute(sql, [id]);
    }

    static countTeachers() {
        const sql = "SELECT COUNT(t_id) AS teachersCount from teachers";
        return db.execute(sql);
    }

    static createTeacher(name, degree, gender, academic_acheivement, depId){
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const createdAt = `${year}-${month}-${day}`;

        const sql = 'INSERT INTO teachers(name, degree, gender, academic_acheivement, department_id, created_at) VALUES(?, ?, ?, ?, ?, ?)';
        return db.execute(sql, [name, degree, gender, academic_acheivement, depId, createdAt])
    }
}

module.exports = Teacher