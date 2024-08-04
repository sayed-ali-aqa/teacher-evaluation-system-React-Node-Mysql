const {getTeachers, getTeacher, createTeacher, updateTeacher, deleteTeacher, getTeachersCount, getFacultyBasedTeachers, getTeacherByDept, addTeacher} = require('../controllers/TeacherController')
const router = require('express').Router();

// get all teachers
router.get('/', getTeachers);
// get teacher count
router.get('/teachers-count', getTeachersCount);
// get teachers based on the faculty
router.get('/get-teachers', getFacultyBasedTeachers);
// get teacher by department
router.get('/get-techers-by-dept', getTeacherByDept);
// update a teacher record
router.patch('/:id', updateTeacher);
// delete a teacher record
router.delete('/:id', deleteTeacher);
// get a teacher record
router.get('/:id', getTeacher);
// add new teacher 
router.post('/new', addTeacher);

module.exports = router