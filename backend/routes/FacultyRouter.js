const router = require('express').Router();
const { getFaculties, getFaculty, createFaculty, updateFaculty, deleteFaculty, getFacultiesCount, addFaculty } = require('../controllers/FacultyController');

// get all faculties
router.get('/', getFaculties);
// uppdat a faculty record
router.patch('/:id', updateFaculty);
// delete faculty record
router.delete('/:id', deleteFaculty);
// count departments
router.get('/faculties-count', getFacultiesCount);
// get a faculty
router.get('/:id', getFaculty);
// add new faculty
router.post('/new', addFaculty);

module.exports = router