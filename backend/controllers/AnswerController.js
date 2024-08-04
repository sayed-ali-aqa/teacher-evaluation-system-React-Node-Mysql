const Answer = require('../models/AnswerModel');
const hbs = require('handlebars');
const fs = require('fs').promises;
const path = require('path');
const puppeteer = require('puppeteer');
const Handlebars = require('handlebars');
const { raw } = require('mysql2');

// get all answers
const getAnswers = async (req, res, next) => {
    try {
        const [answers, _] = await Answer.findAll();
        res.status(200).json(answers)

    } catch (error) {
        console.log(error);
        next(error)
    }
}

// create a answer record
const createAnswer = async (req, res, next) => {
    try {
        const { answers, subjectId } = req.body;
        const studentId = 31;

        const answerObjects = Object.entries(answers).map(([questionId, answerValue]) => ({
            answer: answerValue,
            question_id: questionId,
            student_id: studentId,
            subject_id: subjectId
        }));

        const result = await Answer.saveAll(answerObjects);

        if (!result) {
            return res.status(500).json({ error: 'Could not create an answer record' });
        }

        return res.status(201).json({ message: 'Answer record created successfully!' });

    } catch (error) {
        console.log(error);
        next(error);
    }
};

const saveSuggestion = async (req, res, next) => {
    try {
        const result = await Answer.saveSuggestion(req.body);

        if (!result) {
            return res.status(500).json({ message: 'Failed to get suggestion!' });
        } else {
            return res.status(201).json({ message: 'Suggestion was saved successfully!' });
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const getStatisticsInfo = async (req, res, next) => {
    try {
        const [result, _] = await Answer.statisticsInfo();
        return res.status(200).json(result);

    } catch (error) {
        console.log(error);
        next(error);
    }
}

const getSearchedAnswers = async (req, res, next) => {
    try {
        const subjectId = req.query.subjectId;

        const [answers, _] = await Answer.getByIds(subjectId);
        res.status(200).json(answers);

    } catch (error) {
        console.log(error);
        next(error);
    }
}

const createAnswerSheet = async (req, res, next) => {
    try {
        const teacher = req.query.teacher;
        const faculty = req.query.faculty;
        const subject = req.query.subject;
        const subjectId = req.query.subjectId;
        const semester = req.query.semester;

        // destructing the array data and removing the meta-data
        const [answers,] = await Answer.getByIds(subjectId);
        const [suggestions,] = await Answer.getSuggestionsbyId(subjectId);

        // Add an 'index' property to each answer
        const answersWithIndex = answers.map((answer, index) => {
            return { ...answer, index: index + 1 };
        });

        const browser = await puppeteer.launch({ headless: "new" });

        try {
            const page = await browser.newPage();

            const filePath = path.join(__dirname, 'templates', 'index.hbs');
            const htmlTemplate = await fs.readFile(filePath, 'utf8');

            // Compile the Handlebars template
            const template = Handlebars.compile(htmlTemplate);

            // Apply the data to the template to generate the final HTML
            const renderedHtml = template({ answersWithIndex, teacher, subject, semester, faculty, suggestions });

            await page.setContent(renderedHtml);

            const pdfBuffer = await page.pdf({
                format: 'A4',
                printBackground: true
            });

            // Set response headers to indicate PDF content
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename="${teacher}-${subject}-evaluation.pdf"`);

            // Send the PDF buffer as response to the client
            res.send(pdfBuffer);
        } catch (error) {
            console.error('Error setting page content or creating PDF:', error);
            res.status(500).json({ error: 'Failed to generate PDF' });
        } finally {
            await browser.close();
        }
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).json({ error: 'Failed to generate PDF' });
        next(error);
    }
}

const getBySubjectId = async (req, res, next) => {
    try {
        const subjectId = req.params.id;
        const [answers, _] = await Answer.getAnswersBySubjectId(subjectId);
        res.status(200).json({ answers });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = { getAnswers, createAnswer, saveSuggestion, getStatisticsInfo, getSearchedAnswers, createAnswerSheet, getBySubjectId }