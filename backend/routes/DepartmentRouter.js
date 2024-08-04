const router = require('express').Router();
const { getDepartments, getDepartment, createDepartment, updateDepartment, deleteDepartment, getCountDepartments, getDepartsByFactulty, addDepartment} = require('../controllers/DepartmentController');

// get deapartments baed on the faculty
router.get('/get-departments', getDepartsByFactulty);
// get all departments
router.get('/', getDepartments);
// create a department record
router.post('/', createDepartment);
// uppdat a department record
router.patch('/:id', updateDepartment);
// delete department record
router.delete('/:id', deleteDepartment);
// count departments
router.get('/departments-count', getCountDepartments);
// get a department
router.get('/:id', getDepartment);
// add new department
router.post('/new', addDepartment);

module.exports = router