const db = require('../config/db');

class Subject {
    
    static findAll() {
        const sql = `SELECT sub_id, subject, semester, credit, name, department FROM subjects
        JOIN teachers ON subjects.teacher_id = teachers.t_id
        JOIN departments ON subjects.department_id = departments.dep_id
        `;
        return db.execute(sql);
    }

    static findById(id) {
        const sql = `SELECT sub_id, subject, semester, credit, t_id, name, dep_id, department, f_id, faculty  FROM subjects
            JOIN teachers ON subjects.teacher_id = teachers.t_id
            JOIN departments ON subjects.department_id = departments.dep_id
            JOIN faculties ON departments.faculty_id = faculties.f_id
            WHERE subjects.sub_id = ? `;
        return db.execute(sql, [id]);
    }

    
    static getByTeacherId(id) {
        const sql = 'SELECT sub_id, subject, semester FROM subjects WHERE teacher_id = ?';
        return db.execute(sql, [id]);
    }

    static update(id, subject, semester, credit, teacher_id, department_id) {
        const sql = 'UPDATE subjects SET subject = ?, semester = ?, credit = ?, teacher_id = ?, department_id = ? WHERE sub_id = ?';
        return db.execute(sql, [subject, semester, credit, teacher_id, department_id, id]);
    }

    static delete(id) {
        const sql = `DELETE FROM subjects WHERE sub_id = ? `;
        return db.execute(sql, [id]);
    }

    static createSubject(subject, semester, credit, teacherId, depId){
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const createdAt = `${year}-${month}-${day}`;

        const sql = 'INSERT INTO subjects(subject, semester, credit, teacher_id, department_id, created_at) VALUES(?, ?, ?, ?, ?, ?)';
        return db.execute(sql, [subject, semester, credit, teacherId, depId, createdAt]);
    }
}

module.exports = Subject