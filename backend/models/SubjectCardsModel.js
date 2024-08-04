const db = require('../config/db');

class SubjectCards {
    static async findAll() {
        const student_id = 31;

        // sub for subject
        const subData = `
        SELECT students.stu_id, students.department_id, departments.department, faculties.faculty, subjects.sub_id, subjects.subject
        FROM students
        JOIN departments ON students.department_id = departments.dep_id
        JOIN faculties ON departments.faculty_id = faculties.f_id
        JOIN subjects ON students.department_id = subjects.department_id
        WHERE students.stu_id = ${student_id}`;

        const subEvaluationStatus = `SELECT subject_id, status FROM evaluation_status WHERE student_id = ${student_id}`;

        try {
            const [subjectCards, evaluationStatus] = await Promise.all([
                db.query(subData),
                db.query(subEvaluationStatus)
            ]);

            return [subjectCards[0], evaluationStatus[0]];
        } catch (error) {
            throw error;
        }
    }

    static async dashCardsInfo() {
        try {
            const studentsCountQuery = "SELECT COUNT(stu_id) AS studentCount from students";
            const teachersCountQuery = "SELECT COUNT(t_id) AS teacherCount from students";
            const facultiesCountQuery = "SELECT COUNT(fa_id) AS facultyCount from students";
            const departmentsCountQuery = "SELECT COUNT(dep_id) AS departmentCount from students";

            const results = {};

            // Execute queries sequentially
            const studentsResult = await knex.raw(studentsCountQuery);
            results.studentsCount = studentsResult.rows[0].studentCount;

            const teachersResult = await knex.raw(teachersCountQuery);
            results.teachersCount = teachersResult.rows[0].teacherCount;

            const facultiesResult = await knex.raw(facultiesCountQuery);
            results.facultiesCount = facultiesResult.rows[0].facultyCount;

            const departmentsResult = await knex.raw(departmentsCountQuery);
            results.departmentsCount = departmentsResult.rows[0].departmentCount;

            return results;
        } catch (error) {
            console.log(error);
            throw new Error('Failed to retrieve dashboard information.');
        }

    }
}


module.exports = SubjectCards;
