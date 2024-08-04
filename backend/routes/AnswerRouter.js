const { getAnswers, createAnswer, saveSuggestion, getStatisticsInfo, getSearchedAnswers, createAnswerSheet, getBySubjectId } = require('../controllers/AnswerController')
const router = require('express').Router();
// get answers by subject
router.get('/get-answers-by-subjectId/:id', getBySubjectId);
// get all Answers
router.get('/', getAnswers);
// create a Answer record
router.post('/', createAnswer);
// save suggestion
router.post('/suggestion', saveSuggestion);
// get infos
router.get('/statistics-info', getStatisticsInfo);
// get searched answers
router.get('/get-searched-answers', getSearchedAnswers);
// create answers sheets
router.get('/create-answers-sheet', createAnswerSheet);

module.exports = router