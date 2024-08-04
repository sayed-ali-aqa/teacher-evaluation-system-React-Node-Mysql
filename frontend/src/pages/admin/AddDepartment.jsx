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

const AddDepartment = () => {

    const [facultyData, setFacultyData] = useState([]);
    const [faculty, setFaculty] = useState('');
    const [facultyId, setFacultyId] = useState('');
    const [department, setDepartment] = useState('');

    // Snakbar
    const [open, setOpen] = useState(false);
    const [transition, setTransition] = useState(undefined);
    const [errorOpen, setErrorOpen] = useState(false);
    const [snackbarSuccessMsg, setSnackbarSuccessMsg] = useState('');
    const [snackbarFailMsg, setSnackbarFailMsg] = useState('');

    // validation states
    const [departmentErrMsg, setDepartmentErrMsg] = useState('');
    const [facultyErrMsg, setFacultyErrMsg] = useState('');
    const [loadingStatus, setLoadingStatus] = useState(false);

    useEffect(() => {
        fetchDepartmentData();
    }, [])

    const fetchDepartmentData = async () => {
        try {
            const faculties = await axios.get('http://localhost:3500/faculties');

            setFacultyData(faculties.data);
            console.log(faculties.data);
        } catch (error) {
            setTransition(TransitionUp);
            setErrorOpen(true);
            setSnackbarFailMsg('Error fetching faculties!');
        }
    }

    const handleDepartmentChange = (event) => {
        setDepartment(event.target.value);
    };

    const handleFacultyChange = (event) => {
        setFaculty(event.target.value);

        const selectedFaculty = facultyData.find(
            (item) => item.faculty === event.target.value
        );

        if (selectedFaculty) {
            setFacultyId(selectedFaculty.f_id);
            console.log(selectedFaculty.f_id);
        }

    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        let isFormDirty = false;

        if (!faculty || faculty.trim() === '') {
            setFacultyErrMsg('Select a faculty');
            isFormDirty = true;
        } else {
            setFacultyErrMsg('');
        }

        if (!department || department.trim() === '') {
            setDepartmentErrMsg('Department is required');
            isFormDirty = true;
        } else if (!isNaN(parseFloat(department)) && isFinite(department)) {
            setDepartmentErrMsg('Department cannot be number');
            isFormDirty = true;
        } else if (department.length > 100) {
            setDepartmentErrMsg('Department should be less than 150 chracters');
            isFormDirty = true;
        } else {
            setDepartmentErrMsg('');
        }

        if (!isFormDirty) {
            setLoadingStatus(true);

            try {
                const response = await axios.post('http://localhost:3500/departments/new', {
                    data: {
                        facultyId: facultyId,
                        department: department
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
                    setSnackbarSuccessMsg("Department record created successfully!");
                } else if (response.data.statusCode === 500 && response.data.success === false) {
                    setTransition(TransitionUp);
                    setErrorOpen(true);
                    setSnackbarFailMsg('Error creating department record!');
                }

            } catch (error) {
                setLoadingStatus(false);

                setTransition(TransitionUp);
                setErrorOpen(true);
                setSnackbarFailMsg('Error creating department record!');
            }
        }


    }

    return (
        <>
            <div className="dashboard-index">
                <Sidebar />
                <div className="content">
                    <Navbar title='Add New Department' landingPage={false} />
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
                                    <FormControl required className='form-control'>
                                        <InputLabel id="faculty">Select faculty</InputLabel>
                                        <Select
                                            labelId="faculty"
                                            id="faculty-select"
                                            value={faculty}
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
                                    <TextField
                                        id="department"
                                        onChange={handleDepartmentChange}
                                        label="Department"
                                        value={department}
                                        variant="outlined"
                                        error={departmentErrMsg && departmentErrMsg.length > 0 ? true : false}
                                        helperText={departmentErrMsg}
                                    />
                                </div>
                            </div>

                            <div className="form-submit" style={{ marginTop: '-1rem' }}>
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


export default AddDepartment;