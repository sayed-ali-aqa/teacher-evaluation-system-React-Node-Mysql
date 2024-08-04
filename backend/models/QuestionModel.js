const db = require('../config/db');

class Question {
    static findAll() {
        const sql = 'SELECT * FROM questions';
        return db.execute(sql);
    }

    static getById(id) {
        const sql = 'SELECT q_id, question FROM questions WHERE q_id = ?';
        return db.execute(sql, [id])
    }

    static update(id, question) {
        const sql = 'UPDATE questions SET question = ? WHERE q_id = ?';
        return db.execute(sql, [question, id]);
    }

    static delete(id) {
        const sql = `DELETE FROM questions WHERE q_id = ?`;
        return db.execute(sql, [id]);
    }

    static createQuestion(question){
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const createdAt = `${year}-${month}-${day}`;

        const sql = 'INSERT INTO questions(question, created_at) VALUES(?, ?)';
        return db.execute(sql, [question, createdAt])
    }
}

module.exports = Question