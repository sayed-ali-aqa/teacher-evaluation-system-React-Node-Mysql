const db = require('../config/db');

class Answer {

    // Bulk insert 
    static saveAll(answers) {
        const sql = `INSERT INTO answers(answer, question_id, student_id, subject_id)
                     VALUES ?`;

        const values = answers.map((answer) => [
            answer.answer,
            answer.question_id,
            answer.student_id,
            answer.subject_id
        ]);

        return db.query(sql, [values]);
    }

    static findAll() {
        const sql = 'SELECT * FROM answers';
        return db.execute(sql);
    }

    static async saveSuggestion(suggestionData) {
        const studentId = 31;
        const status = true;

        const d = new Date();
        const yyyy = d.getFullYear();
        const mm = d.getMonth() + 1;
        const dd = d.getDate();
        const createdAt = `${yyyy}-${mm}-${dd}`;

        let connection;

        try {
            connection = await db.getConnection();
            await connection.beginTransaction();

            const sql = 'INSERT INTO suggestions (suggestion, student_id, subject_id, created_at) VALUES (?, ?, ?, ?)';
            await db.execute(sql, [suggestionData.suggestion, studentId, suggestionData.subjectId, createdAt]);

            const statusSQL = 'INSERT INTO evaluation_status (student_id, subject_id, status, created_at) VALUES (?, ?, ?, ?)';
            await db.execute(statusSQL, [studentId, suggestionData.subjectId, status, createdAt]);

            await connection.commit();

            return true;

        } catch (error) {
            if (connection) {
                await connection.rollback();
            }
            throw error;
        }
        finally {
            if (connection) {
                connection.release();
            }
        }
    }

    static statisticsInfo() {
        const sql = "SELECT answer, COUNT(answer) AS count FROM answers WHERE answer IN ('Yes', 'Somewhat', 'No') GROUP BY answer";
        return db.execute(sql);
    }

    static getByIds(subjectId) {
        const sql = `
            SELECT 
                answers.answer_id,
                questions.question,
                SUM(CASE WHEN answers.answer = 'Yes' THEN 1 ELSE 0 END) AS good,
                SUM(CASE WHEN answers.answer = 'No' THEN 1 ELSE 0 END) AS bad,
                SUM(CASE WHEN answers.answer = 'Somewhat' THEN 1 ELSE 0 END) AS ok
            FROM answers
            JOIN questions ON answers.question_id = questions.q_id
            WHERE answers.subject_id = ?
            GROUP BY questions.q_id`;

        return db.execute(sql, [subjectId]);
    }

    static getSuggestionsbyId(subjectId) {
        const sql = 'SELECT suggestion from suggestions WHERE subject_id = ?';
        return db.execute(sql, [subjectId]);
    }

    static getAnswersBySubjectId(subjectId) {
        const student_id = 31;
        const sql = `
        SELECT answer_id, question, answer FROM answers
        JOIN questions on answers.question_id = questions.q_id
        WHERE answers.student_id = ? AND answers.subject_id = ?`;

        return db.execute(sql, [student_id, subjectId]);
    }
}

module.exports = Answer