const router = require('express').Router();
const { getAllSubjectCards, getDashCardsInfo } = require('../controllers/SubjectCardsController');

router.get('/', getAllSubjectCards);
router.get('/get-dashboard-info', getDashCardsInfo);

module.exports = router;