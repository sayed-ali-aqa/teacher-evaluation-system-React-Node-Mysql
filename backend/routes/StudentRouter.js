const { getStudent, getStudentInfo, updateStudent, deleteStudent, getStudentsCount, getActiveStudents, getSearchedStudents, getStudentData, addStudent } = require('../controllers/StudentController')
const router = require('express').Router();

// get searched students by params
router.get('/get-searched-students', getSearchedStudents);
// get a student by id (user)
router.get('/', getStudent);
// get student info
router.get('/info', getStudentInfo);
// count students
router.get('/students-count', getStudentsCount);
// get active students
router.get('/active-students', getActiveStudents);
// get a student by id (dashboard)
router.get('/:id', getStudentData);
// update a student record
router.patch('/:id', updateStudent);
// delete a student record
router.delete('/:id', deleteStudent);
// add new student
router.post('/new', addStudent);

module.exports = router