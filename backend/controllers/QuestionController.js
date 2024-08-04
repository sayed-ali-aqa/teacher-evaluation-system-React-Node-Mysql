const Question = require('../models/QuestionModel')
const Joi = require('joi');

// validation Schema
const questionSchema = Joi.object({
    question: Joi.string().required().max(250)
});

// get all questions
const getQuestions = async (req, res, next) => {
    try {
        const [questions, _] = await Question.findAll();
        res.status(200).json(questions)

    } catch (error) {
        console.log(error);
        next(error)
    }
}

const getQuestion = async (req, res, next) => {
    try {
        const { id } = req.params;
        const [question, _] = await Question.getById(id);

        res.status(200).json(question)

    } catch (error) {
        console.log(error);
        next(error)
    }
}

// update questions
const updateQuestion = async (req, res, next) => {
    // Validate the request body against the schema
    const { error, value } = questionSchema.validate(req.body);

    if (error) {
        return res.status(200).json({
            success: false,
            statusCode: 200,
            msg: error.details[0].message
        })
    }

    try {
        const { id } = req.params;
        const question = req.body.question;

        const response = await Question.update(id, question);

        if (response) {
            return res.status(201).json({
                success: true,
                statusCode: 201,
                msg: 'question record updated successfully!'
            })
        }

        return res.status(500).json({
            success: false,
            statusCode: 500,
            msg: 'Error updating question record'
        })

    } catch (error) {
        console.log(error);
        next(error);

        return res.status(500).json({
            success: false,
            statusCode: 500,
            msg: 'Error updating question record'
        })
    }
}

const deleteQuestion = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await Question.delete(id);

        if (!result) {
            return res.status(500).json({ error: 'Could not delete a question record' })
        }

        res.status(200).json({ message: 'question record deleted successfully!' })

    } catch (error) {
        console.log(error);
        next(error)
    }
}

const addQuestion = async (req, res, next) => {
    // Validate the request body against the schema
    const { error, value } = questionSchema.validate(req.body);

    if (error) {
        return res.status(200).json({
            success: false,
            statusCode: 200,
            msg: error.details[0].message
        })
    }

    try {
        const question = req.body.question;
        const response = await Question.createQuestion(question);

        if (response) {
            return res.status(201).json({
                success: true,
                statusCode: 201,
                msg: 'Question record created successfully!'
            });
        }
        else {
            return res.status(500).json({
                success: false,
                statusCode: 500,
                msg: 'Error creating question record!'
            })
        }
    } catch (error) {
        console.log(error);
        next(error);

        return res.status(500).json({
            success: true,
            statusCode: 500,
            msg: 'Error creating question record!'
        });
    }
}

module.exports = { getQuestions, updateQuestion, deleteQuestion, getQuestion, addQuestion }