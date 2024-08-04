const Subject = require('../models/SubjectModel');
const Joi = require('joi');

// vlidation
const subjectSchema = Joi.object({
    subject: Joi.string().required().max(150),
    semester: Joi.string().required(),
    credit: Joi.string().required(),
    department: Joi.string().required(),
    teacher: Joi.string().required(),
});

// get all subjects
const getSubjects = async (req, res, next) => {
    try {
        const [subjects, _] = await Subject.findAll();
        res.status(200).json(subjects)

    } catch (error) {
        console.log(error);
        next(error)
    }
}

// get all subjects
const getSubject = async (req, res, next) => {
    try {
        const { id } = req.params;
        const [subject, _] = await Subject.findById(id);
        res.status(200).json(subject)

    } catch (error) {
        console.log(error);
        next(error)
    }
}

const getSubjectByTeacherId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const [subjects, _] = await Subject.getByTeacherId(id);
        res.status(200).json(subjects);

    } catch (error) {
        console.log(error);
        next(error)
    }
}

// create a update record
const updateSubject = async (req, res, next) => {

    const subjectData = {
        subject: req.body.data.subject,
        semester: req.body.data.semester.toString(),
        credit: req.body.data.credit.toString(),
        department: req.body.data.dep_id.toString(),
        teacher: req.body.data.t_id.toString(),
    }

    const { error, value } = subjectSchema.validate({ ...subjectData });

    if (error) {
        return res.status(200).json({
            success: false,
            statusCode: 200,
            msg: error.details[0].message
        })
    }

    try {
        const { id } = req.params;

        const subject = req.body.data.subject;
        const semester = req.body.data.semester;
        const credit = req.body.data.credit;
        const teacher_id = req.body.data.t_id;
        const department_id = req.body.data.dep_id;

        const response = await Subject.update(id, subject, semester, credit, teacher_id, department_id);

        if (response) {
            return res.status(201).json({
                success: true,
                statusCode: 201,
                msg: 'subject record updated successfully!'
            })
        } else {
            return res.status(500).json({
                success: false,
                statusCode: 500,
                msg: 'Error updating subject record!'
            })
        }

    } catch (error) {
        console.log(error);
        next(error)

        return res.status(500).json({
            success: false,
            statusCode: 500,
            msg: 'Error updating subject record!'
        })
    }
}

// delete all subjects
const deleteSubject = async (req, res, next) => {
    try {
        const { id } = req.params;
        const response = await Subject.delete(id);

        if (response) {
            res.status(200).json({ success: true, message: 'subject record deleted successfully!' })
        } else {
            res.status(500).json({ success: false, msg: 'Error deleting subject record' })
        }

    } catch (error) {
        console.log(error);
        next(error)
    }
}

const addSubject = async (req, res, next) => {
    const { error, value } = subjectSchema.validate({ ...req.body.data });

    if (error) {
        return res.status(200).json({
            success: false,
            statusCode: 200,
            msg: error.details[0].message
        })
    }

    try {
        const subject = req.body.data.subject;
        const semester = req.body.data.semester;
        const credit = req.body.data.credit;
        const teacherId = req.body.data.teacher;
        const depId = req.body.data.department;

        const response = await Subject.createSubject(subject, semester, credit, teacherId, depId);

        if (response) {
            return res.status(201).json({
                success: true,
                statusCode: 201,
                msg: 'Teacher record created successfully!'
            });
        } else {
            return res.status(500).json({
                success: false,
                statusCode: 500,
                msg: 'Error creating teacher record!'
            });
        }
    } catch (error) {
        console.log(error);
        next(error);

        return res.status(500).json({
            success: false,
            statusCode: 500,
            msg: 'Error creating teacher record!'
        });
    }
}

module.exports = { getSubjects, getSubject, updateSubject, deleteSubject, getSubjectByTeacherId, addSubject }