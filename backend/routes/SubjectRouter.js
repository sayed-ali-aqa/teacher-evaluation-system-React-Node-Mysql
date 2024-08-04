const { getSubjects, getSubject, updateSubject, deleteSubject, getSubjectByTeacherId, addSubject } = require('../controllers/SubjectController')
const router = require('express').Router();

// get all Subjects
router.get('/', getSubjects);
// get subjects based on teacher id
router.get('/by-teacher-id/:id', getSubjectByTeacherId);
// get a Subject record
router.get('/:id', getSubject);
// update a Subject record
router.patch('/:id', updateSubject);
// delete a Subject record
router.delete('/:id', deleteSubject);
// add new subject
router.post('/new', addSubject);

module.exports = router