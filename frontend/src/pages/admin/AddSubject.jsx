import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import Navbar from '../../components/admin/Navbar';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbars, { TransitionUp } from '../../components/admin/Snackbars';

const AddSubject = () => {

    const [facultyData, setFacultyData] = useState([]);
    const [departmentData, setDepartmentData] = useState([]);
    const [teacherData, setTeacherData] = useState([]);
    // Snakbar
    const [open, setOpen] = useState(false);
    const [transition, setTransition] = useState(undefined);
    const [errorOpen, setErrorOpen] = useState(false);
    const [snackbarSuccessMsg, setSnackbarSuccessMsg] = useState('');
    const [snackbarFailMsg, setSnackbarFailMsg] = useState('');

    // validation states
    const [subjectErrMsg, setSubjectErrMsg] = useState('');
    const [semesterErrMsg, setSemesterErrMsg] = useState('');
    const [creditErrMsg, setCreditErrMsg] = useState('');
    const [facultyErrMsg, setFacultyErrMsg] = useState('');
    const [departmentErrMsg, setDepartmentErrMsg] = useState('');
    const [teacherErrMsg, setTeacherErrMsg] = useState('');
    const [loadingStatus, setLoadingStatus] = useState(false);

    // default values
    const [data, setData] = useState({
        subject: '',
        semester: '',
        credit: '',
        facultyId: '',
        faculty: '',
        departmentId: '',
        department: '',
        teacherId: '',
        name: '',
        dep_id: ''
    });

    useEffect(() => {
        handleFetchFactultyData();
        fetchTeacherData();
    }, [])

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

    const fetchTeacherData = async () => {
        try {
            const response = await axios.get('http://localhost:3500/teachers');
            setTeacherData(response.data);
            console.log(response.data);
        } catch (error) {
            setTransition(TransitionUp);
            setErrorOpen(true);
            setSnackbarFailMsg('Error fetching teachers!');
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

    const handleSubjectChange = (event) => {
        setData((prevData) => ({
            ...prevData,
            subject: event.target.value
        }))
    }

    const handleSemesterChange = (event) => {
        setData((prevData) => ({
            ...prevData,
            semester: event.target.value
        }))
    }

    const handleCreditChange = (event) => {
        setData((prevData) => ({
            ...prevData,
            credit: event.target.value
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
                departmentId: selectedDepartment.dep_id
            }))
        }
    }

    const handleTeacherChange = (event) => {
        setData((prevData) => ({
            ...prevData,
            name: event.target.value
        }))

        const selectedTeacher = teacherData.find(
            (item) => item.name === event.target.value
        );

        if (selectedTeacher) {
            setData((prevData) => ({
                ...prevData,
                teacherId: selectedTeacher.t_id
            }))
        }
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        let isFormDirty = false;

        if (!data.subject || data.subject.trim() === '') {
            setSubjectErrMsg('Subject is required');
            isFormDirty = true;
        }
        else if (!isNaN(parseFloat(data.subject)) && isFinite(data.subject)) {
            setSubjectErrMsg('Subject cannot be number');
            isFormDirty = true;
        } else if (data.subject.length > 150) {
            setSubjectErrMsg('Subject should be less than 150 chracters');
            isFormDirty = true;
        } else {
            setSubjectErrMsg('');
        }

        if (!data.semester || data.semester.trim() === '') {
            setSemesterErrMsg('Select semester');
            isFormDirty = true;
        } else {
            setSemesterErrMsg('');
        }

        if (!data.credit || data.credit.trim() === '') {
            setCreditErrMsg('Select credit');
            isFormDirty = true;
        } else {
            setCreditErrMsg('');
        }

        if (!data.faculty || data.faculty.trim() === '') {
            setFacultyErrMsg('Select faculty');
            isFormDirty = true;
        } else {
            setFacultyErrMsg('');
        }

        if (!data.department || data.department.trim() === '') {
            setDepartmentErrMsg('Select department');
            isFormDirty = true;
        } else {
            setDepartmentErrMsg('');
        }

        if (!data.name || data.name.trim() === '') {
            setTeacherErrMsg('Select teacher');
            isFormDirty = true;
        } else {
            setTeacherErrMsg('');
        }

        if (isFormDirty === false) {
            setLoadingStatus(true);

            try {
                const response = await axios.post('http://localhost:3500/subjects/new', {
                    data: {
                        subject: data.subject,
                        semester: data.semester,
                        credit: data.credit,
                        department: data.departmentId.toString(),
                        teacher: data.teacherId.toString(),
                    }
                });

                setLoadingStatus(false);

                if (response.data.statusCode === 200 && response.data.success === false) {
                    setTransition(TransitionUp);
                    setErrorOpen(true);
                    setSnackbarFailMsg(response.data.msg);
                } else if (response.data.statusCode === 201 && response.data.success === true) {
                    setTransition(TransitionUp);
                    setOpen(true);
                    setSnackbarSuccessMsg("Subject record created successfully!");
                } else if (response.data.statusCode === 500 && response.data.success === false) {
                    setTransition(TransitionUp);
                    setErrorOpen(true);
                    setSnackbarFailMsg('Error creating subject record!');
                }

            } catch (error) {
                console.log(error);
                setLoadingStatus(false);

                setTransition(TransitionUp);
                setErrorOpen(true);
                setSnackbarFailMsg('Error creating subject record!');
            }
        }

    }

    return (
        <>
            <div className="dashboard-index">
                <Sidebar />
                <div className="content">
                    <Navbar title='Add New Subject' landingPage={false} />
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
                                        id="subject"
                                        onChange={handleSubjectChange}
                                        label="subject"
                                        value={data.subject}
                                        variant="outlined"
                                        error={subjectErrMsg && subjectErrMsg.length > 0 ? true : false}
                                        helperText={subjectErrMsg}
                                    />
                                </div>
                                <div className="form-group">
                                    <FormControl required className='form-control'>
                                        <InputLabel id="semester">Semester</InputLabel>
                                        <Select
                                            labelId="semester"
                                            id="semester-select"
                                            value={data.semester}
                                            label="Semester"
                                            onChange={handleSemesterChange}
                                            error={semesterErrMsg && semesterErrMsg.length > 0 ? true : false}
                                        >
                                            <MenuItem key="sem01" value="1">1</MenuItem>
                                            <MenuItem key="sem02" value="2">2</MenuItem>
                                            <MenuItem key="sem03" value="3">3</MenuItem>
                                            <MenuItem key="sem04" value="4">4</MenuItem>
                                            <MenuItem key="sem05" value="5">5</MenuItem>
                                            <MenuItem key="sem06" value="6">6</MenuItem>
                                            <MenuItem key="sem07" value="7">7</MenuItem>
                                            <MenuItem key="sem08" value="8">8</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <span className='error-alert'>{semesterErrMsg && semesterErrMsg.length > 0 ? semesterErrMsg : null}</span>
                                </div>
                                <div className="form-group">
                                    <FormControl required className='form-control'>
                                        <InputLabel id="credit">Credit</InputLabel>
                                        <Select
                                            labelId="credit"
                                            id="credit-select"
                                            value={data.credit}
                                            label="Credit"
                                            onChange={handleCreditChange}
                                            error={creditErrMsg && creditErrMsg.length > 0 ? true : false}
                                        >
                                            <MenuItem key="credit01" value="1">1</MenuItem>
                                            <MenuItem key="credit02" value="2">2</MenuItem>
                                            <MenuItem key="credit03" value="3">3</MenuItem>
                                            <MenuItem key="credit04" value="4">4</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <span className='error-alert'>{creditErrMsg && creditErrMsg.length > 0 ? creditErrMsg : null}</span>
                                </div>

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
                            </div>

                            <div className="row-secondary">
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
                                        <InputLabel id="teacher">Teacher</InputLabel>
                                        <Select
                                            labelId="teacher"
                                            id="teacher-select"
                                            value={data.name}
                                            label="teacher"
                                            onChange={handleTeacherChange}
                                            error={teacherErrMsg && teacherErrMsg.length > 0 ? true : false}
                                        >
                                            {teacherData.length > 0 ?
                                                teacherData.map((item) => (
                                                    <MenuItem key={item.t_id} value={item.name}>
                                                        {item.name}
                                                    </MenuItem>
                                                ))

                                                :
                                                (
                                                    <MenuItem key={data.name} value={data.name}>{data.name}</MenuItem>
                                                )
                                            }
                                        </Select>
                                    </FormControl>
                                    <span className='error-alert'>{teacherErrMsg && teacherErrMsg.length > 0 ? teacherErrMsg : null}</span>
                                </div>
                            </div>

                            <div className="form-submit">
                                <button onClick={handleFormSubmit} type="submit">{loadingStatus ? <CircularProgress style={{ height: '24px', width: '24px', color: '#fff', marginRight: '4px' }} /> : <AddIcon className='icon' />} Add</button>
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


export default AddSubject;