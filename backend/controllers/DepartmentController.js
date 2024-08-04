const Department = require('../models/DepartmentModel');
const Joi = require('joi');

// validation
const departmentSchema = Joi.object({
    faculty: Joi.string().required(),
    department: Joi.string().required().max(100),
});

// get all Departments
const getDepartments = async (req, res, next) => {
    try {
        const [departments, _] = await Department.findAll();
        res.status(200).json(departments);

    } catch (error) {
        console.log(error);
        next(error);
    }
}

// get all Departments
const getDepartsByFactulty = async (req, res, next) => {
    try {
        const faculty = req.query.faculty;

        const [departments, _] = await Department.findAllDepts(faculty);
        res.status(200).json(departments);

    } catch (error) {
        console.log(error);
        next(error);
    }
}

// get a Department by id
const getDepartment = async (req, res, next) => {
    try {
        const id = req.params.id;
        const [department, _] = await Department.findById(id);

        res.status(200).json(department);

    } catch (error) {
        console.log(error);
        next(error);
    }
}

// create a Department
const createDepartment = async (req, res, next) => {
    try {
        const departmentName = req.body.department;
        const faculty_id = req.body.faculty_id;
        const department = new Department(departmentName, faculty_id);
        const result = await department.save();

        if (!result) {
            return res.status(500).json({ error: 'Could not Create Department record' })
        }

        res.status(201).json({ message: 'Created Department record!' })

    } catch (error) {
        console.log(error);
        next(error);
    }
}

// update a Faculty record
const updateDepartment = async (req, res, next) => {
    const departmentData = {
        faculty: req.body.data.faculty.toString(),
        department: req.body.data.department
    }

    const { error, value } = departmentSchema.validate({ ...departmentData });

    if (error) {
        return res.status(200).json({
            success: false,
            statusCode: 200,
            msg: error.details[0].message
        })
    }

    try {
        const { id } = req.params;
        const department = req.body.data.department;
        const facultyId = req.body.data.faculty;

        const response = Department.update(id, department, facultyId);

        if (response) {
            return res.status(201).json({
                success: true,
                statusCode: 201,
                message: 'department record updated successfully!'
            })
        } else {
            return res.status(500).json({
                success: false,
                statusCode: 500,
                error: 'Error updating department record'
            })
        }

    } catch (error) {
        console.log(error);
        next(error);

        return res.status(500).json({
            success: false,
            statusCode: 500,
            error: 'Error updating department record'
        })
    }
}

// delete department record
const deleteDepartment = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = Department.delete(id);

        if (!result) {
            return res.status(500).json({ error: 'Could not delete Department  record' })
        }

        res.status(200).json({ message: 'Department  record deleted successfully!' })

    } catch (error) {
        console.log(error);
        next(error)
    }
}

const getCountDepartments = async (req, res, next) => {
    try {
        const [result, _] = await Department.departmentsCount();
        return res.status(200).json(result);

    } catch (error) {
        console.log(error);
        next(error);
    }
}

const addDepartment = async (req, res, next) => {


    const departmentData = {
        department: req.body.data.department,
        faculty: req.body.data.facultyId.toString()
    }

    const { error, value } = departmentSchema.validate({ ...departmentData });

    if (error) {
        return res.status(200).json({
            success: false,
            statusCode: 200,
            msg: error.details[0].message
        })
    }

    try {
        const facultyId = req.body.data.facultyId;
        const department = req.body.data.department;
        const response = await Department.createDepartment(department, facultyId);

        if (response) {
            return res.status(201).json({
                success: true,
                statusCode: 201,
                msg: 'Department record created successfully!'
            });
        } else {
            return res.status(500).json({
                success: false,
                statusCode: 500,
                msg: 'Error creating department record!'
            });
        }

    } catch (error) {
        console.log(error);
        next(error);

        return res.status(500).json({
            success: false,
            statusCode: 500,
            msg: 'Error creating department record!'
        });
    }
}

module.exports = { getDepartments, getDepartment, createDepartment, updateDepartment, deleteDepartment, getCountDepartments, getDepartsByFactulty, addDepartment }