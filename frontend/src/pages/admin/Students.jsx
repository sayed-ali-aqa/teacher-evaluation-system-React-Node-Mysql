import React, { useState, useEffect } from 'react';
import Navbar from '../../components/admin/Navbar';
import Sidebar from '../../components/admin/Sidebar';
import { Navigate, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import CircularProgress from '@mui/material/CircularProgress';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axios from 'axios';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { DataGrid } from '@mui/x-data-grid';
import { Paper, IconButton, Menu } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Snackbars, { TransitionUp } from '../../components/admin/Snackbars';
import CustomDialog from '../../components/admin/CustomDialog';

const Students = () => {

    const [studentsList, setStudentsList] = useState([]);
    const [faculty, setFaculty] = useState('');
    const [department, setDepartment] = useState('');
    const [time, setTime] = useState('');
    const [semester, setSemester] = useState('');

    const [facultyData, setFacultyData] = useState([]);
    const [departmentData, setDepartmentData] = useState([]);
    const [loadingStatus, setLoadingStatus] = useState(false);
    // Menu Item states
    const [selectedRowId, setSelectedRowId] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    // Dialog states
    const [openDialog, setOpenDialog] = React.useState(false);

    const [deleteId, setDeleteId] = useState('');
    // Snakbar
    const [open, setOpen] = useState(false);
    const [transition, setTransition] = useState(undefined);
    const [errorOpen, setErrorOpen] = useState(false);
    const [snackbarSuccessMsg, setSnackbarSuccessMsg] = useState('');
    const [snackbarFailMsg, setSnackbarFailMsg] = useState('');

    // validation
    const [facultyErrMsg, setFacultyErrMsg] = useState('');
    const [depErrMsg, setDepErrMsg] = useState('');
    const [timeErrMsg, setTimeErrMsg] = useState('');
    const [semesterErrMsg, setSemesterErrMsg] = useState('');

    const Navigate = useNavigate();

    // Step 4: Function to close options menu
    const handleMenuClose = () => {
        setSelectedRowId(null);
        setAnchorEl(null);
    };

    const handleOptionClick = (option, params) => {
        if (option === 'view') {
            const selectedStudent = studentsList.find(
                (item) => item.stu_reg_id === params.row.id
            )

            if (selectedStudent) {
                Navigate(`/dashboard/students/${selectedStudent.stu_id}`)
            }
        }
        else if (option === 'edit') {
            const selectedStudent = studentsList.find(
                (item) => item.stu_reg_id === params.row.id
            )

            if (selectedStudent) {
                Navigate(`/dashboard/students/edit/${selectedStudent.stu_id}`);
            }
        }
        else if (option === 'delete') {
            console.log('Delete action clicked for row:', params.row.id);
            setOpenDialog(true);
            setDeleteId(params.row.id);
        }

        // Close the options menu after handling the action
        handleMenuClose();
    };


    // Step 6: Function to render the options menu for each row
    const renderOptionsMenu = (params) => {
        const handleOptionsClick = (event) => {
            setSelectedRowId(params.id);
            setAnchorEl(event.currentTarget); // Update anchorEl state
        };

        return (
            <div>
                <IconButton
                    aria-controls={`action-menu-${params.id}`}
                    aria-haspopup="true"
                    onClick={handleOptionsClick} // Use the handleOptionsClick function
                >
                    <MoreVertIcon />
                </IconButton>
                {/* Step 2: Render the options menu conditionally */}
                <Menu
                    id={`action-menu-${params.id}`}
                    anchorEl={anchorEl}
                    keepMounted
                    open={selectedRowId === params.id}
                    onClose={handleMenuClose}
                >
                    {/* Step 3: Implement options */}
                    <MenuItem className='menu-item' onClick={() => handleOptionClick('view', params)}><VisibilityIcon className='icon' /> View</MenuItem>
                    <MenuItem className='menu-item' onClick={() => handleOptionClick('edit', params)}><EditIcon className='icon' /> Edit</MenuItem>
                    <MenuItem className='menu-item' onClick={() => handleOptionClick('delete', params)}><DeleteForeverIcon className='icon' /> Delete</MenuItem>
                </Menu>
            </div>
        );
    };



    useEffect(() => {
        handleFetchFactultyData();
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

    const handleFacultyChange = (event) => {
        setFaculty(event.target.value);
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

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        let isFormDirty = false;

        if (faculty === undefined || faculty.trim() === '') {
            setFacultyErrMsg('Select faculty');
            isFormDirty = true;
        } else {
            setFacultyErrMsg('');
        }

        if (department === undefined || department.trim() === '') {
            setDepErrMsg('Select department');
            isFormDirty = true;
        } else {
            setDepErrMsg('');
        }

        if (time === undefined || time.trim() === '') {
            setTimeErrMsg('Select time');
            isFormDirty = true;
        } else {
            setTimeErrMsg('');
        }

        if (semester === undefined || semester.trim() === '') {
            setSemesterErrMsg('Select semester');
            isFormDirty = true;
        } else {
            setSemesterErrMsg('');
        }

        if (!isFormDirty) {
            try {
                setLoadingStatus(true);

                const response = await axios.get('http://localhost:3500/students/get-searched-students', {
                    params: {
                        department: department,
                        time: time,
                        semester: semester,
                    }
                });

                setStudentsList(response.data.students);
                setLoadingStatus(false);

            } catch (error) {
                setLoadingStatus(false);

                setTransition(TransitionUp);
                setErrorOpen(true);
                setSnackbarFailMsg('Error fetching students result!');
            }
        }

    }

    const columns = [
        { field: 'No', headerName: 'No', width: 75 },
        { field: 'id', headerName: 'ID', width: 150 },
        { field: 'fullName', headerName: 'Name', width: 150 },
        { field: 'gender', headerName: 'Gender', width: 100 },
        { field: 'semester', headerName: 'Semester', width: 130 },
        { field: 'time', headerName: 'Time', width: 130 },
        { field: 'department', headerName: 'Department', width: 200 },
        {
            field: 'action',
            headerName: 'Action',
            width: 80,
            renderCell: renderOptionsMenu, // Use the custom render function
        },
    ];

    const rows = studentsList ? studentsList.map((student, idnex) => ({
        No: idnex + 1,
        id: student.stu_reg_id,
        fullName: student.name,
        gender: student.gender,
        semester: student.semester,
        time: student.time,
        department: student.department
    })) : [];

    // close Dialog function
    const handleCloseDialog = () => {
        setOpenDialog(false);
        setDeleteId('');
    };

    const handleDialogDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:3500/students/${deleteId}`);

            if (response.status === 200) {
                console.log('deleted successfully!');
                setOpenDialog(false);
                setStudentsList((prevStudents) => prevStudents.filter((student) => student.stu_reg_id !== deleteId))

                setTransition(TransitionUp);
                setOpen(true);
                setSnackbarSuccessMsg("Student record deleted successfully!");
            }
        }
        catch (error) {
            setOpenDialog(false);

            setTransition(TransitionUp);
            setErrorOpen(true);
            setSnackbarFailMsg('Error deleting student record!');
        }
    }

    return (
        <>
            <div className="dashboard-index">
                <Sidebar />
                <div className="content">
                    <Navbar title='Active Students List' landingPage={false} />
                    <div className="students-page">
                        <div className="search-bar">
                            <form onSubmit={handleFormSubmit}>
                                <Box sx={{ minWidth: 120 }} className='form-row'>
                                    <FormControl className='form-group'>
                                        <InputLabel id="simple-select-label-faculty">Faculty</InputLabel>
                                        <Select
                                            labelId="simple-select-label-faculty"
                                            id="faculty-simple-select"
                                            value={faculty}
                                            label="Faculty"
                                            onChange={handleFacultyChange}
                                            error={facultyErrMsg && facultyErrMsg.length > 0 ? true : false}
                                        >
                                            {facultyData.length > 0 ? (
                                                facultyData.map((row) => (
                                                    <MenuItem key={row.f_id} value={row.faculty}>
                                                        {row.faculty}
                                                    </MenuItem>
                                                ))
                                            ) : (
                                                <MenuItem value="">No faculty found</MenuItem>
                                            )}
                                        </Select>
                                        <span style={{ display: 'block', height: '1rem', marginBottom: '-1.25rem' }} className='error-alert'>{facultyErrMsg && facultyErrMsg.length > 0 ? facultyErrMsg : null}</span>
                                    </FormControl>

                                    <FormControl className='form-group'>
                                        <InputLabel id="simple-select-label-department">Department</InputLabel>
                                        <Select
                                            labelId="simple-select-label-department"
                                            id="department-simple-select"
                                            value={department}
                                            onChange={e => setDepartment(e.target.value)}
                                            label="Department"
                                            error={depErrMsg && depErrMsg.length > 0 ? true : false}
                                        >
                                            {departmentData.length > 0 ? (
                                                departmentData.map((row) => (
                                                    <MenuItem key={row.department} value={row.department}>
                                                        {row.department}
                                                    </MenuItem>
                                                ))
                                            ) : (
                                                <MenuItem value="">No department found</MenuItem>
                                            )}

                                        </Select>
                                        <span style={{ display: 'block', height: '1rem', marginBottom: '-1.25rem' }} className='error-alert'>{depErrMsg && depErrMsg.length > 0 ? depErrMsg : null}</span>
                                    </FormControl>

                                    <FormControl className='form-group'>
                                        <InputLabel id="simple-select-label-time">Time</InputLabel>
                                        <Select
                                            labelId="simple-select-label-time"
                                            id="time-simple-select"
                                            label="Time"
                                            value={time}
                                            onChange={e => setTime(e.target.value)}
                                            error={timeErrMsg && timeErrMsg.length > 0 ? true : false}
                                        >
                                            <MenuItem value="Morning">Morning</MenuItem>
                                            <MenuItem value="Afternoon">Afternoon</MenuItem>
                                            <MenuItem value="Evening">Evening</MenuItem>
                                        </Select>
                                        <span style={{ display: 'block', height: '1rem', marginBottom: '-1.25rem' }} className='error-alert'>{timeErrMsg && timeErrMsg.length > 0 ? timeErrMsg : null}</span>
                                    </FormControl>

                                    <FormControl className='form-group'>
                                        <InputLabel id="simple-select-label-semester">Semester</InputLabel>
                                        <Select
                                            labelId="simple-select-label-semester"
                                            id="semester-simple-select"
                                            label="Semester"
                                            value={semester}
                                            onChange={e => setSemester(e.target.value)}
                                            error={semesterErrMsg && semesterErrMsg.length > 0 ? true : false}
                                        >
                                            <MenuItem value="1">1</MenuItem>
                                            <MenuItem value="2">2</MenuItem>
                                            <MenuItem value="3">3</MenuItem>
                                            <MenuItem value="4">4</MenuItem>
                                            <MenuItem value="5">5</MenuItem>
                                            <MenuItem value="6">6</MenuItem>
                                            <MenuItem value="7">7</MenuItem>
                                            <MenuItem value="8">8</MenuItem>
                                        </Select>
                                        <span style={{ display: 'block', height: '1rem', marginBottom: '-1.25rem' }} className='error-alert'>{semesterErrMsg && semesterErrMsg.length > 0 ? semesterErrMsg : null}</span>
                                    </FormControl>

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
                                <div className="form-submit">
                                    <button type="submit">
                                        {loadingStatus ? <CircularProgress style={{ height: '24px', width: '24px', color: '#fff', marginRight: '4px' }} /> : <SearchIcon className='icon' />}Search
                                    </button>
                                </div>
                            </form>
                        </div>

                        <Paper style={{ height: 500 }}>
                            <div style={{ height: 500, width: '100%' }}>
                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    initialState={{
                                        pagination: {
                                            paginationModel: { page: 0, pageSize: 5 },
                                        },
                                    }}
                                    pageSizeOptions={[5, 10]}
                                />
                            </div>
                        </Paper>

                        {/* Dialog */}
                        <CustomDialog
                            openDialog={openDialog}
                            setOpenDialog={setOpenDialog}
                            onClose={handleCloseDialog}
                            handleCloseDialog={handleCloseDialog}
                            handleDialogDelete={handleDialogDelete}
                            category="student"
                        />
                    </div>
                </div>
            </div >
        </>
    );
};

export default Students;
