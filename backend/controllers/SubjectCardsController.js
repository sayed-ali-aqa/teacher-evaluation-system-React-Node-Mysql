const SubjectCards = require('../models/SubjectCardsModel');

const getAllSubjectCards = async (req, res, next) => {
    try {
        const [subCards, subEvaluationStatus] = await SubjectCards.findAll();
        res.status(200).json({ subCards, subEvaluationStatus });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const getDashCardsInfo = async (req, res, next) => {
    try {
        const { studentsCount, teachersCount, facultiesCount, departmentsCount } = await SubjectCards.dashCardsInfo();

        const results = {
            studentsCount,
            teachersCount,
            facultiesCount,
            departmentsCount
        };

        return res.status(200).json(results);

    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = { getAllSubjectCards, getDashCardsInfo };
