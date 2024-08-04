const { getQuestions, updateQuestion, deleteQuestion, getQuestion, addQuestion } = require('../controllers/QuestionController')
const router = require('express').Router();

// get all Questions
router.get('/', getQuestions);
// get a Question record by id
router.get('/:id', getQuestion);
// update a Question record
router.patch('/:id', updateQuestion);
// delete a Question record
router.delete('/:id', deleteQuestion);
// add new question
router.post('/new', addQuestion);

module.exports = router