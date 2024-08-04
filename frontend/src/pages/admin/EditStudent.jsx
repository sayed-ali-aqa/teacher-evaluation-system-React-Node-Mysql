import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar';
import Navbar from '../../components/admin/Navbar';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SaveIcon from '@mui/icons-material/Save';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbars, { TransitionUp } from '../../components/admin/Snackbars';

const EditStudent = () => {
    const { id } = useParams();

    const [facultyData, setFacultyData] = useState([]);
    const [departmentData, setDepartmentData] = useState([]);
    // Snakbar
    const [open, setOpen] = useState(false);
    const [transition, setTransition] = useState(undefined);
    const [errorOpen, setErrorOpen] = useState(false);
    const [snackbarSuccessMsg, setSnackbarSuccessMsg] = useState('');
    const [snackbarFailMsg, setSnackbarFailMsg] = useState('');

    // validation states
    const [stuIDErrMsg, setStuIDErrMsg] = useState('');
    const [nameErrMsg, setNameErrMsg] = useState('');
    const [emailErrMsg, setEmailErrMsg] = useState('');
    const [genderErrMsg, setGenderErrMsg] = useState('');
    const [facultyErrMsg, setFacultyErrMsg] = useState('');
    const [departmentErrMsg, setDepartmentErrMsg] = useState('');
    const [semesterErrMsg, setSemesterErrMsg] = useState('');
    const [timeErrMsg, setTimeErrMsg] = useState('');
    const [loadingStatus, setLoadingStatus] = useState(false);

    // default values
    const [data, setData] = useState({
        stu_reg_id: '',
        name: '',
        email: '',
        gender: '',
        faculty: '',
        departmentId: '',
        department: '',
        dep_id: '',
        semester: '',
        time: '',
    });

    // Include 'id' in the dependency array to re-run the effect when it changes
    useEffect(() => {
        fetchStudentData(id);
        handleFetchFactultyData();
    }, [id])

    const fetchStudentData = async (id) => {
        try {
            const response = await axios.get(`http://localhost:3500/students/${id}`);
            setData(response.data[0]);
        } catch (error) {
            setTransition(TransitionUp);
            setErrorOpen(true);
            setSnackbarFailMsg('Error fetching student record!');
        }
    }

    const handleFetchFactultyData = async () => {
        try {
            const faculties = await axios.get('http://localhost:3500/faculties');

            setFacultyData(faculties.data);
        } catch (error) {
            setTransition(TransitionUp);
            setErrorOpen(true);
            setSnackbarFailMsg('Error fetching faculties!');
        }
    }

    const handleFacultyChange = (event) => {
        setData((prevData) => ({
            ...prevData,
            faculty: event.target.value
        }))

        handleDeptFetch(event.target.value);
    };

    const handleDeptFetch = async (facultyValue) => {
        try {
            const response = await axios.get('http://localhost:3500/departments/get-departments', {
                params: {
                    faculty: facultyValue
                }
            });

            setDepartmentData(response.data);
        } catch (error) {
            setTransition(TransitionUp);
            setErrorOpen(true);
            setSnackbarFailMsg('Error fetching departments!');
        }
    }

    const handleStudentIDChange = (event) => {
        setData((prevData) => ({
            ...prevData,
            stu_reg_id: event.target.value
        }))
    }

    const handleNameChange = (event) => {
        setData((prevData) => ({
            ...prevData,
            name: event.target.value
        }))
    }

    const handleEmailChange = (event) => {
        setData((prevData) => ({
            ...prevData,
            email: event.target.value
        }))
    }

    const handleGenderChange = (event) => {
        setData((prevData) => ({
            ...prevData,
            gender: event.target.value
        }))
    }

    const handleDepartmentChange = (event) => {
        setData((prevData) => ({
            ...prevData,
            department: event.target.value
        }))

        const selectedDepartment = departmentData.find(
            (item) => item.department === event.target.value
        )

        if (selectedDepartment) {
            setData((prevData) => ({
                ...prevData,
                dep_id: selectedDepartment.dep_id
            }))
        }
    }

    const handleSemesterChange = (event) => {
        setData((prevData) => ({
            ...prevData,
            semester: event.target.value
        }))
    }

    const handleTimeChange = (event) => {
        setData((prevData) => ({
            ...prevData,
            time: event.target.value
        }))
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        let isFormDirty = false;

        if (!data.stu_reg_id || data.stu_reg_id.trim() === '') {
            setStuIDErrMsg('Regitration ID is required');
            isFormDirty = true;
        }
        else if (!isNaN(parseFloat(data.stu_reg_id)) && isFinite(data.stu_reg_id)) {
            setStuIDErrMsg('Regitration ID cannot be number');
            isFormDirty = true;
        } else if (data.stu_reg_id.length > 12) {
            setStuIDErrMsg('Regitration ID should be 12 chracters');
            isFormDirty = true;
        } else {
            setStuIDErrMsg('');
        }

        if (!data.name || data.name.trim() === '') {
            setNameErrMsg('Name is required');
            isFormDirty = true;
        }
        else if (!isNaN(parseFloat(data.name)) && isFinite(data.name)) {
            setNameErrMsg('Name cannot be number');
            isFormDirty = true;
        } else if (data.name.length > 50) {
            setNameErrMsg('Name should be less than 50 chracters');
            isFormDirty = true;
        } else {
            setNameErrMsg('');
        }

        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!data.email || data.email.trim() === '') {
            setEmailErrMsg('Email is required');
            isFormDirty = true;
        } else if (emailPattern.test(data.email) === false) {
            setEmailErrMsg('Type a vallid email');
            isFormDirty = true;
        } else if (!isNaN(parseFloat(data.email)) && isFinite(data.email)) {
            setEmailErrMsg('Email cannot be number');
            isFormDirty = true;
        } else if (data.email.length > 120) {
            setEmailErrMsg('Email should be less than 120 chracters');
            isFormDirty = true;
        } else {
            setEmailErrMsg('');
        }

        if (!data.gender || data.gender === '') {
            setGenderErrMsg('Select gender');
            isFormDirty = true;
        } else {
            setGenderErrMsg('');
        }

        if (!data.faculty || data.faculty === '') {
            setFacultyErrMsg('Select faculty');
            isFormDirty = true;
        } else {
            setFacultyErrMsg('');
        }

        if (!data.department || data.department === '') {
            setDepartmentErrMsg('Select department');
            isFormDirty = true;
        } else {
            setDepartmentErrMsg('');
        }

        if (!data.semester || data.semester === '') {
            setSemesterErrMsg('Select semester');
            isFormDirty = true;
        } else {
            setSemesterErrMsg('');
        }

        if (!data.time || data.time === '') {
            setTimeErrMsg('Select time');
            isFormDirty = true;
        } else {
            setTimeErrMsg('');
        }

        if (!isFormDirty) {
            setLoadingStatus(true);

            try {
                const response = await axios.patch(`http://localhost:3500/students/${id}`, {
                    data: data
                });
                setLoadingStatus(false);

                if (response.data.statusCode === 200 && response.data.success === false) {
                    setTransition(TransitionUp);
                    setErrorOpen(true);
                    setSnackbarFailMsg(response.data.msg);
                } else if (response.data.statusCode === 201 && response.data.success === true) {
                    setTransition(TransitionUp);
                    setOpen(true);
                    setSnackbarSuccessMsg("Student record updated successfully!");
                } else if (response.data.statusCode === 500 && response.data.success === false) {
                    setTransition(TransitionUp);
                    setErrorOpen(true);
                    setSnackbarFailMsg("Error updating student record!");
                }

            } catch (error) {
                setLoadingStatus(false);

                setTransition(TransitionUp);
                setErrorOpen(true);
                setSnackbarFailMsg('Error updating student record!');
            }
        }

    }

    return (
        <>
            <div className="dashboard-index">
                <Sidebar />
                <div className="content">
                    <Navbar title='Edit Student information' landingPage={false} />
                    <div className="edit-student">
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <div className="row-primary">
                                <div className="form-group">
                                    <TextField
                                        id="studentID"
                                        onChange={handleStudentIDChange}
                                        label="Student ID"
                                        value={data.stu_reg_id}
                                        variant="outlined"
                                        error={stuIDErrMsg && stuIDErrMsg.length > 0 ? true : false}
                                        helperText={stuIDErrMsg} />
                                </div>
                                <div className="form-group">
                                    <TextField
                                        id="fullName"
                                        onChange={handleNameChange}
                                        label="Full Name"
                                        value={data.name}
                                        variant="outlined"
                                        error={nameErrMsg && nameErrMsg.length > 0 ? true : false}
                                        helperText={nameErrMsg} />
                                </div>
                                <div className="form-group">
                                    <TextField
                                        id="email"
                                        onChange={handleEmailChange}
                                        label="Email"
                                        value={data.email}
                                        variant="outlined"
                                        error={emailErrMsg && emailErrMsg.length > 0 ? true : false}
                                        helperText={emailErrMsg} />
                                </div>
                                <div className="form-group">
                                    <FormControl required className='form-control'>
                                        <InputLabel id="gender">Gender</InputLabel>
                                        <Select
                                            labelId="gender"
                                            id="gender-select"
                                            value={data.gender}
                                            label="Gender"
                                            onChange={handleGenderChange}
                                            error={genderErrMsg && genderErrMsg.length > 0 ? true : false}
                                        >
                                            <MenuItem key="Male" value="Male">Male</MenuItem>
                                            <MenuItem key="Female" value="Female">Female</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <span className='error-alert'>{genderErrMsg && genderErrMsg.length > 0 ? genderErrMsg : null}</span>
                                </div>
                            </div>

                            <div className="row-secondary">
                                <div className="form-group">
                                    <FormControl required className='form-control'>
                                        <InputLabel id="faculty">Faculty</InputLabel>
                                        <Select
                                            labelId="faculty"
                                            id="faculty-select"
                                            value={data.faculty}
                                            label="faculty"
                                            onChange={handleFacultyChange}
                                            error={facultyErrMsg && facultyErrMsg.length > 0 ? true : false}
                                        >
                                            {facultyData.length > 0 ? (
                                                facultyData.map((item) => (
                                                    <MenuItem key={item.faculty} value={item.faculty}>
                                                        {item.faculty}
                                                    </MenuItem>
                                                ))
                                            ) :
                                                (<MenuItem key="fac01" value="">No faculty exits</MenuItem>)
                                            }
                                        </Select>
                                    </FormControl>
                                    <span className='error-alert'>{facultyErrMsg && facultyErrMsg.length > 0 ? facultyErrMsg : null}</span>
                                </div>

                                <div className="form-group">
                                    <FormControl required className='form-control'>
                                        <InputLabel id="department">Department</InputLabel>
                                        <Select
                                            labelId="department"
                                            id="department-select"
                                            value={data.department}
                                            label="department"
                                            onChange={handleDepartmentChange}
                                            error={departmentErrMsg && departmentErrMsg.length > 0 ? true : false}
                                        >
                                            {departmentData.length > 0 ?
                                                departmentData.map((item) => (
                                                    <MenuItem key={item.dep_id} value={item.department}>
                                                        {item.department}
                                                    </MenuItem>
                                                ))

                                                :
                                                (
                                                    <MenuItem key={data.department} value={data.department}>{data.department}</MenuItem>
                                                )
                                            }
                                        </Select>
                                    </FormControl>
                                    <span className='error-alert'>{departmentErrMsg && departmentErrMsg.length > 0 ? departmentErrMsg : null}</span>
                                </div>

                                <div className="form-group">
                                    <FormControl required className='form-control'>
                                        <InputLabel id="semester">Semester</InputLabel>
                                        <Select
                                            labelId="semester"
                                            id="semester-select"
                                            value={data.semester}
                                            label="semester"
                                            onChange={handleSemesterChange}
                                            error={semesterErrMsg && semesterErrMsg.length > 0 ? true : false}
                                        >
                                            <MenuItem key="sem1" value="1">1</MenuItem>
                                            <MenuItem key="sem2" value="2">2</MenuItem>
                                            <MenuItem key="sem3" value="3">3</MenuItem>
                                            <MenuItem key="sem4" value="4">4</MenuItem>
                                            <MenuItem key="sem5" value="5">5</MenuItem>
                                            <MenuItem key="sem6" value="6">6</MenuItem>
                                            <MenuItem key="sem7" value="7">7</MenuItem>
                                            <MenuItem key="sem8" value="8">8</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <span className='error-alert'>{semesterErrMsg && semesterErrMsg.length > 0 ? semesterErrMsg : null}</span>
                                </div>

                                <div className="form-group">
                                    <FormControl required className='form-control'>
                                        <InputLabel id="time">Time</InputLabel>
                                        <Select
                                            labelId="time"
                                            id="time-select"
                                            value={data.time}
                                            label="time"
                                            onChange={handleTimeChange}
                                            error={timeErrMsg && timeErrMsg.length > 0 ? true : false}
                                        >
                                            <MenuItem value="Morning">Morning</MenuItem>
                                            <MenuItem value="Afternoon">Afternoon</MenuItem>
                                            <MenuItem value="Evening">Evening</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <span className='error-alert'>{timeErrMsg && timeErrMsg.length > 0 ? timeErrMsg : null}</span>
                                </div>
                            </div>

                            <div className="form-submit">
                                <button onClick={handleFormSubmit} type="submit">{loadingStatus ? <CircularProgress style={{ height: '24px', width: '24px', color: '#fff', marginRight: '4px' }} /> : <SaveIcon className='icon' />} Update</button>
                            </div>

                            {/* imported snackbars with the required props*/}
                            <Snackbars
                                open={open}
                                setOpen={setOpen}
                                errorOpen={errorOpen}
                                setErrorOpen={setErrorOpen}
                                transition={transition}
                                setTransition={setTransition}
                                successMsg={snackbarSuccessMsg}
                                failMsg={snackbarFailMsg}
                            />
                        </Box>
                    </div>
                </div>
            </div>
        </>
    );
}


export default EditStudent;