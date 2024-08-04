const Teacher = require('../models/TeacherModel')
const Joi = require('joi');

// validation
const teacherSchema = Joi.object({
    name: Joi.string().required().max(50),
    gender: Joi.string().required().valid('Male', 'Female').insensitive(),
    degree: Joi.string().required().max(150),
    academic_acheivement: Joi.string().required().max(100),
    department: Joi.string().required(),
});

// get all teachers
const getTeachers = async (req, res, next) => {
    try {
        const [teachers, _] = await Teacher.findAll();
        res.status(200).json(teachers)

    } catch (error) {
        console.log(error);
        next(error)
    }
}

// get a teacher by id
const getTeacher = async (req, res, next) => {
    try {
        const id = req.params.id;

        const [teacher, _] = await Teacher.findById(id);
        res.status(200).json(teacher)

    } catch (error) {
        console.log(error);
        next(error)
    }
}

const getFacultyBasedTeachers = async (req, res, next) => {
    try {
        const faculty = req.body.params;
        const [teachers, _] = await Teacher.getAllFacultyTeachers(department);
        res.status(200).json({teachers});
    } catch (error) {
        console.log(error);
        next(error);
    }
}

// get teacher by department
const getTeacherByDept = async (req, res, next) => {
    try {
        const { department } = req.query;
        const [teachers, _] = await Teacher.getByDept(department);
        res.status(200).json(teachers);

    } catch (error) {
        console.log(error);
        next(error);
    }
}

// update a teacher record
const updateTeacher = async (req, res, next) => {

    const teacherData = {
        name: req.body.data.name,
        gender: req.body.data.gender,
        degree: req.body.data.degree,
        academic_acheivement: req.body.data.academic_acheivement,
        department: req.body.data.department_id.toString(),
    }

    const { error, value } = teacherSchema.validate({ ...teacherData });

    if (error) {
        return res.status(200).json({
            success: false,
            statusCode: 200,
            msg: error.details[0].message
        })
    }

    try {
        const { id } = req.params;

        const name = req.body.data.name;
        const degree = req.body.data.degree;
        const gender = req.body.data.gender;
        const academic_acheivement = req.body.data.academic_acheivement;
        const department_id = req.body.data.department_id;

        const response = await Teacher.update(id, name, degree, gender, academic_acheivement, department_id);

        if (response) {
            return res.status(201).json({
                success: true,
                statusCode: 201,
                msg: 'Teacher record updated successfully!'
            });
        } else {
            return res.status(500).json({
                success: false,
                statusCode: 500,
                msg: 'Error updating teacher record!'
            });
        }

    } catch (error) {
        console.log(error);
        next(error)

        return res.status(500).json({
            success: false,
            statusCode: 500,
            msg: 'Error updating teacher record!'
        })
    }
}

// delete a teacher record
const deleteTeacher = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await Teacher.delete(id);

        if (!result) {
            return res.status(500).json({ error: 'Could not delete a teacher record' })
        }

        res.status(200).json({ message: 'Teacher record deleted successfully!' })

    } catch (error) {
        console.log(error);
        next(error)
    }
}

const getTeachersCount = async (req, res, next) => {
    try {
        const [result, _] = await Teacher.countTeachers();
        return res.status(200).json(result);

    } catch (error) {
        console.log(error);
        next(error);
    }
}

const addTeacher = async (req, res, next) => {

    const teacherData = {
        name: req.body.data.name,
        gender: req.body.data.gender,
        degree: req.body.data.degree,
        academic_acheivement: req.body.data.academic_acheivement,
        department: req.body.data.dep_id.toString(),
    }

    const { error, value } = teacherSchema.validate({ ...teacherData });

    if (error) {
        return res.status(200).json({
            success: false,
            statusCode: 200,
            msg: error.details[0].message
        })
    }

    try {
        const name = req.body.data.name;
        const degree = req.body.data.degree;
        const gender = req.body.data.gender;
        const academic_acheivement = req.body.data.academic_acheivement;
        const depId = req.body.data.dep_id;

        const response = await Teacher.createTeacher(name, degree, gender, academic_acheivement, depId);

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
                msg: 'Error creating teacher record'
            });
        }

    } catch (error) {
        console.log(error);
        next(error);

        return res.status(500).json({
            success: false,
            statusCode: 500,
            msg: 'Error creating teacher record'
        });
    }
}

module.exports = { getTeachers, getTeacher, updateTeacher, deleteTeacher, getTeachersCount, getFacultyBasedTeachers, getTeacherByDept, addTeacher }