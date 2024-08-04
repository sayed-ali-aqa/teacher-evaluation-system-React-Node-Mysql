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

const EditTeacher = () => {
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
    const [nameErrMsg, setNameErrMsg] = useState('');
    const [genderErrMsg, setGenderErrMsg] = useState('');
    const [degreeErrMsg, setDegreeErrMsg] = useState('');
    const [acadAchevErrMsg, setAcadAchevErrMsg] = useState('');
    const [facultyErrMsg, setFacultyErrMsg] = useState('');
    const [departmentErrMsg, setDepartmentErrMsg] = useState('');
    const [loadingStatus, setLoadingStatus] = useState(false);

    // default values
    const [data, setData] = useState({
        name: '',
        degree: '',
        gender: '',
        academic_acheivement: '',
        faculty: '',
        departmentId: '',
        department: '',
        dep_id: ''
    });

    // Include 'id' in the dependency array to re-run the effect when it changes
    useEffect(() => {
        fetchTeacherData(id);
        handleFetchFactultyData();
    }, [id])

    const fetchTeacherData = async (id) => {
        try {
            const response = await axios.get(`http://localhost:3500/teachers/${id}`);
            setData(response.data[0]);
        } catch (error) {
            setTransition(TransitionUp);
            setErrorOpen(true);
            setSnackbarFailMsg('Error fetching teacher record!');
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
            setSnackbarFailMsg('Error fetching faculty record!');
        }
    }

    const handleNameChange = (event) => {
        setData((prevData) => ({
            ...prevData,
            name: event.target.value
        }))
    }

    const handleDegreeChange = (event) => {
        setData((prevData) => ({
            ...prevData,
            degree: event.target.value
        }))
    }

    const handleGenderChange = (event) => {
        setData((prevData) => ({
            ...prevData,
            gender: event.target.value
        }))
    }

    const handleAcadAcheivChange = (event) => {
        setData((prevData) => ({
            ...prevData,
            academic_acheivement: event.target.value
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

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        let isFormDirty = false;

        if (!data.name || data.name.trim() === '') {
            setNameErrMsg('Name is required');
            isFormDirty = true;
        }
        else if (!isNaN(parseFloat(data.name)) && isFinite(data.name)) {
            setNameErrMsg('Name cannot be number');
            isFormDirty = true;
        } else if (data.name.length > 150) {
            setNameErrMsg('Name should be less than 150 chracters');
            isFormDirty = true;
        } else {
            setNameErrMsg('');
        }

        if (!data.gender || data.gender.trim() === '') {
            setGenderErrMsg('Select gender');
            isFormDirty = true;
        } else {
            setGenderErrMsg('');
        }

        if (!data.degree || data.degree.trim() === '') {
            setDegreeErrMsg('Select degree');
            isFormDirty = true;
        } else {
            setDegreeErrMsg('');
        }

        if (!data.academic_acheivement || data.academic_acheivement.trim() === '') {
            setAcadAchevErrMsg('Select academic acheivement');
            isFormDirty = true;
        } else {
            setAcadAchevErrMsg('');
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

        if (isFormDirty === false) {
            setLoadingStatus(true);

            try {
                const response = await axios.patch(`http://localhost:3500/teachers/${id}`, {
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
                    setSnackbarSuccessMsg("Teacher record updated successfully!");
                } else if (response.data.statusCode === 500 && response.data.success === false) {
                    setTransition(TransitionUp);
                    setErrorOpen(true);
                    setSnackbarFailMsg('Error updating teacher record!');
                }

            } catch (error) {
                setLoadingStatus(false);

                setTransition(TransitionUp);
                setErrorOpen(true);
                setSnackbarFailMsg('Error updating teacher record!');
            }
        }

    }

    return (
        <>
            <div className="dashboard-index">
                <Sidebar />
                <div className="content">
                    <Navbar title='Edit Teacher information' landingPage={false} />
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
                                        id="fullName"
                                        onChange={handleNameChange}
                                        label="Full Name"
                                        value={data.name}
                                        variant="outlined"
                                        error={nameErrMsg && nameErrMsg.length > 0 ? true : false}
                                        helperText={nameErrMsg} />
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
                                <div className="form-group">
                                    <FormControl required className='form-control'>
                                        <InputLabel id="degree">Degree</InputLabel>
                                        <Select
                                            labelId="degree"
                                            id="degree-select"
                                            value={data.degree}
                                            label="Degree"
                                            onChange={handleDegreeChange}
                                            error={degreeErrMsg && degreeErrMsg.length > 0 ? true : false}
                                        >
                                            <MenuItem key="Bachelor" value="Bachelor">Bachelor</MenuItem>
                                            <MenuItem key="Master" value="Master">Master</MenuItem>
                                            <MenuItem key="PHD" value="PHD">PHD</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <span className='error-alert'>{degreeErrMsg && degreeErrMsg.length > 0 ? degreeErrMsg : null}</span>
                                </div>
                                <div className="form-group">
                                    <FormControl required className='form-control'>
                                        <InputLabel id="academicAcheivement">Academic Acheivement</InputLabel>
                                        <Select
                                            labelId="academicAcheivement"
                                            id="academicAcheivement-select"
                                            value={data.academic_acheivement}
                                            label="Academic Acheivement"
                                            onChange={handleAcadAcheivChange}
                                            error={acadAchevErrMsg && acadAchevErrMsg.length > 0 ? true : false}
                                        >
                                            <MenuItem key="Pohyalai" value="Pohyalai">Pohyalai</MenuItem>
                                            <MenuItem key="Pohanmal" value="Pohanmal">Pohanmal</MenuItem>
                                            <MenuItem key="Pohand" value="Pohand">Pohand</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <span className='error-alert'>{acadAchevErrMsg && acadAchevErrMsg.length > 0 ? acadAchevErrMsg : null}</span>
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


export default EditTeacher;