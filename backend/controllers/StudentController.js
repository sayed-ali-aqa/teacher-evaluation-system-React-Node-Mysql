const Student = require('../models/StudentModel');
const Joi = require('joi');


// Validation
const studentSchema = Joi.object({
    registrationID: Joi.string().required().max(15),
    fullName: Joi.string().required().max(50),
    email: Joi.string().required().email().max(120),
    gender: Joi.string().valid('Male', 'Female'),
    faculty: Joi.string().required(),
    department: Joi.string().required(),
    semester: Joi.string().required(),
    time: Joi.string().valid('Morning', 'Afternoon', 'Evening'),
});

const getSearchedStudents = async (req, res, next) => {
    try {
        const { department, time, semester } = req.query;

        // Check if all required parameters are defined
        if (department && time && semester) {
            const [students, _] = await Student.findAllStudents({ department, time, semester });
            res.status(200).json({ students });
        } else {
            res.status(400).json({ error: 'Missing required parameters' });
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

// get a student by id (dashboard)
const getStudentData = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (id) {
            const [student, _] = await Student.getStudent({ id });
            return res.status(200).json(student);
        }
        else {
            return res.status(400).json({ error: 'Student Id is missing!' });
        }

    } catch (error) {
        console.log(error);
        next(error)
    }
}

// get a student by id (user)
const getStudent = async (req, res, next) => {
    try {
        const [student, _] = await Student.findOne();
        res.status(200).json(student)

    } catch (error) {
        console.log(error);
        next(error)
    }
}

const getStudentInfo = async (req, res, next) => {
    try {
        const [studentInfo, _] = await Student.getProfileInfo();
        res.status(200).json(studentInfo);

    } catch (error) {
        console.log(error);
        next(error);
    }
}

// update student record
const updateStudent = async (req, res, next) => {

    const studentData = {
        registrationID: req.body.data.stu_reg_id,
        fullName: req.body.data.name,
        email: req.body.data.email,
        gender: req.body.data.gender,
        faculty: req.body.data.faculty,
        department: req.body.data.dep_id.toString(),
        semester: req.body.data.semester.toString(),
        time: req.body.data.time,
    }

    const { error, value } = studentSchema.validate({ ...studentData });

    if (error) {
        return res.status(200).json({
            success: false,
            statusCode: 200,
            msg: error.details[0].message
        })
    }

    try {
        const { id } = req.params;

        const stu_reg_id = req.body.data.stu_reg_id;
        const name = req.body.data.name;
        const email = req.body.data.email;
        const gender = req.body.data.gender;
        const semester = req.body.data.semester;
        const time = req.body.data.time;
        const departmentId = req.body.data.dep_id;

        const response = await Student.update(id, stu_reg_id, name, email, gender, semester, time, departmentId);

        if (response) {
            return res.status(201).json({
                success: true,
                statusCode: 201,
                msg: 'Student record updated successfully!'
            });
        } else {
            return res.status(500).json({
                success: false,
                statusCode: 500,
                msg: 'Could not update student record!'
            })
        }

    } catch (error) {
        console.log(error);
        next(error);

        return res.status(500).json({
            success: false,
            statusCode: 500,
            msg: 'Could not update student record!'
        })
    }
}

// delete a student record
const deleteStudent = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await Student.delete(id);

        if (!result) {
            return res.status(500).json({ error: 'Could not delete student record!' })
        }
        res.status(200).json({ message: 'Student record deleted successfully!' });

    } catch (error) {
        console.log(error);
        next(error);
    }
}

const getStudentsCount = async (req, res, next) => {
    try {
        const [result, _] = await Student.studentsCount();
        return res.status(200).json(result);

    } catch (error) {
        console.log(error);
        next(error);
    }
}

const getActiveStudents = async (req, res, next) => {

    try {
        const { page, pageSize } = req.query;

        // Convert page and pageSize to numbers with base 10
        const pageNumber = parseInt(page, 10);
        const pageSizeNumber = parseInt(pageSize, 10);

        // Calculate the offset correctly
        const offset = (pageNumber - 1) * pageSizeNumber;
        const limit = pageSizeNumber;

        const [result, _] = await Student.activeStudents(offset, limit);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const addStudent = async (req, res, next) => {

    const studentData = {
        registrationID: req.body.data.stu_reg_id,
        fullName: req.body.data.name,
        email: req.body.data.email,
        gender: req.body.data.gender,
        faculty: req.body.data.faculty,
        department: req.body.data.dep_id.toString(),
        semester: req.body.data.semester,
        time: req.body.data.time,
    }

    const { error, value } = studentSchema.validate({ ...studentData });

    if (error) {
        return res.status(200).json({
            success: false,
            statusCode: 200,
            msg: error.details[0].message
        })
    }

    try {
        const stuRegId = req.body.data.stu_reg_id;
        const name = req.body.data.name;
        const email = req.body.data.email;
        const gender = req.body.data.gender;
        const semester = req.body.data.semester;
        const time = req.body.data.time;
        const depId = req.body.data.dep_id;
        const isPassRevealed = 0;

        const response = await Student.createStudent(stuRegId, email, name, semester, gender, time, depId, isPassRevealed);

        if (response) {
            return res.status(201).json({
                success: true,
                statusCode: 201,
                msg: 'Student record created successfully!'
            });
        } else {
            return res.status(500).json({
                success: false,
                statusCode: 500,
                msg: 'Error creating Student record!'
            });
        }

    } catch (error) {
        console.log(error);
        next(error);

        return res.status(500).json({
            success: false,
            statusCode: 500,
            msg: 'Error creating Student record!'
        });
    }
}

module.exports = { getStudent, getStudentInfo, updateStudent, deleteStudent, getStudentsCount, getActiveStudents, getSearchedStudents, getStudentData, addStudent }