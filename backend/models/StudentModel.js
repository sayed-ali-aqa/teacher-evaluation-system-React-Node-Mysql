const { log } = require('console');
const db = require('../config/db');
const crypto = require('crypto');

// random password generator
function generateRandomPassword(length) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
}

class Student {

    // get all students
    static findAllStudents({ department, time, semester }) {
        let sql = `SELECT stu_id, stu_reg_id, name, semester, gender, time, department
                           FROM students
                           INNER JOIN departments ON students.department_id = departments.dep_id
                           WHERE students.semester = ? AND students.time = ? AND departments.department = ?`;

        return db.execute(sql, [semester, time, department]);
    }

    // get a stuednt by id (dashboard)
    static getStudent({ id }) {
        const sql = `
        SELECT stu_id, stu_reg_id, email, name, semester, gender, time, department, dep_id, faculty 
        FROM students 
        JOIN departments ON students.department_id = departments.dep_id
        JOIN faculties ON departments.faculty_id = faculties.f_id
        WHERE students.stu_id = ?
        `;
        return db.execute(sql, [id]);
    }

    // get a stuednt by id (user)
    static findOne() {
        const studentId = 31;

        const sql = `
        SELECT stu_reg_id, email, name, semester, gender, time, department, faculty 
        FROM students 
        JOIN departments ON students.department_id = departments.dep_id
        JOIN faculties ON departments.faculty_id = faculties.f_id
        WHERE students.stu_id = ${studentId}
        `;
        return db.execute(sql);
    }

    static getProfileInfo() {
        const studentId = 31;

        const sql = `SELECT name, gender FROM students WHERE stu_id = ${studentId}`;
        return db.execute(sql);
    }

    // update a student
    static update(id, stu_reg_id, name, email, gender, semester, time, departmentId) {
        const sql = "UPDATE students SET stu_reg_id = ?, email = ?, name = ?, semester = ?, gender = ?, time = ?, department_id = ? WHERE stu_id = ?";

        // parameterized values to avoid SQL injection
        return db.execute(sql, [stu_reg_id, email, name, semester, gender, time, departmentId, id]);
    }

    // delete a student
    static delete(id) {
        const sql = "DELETE FROM students WHERE stu_reg_id = ?";
        return db.execute(sql, [id]);
    }

    static studentsCount() {
        const sql = "SELECT COUNT(stu_id) AS studentCount from students";
        return db.execute(sql);
    }

    static createStudent(stuRegId, email, name, semester, gender, time, depId, isPassRevealed) {
        const randomPassword = generateRandomPassword(6);

        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const createdAt = `${year}-${month}-${day}`;

        const sql = `
            INSERT INTO students(stu_reg_id, email, password, name, semester, gender, time, department_id, is_pass_revealed, created_at) 
            VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `;

        return db.execute(sql, [stuRegId, email, randomPassword, name, semester, gender, time, depId, isPassRevealed, createdAt]);
    }
}


module.exports = Student;