const Faculty = require('../models/FacultyModel');
const Joi = require('joi');

// validation faculty
const facultySchema = Joi.object({
    faculty: Joi.string().required().max(100)
});

// get all Faculties
const getFaculties = async (req, res, next) => {
    try {
        const [faculties, _] = await Faculty.findAll(); // Only extract 'faculties' from the result
        res.status(200).json(faculties);

    } catch (error) {
        console.log(error);
        next(error);
    }
};

// get a faculty by id
const getFaculty = async (req, res, next) => {
    try {
        const id = req.params.id;
        const [faculty, _] = await Faculty.findById(id);

        res.status(200).json(faculty);

    } catch (error) {
        console.log(error);
        next(error);
    }
}

// update a Faculty record
const updateFaculty = async (req, res, next) => {

    const { error, value } = facultySchema.validate(req.body);

    if (error) {
        return res.status(200).json({
            success: false,
            statusCode: 200,
            msg: error.details[0].message
        });
    }

    try {
        const { id } = req.params;
        const facultyName = req.body.faculty;

        const response = await Faculty.update(id, facultyName);

        if (response) {
            return res.status(201).json({
                success: true,
                statusCode: 201,
                msg: 'Faculty record updated successfully!'
            })
        }

        return res.status(500).json({
            success: false,
            statusCode: 500,
            error: 'Error updating faculty record'
        })

    } catch (error) {
        console.log(error);
        next(error);

        return res.status(500).json({
            success: false,
            statusCode: 500,
            error: 'Error updating faculty record'
        })
    }
}

// delete Faculty record
const deleteFaculty = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = Faculty.delete(id);

        if (!result) {
            return res.status(500).json({ error: 'Could not delete faculty record' })
        }

        res.status(200).json({ message: 'Faculty record deleted successfully!' })

    } catch (error) {
        console.log(error);
        next(error)
    }
}

const getFacultiesCount = async (req, res, next) => {
    try {
        const [result, _] = await Faculty.countFaculties();
        return res.status(200).json(result);

    } catch (error) {
        console.log(error);
        next(error);
    }
}

const addFaculty = async (req, res, next) => {

    const { error, value } = facultySchema.validate(req.body);

    if (error) {
        return res.status(200).json({
            success: false,
            statusCode: 200,
            msg: error.details[0].message
        });
    }

    try {

        const faculty = req.body.faculty;
        const response = await Faculty.createFaculty(faculty);

        if (response) {
            return res.status(201).json({
                success: true,
                statusCode: 201,
                'msg': 'Faculty record created successfully!'
            });
        } else {
            return res.status(500).json({
                success: false,
                statusCode: 500,
                'msg': 'Error in creating Faculty!'
            });
        }

    } catch (error) {
        console.log(error);
        next(error);

        return res.status(500).json({
            success: false,
            statusCode: 500,
            msg: 'An error occurred while processing your request.'
        });
    }
}


module.exports = { getFaculties, getFaculty, updateFaculty, deleteFaculty, getFacultiesCount, addFaculty }