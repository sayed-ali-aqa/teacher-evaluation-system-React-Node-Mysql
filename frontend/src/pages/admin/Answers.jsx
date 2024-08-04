import React, { useState, useEffect } from 'react';
import Navbar from '../../components/admin/Navbar';
import Sidebar from '../../components/admin/Sidebar';
import SearchIcon from '@mui/icons-material/Search';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { DataGrid } from '@mui/x-data-grid';
import { Paper } from '@mui/material';
import Snackbars, { TransitionUp } from '../../components/admin/Snackbars';
import NoteAddIcon from '@mui/icons-material/NoteAdd';


const Answers = () => {

    const [answersList, setAnswersList] = useState([]);
    const [departmentData, setDepartmentData] = useState([]);
    const [teacherData, setTeacherData] = useState([]);
    const [subjectData, setSubjectData] = useState([]);

    const [department, setDepartment] = useState('');
    const [faculty, setFaculty] = useState('');
    const [teacher, setTeacher] = useState('');
    const [subject, setSubject] = useState('');
    const [semester, setSemester] = useState('');
    const [subjectId, setSubjectId] = useState('');

    // validation
    const [depErrMsg, setDepErrMsg] = useState('');
    const [teacherErrMsg, setTeacherErrMsg] = useState('');
    const [subjectErrMsg, setSubjectErrMsg] = useState('');
    const [loadingStatus, setLoadingStatus] = useState(false);
    const [generateLoadingStatus, setGenerateLoadingStatus] = useState(false);

    // Snakbar
    const [open, setOpen] = useState(false);
    const [transition, setTransition] = useState(undefined);
    const [errorOpen, setErrorOpen] = useState(false);
    const [snackbarSuccessMsg, setSnackbarSuccessMsg] = useState('');
    const [snackbarFailMsg, setSnackbarFailMsg] = useState('');

    useEffect(() => {
        handleDeptFetch();
    }, [])

    const handleDeptFetch = async () => {
        try {
            const response = await axios.get('http://localhost:3500/departments');
            setDepartmentData(response.data);
        } catch (error) {
            setTransition(TransitionUp);
            setErrorOpen(true);
            setSnackbarFailMsg('Error fetching departments!');
        }
    }

    const handleDeptChange = async (event) => {
        try {
            setDepartment(event.target.value);
            fetchTeacherData(event.target.value);

            const selectedDepartment = departmentData.find(
                (item) => item.department === event.target.value
            )

            if (selectedDepartment) {
                setFaculty(selectedDepartment.faculty);
            }

        } catch (error) {
            setTransition(TransitionUp);
            setErrorOpen(true);
            setSnackbarFailMsg('Error selecting department!');
        }
    }

    const fetchTeacherData = async (departmentValue) => {
        try {
            const response = await axios.get('http://localhost:3500/teachers/get-techers-by-dept', {
                params: {
                    department: departmentValue
                }
            });

            setTeacherData(response.data);
        } catch (error) {
            setTransition(TransitionUp);
            setErrorOpen(true);
            setSnackbarFailMsg('Error fetching teacher record!');
        }
    }

    const handleTeacherChange = async (event) => {

        try {
            setTeacher(event.target.value);

            const selectedTeacher = teacherData.find((item) => item.name === event.target.value);

            if (selectedTeacher) {
                await fetchSubjectData(selectedTeacher.t_id);
            }

        } catch (error) {
            setTransition(TransitionUp);
            setErrorOpen(true);
            setSnackbarFailMsg('Error selecting teacher!');
        }
    };

    const fetchSubjectData = async (teacherId) => {
        try {
            const response = await axios.get(`http://localhost:3500/subjects/by-teacher-id/${teacherId}`);
            setSubjectData(response.data);
        } catch (error) {
            setTransition(TransitionUp);
            setErrorOpen(true);
            setSnackbarFailMsg('Error fetching subject record!');
        }
    }

    const handleSubjectChange = async (event) => {

        try {
            setSubject(event.target.value);

            const selectedSubject = subjectData.find((item) => item.subject === event.target.value);

            if (selectedSubject) {
                setSubjectId(selectedSubject.sub_id);
                setSemester(selectedSubject.semester);
            }

        } catch (error) {
            setTransition(TransitionUp);
            setErrorOpen(true);
            setSnackbarFailMsg('Error selecting subject!');
        }
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        let isFormDirty = false;

        if (department === undefined || department.trim() === '') {
            setDepErrMsg('Select department');
            isFormDirty = true;
        } else {
            setDepErrMsg('');
        }

        if (teacher === undefined || teacher.trim() === '') {
            setTeacherErrMsg('Select teacher');
            isFormDirty = true;
        } else {
            setTeacherErrMsg('');
        }

        if (subject === undefined || subject.trim() === '') {
            setSubjectErrMsg('Select subject');
            isFormDirty = true;
        } else {
            setSubjectErrMsg('');
        }

        if (!isFormDirty) {
            setLoadingStatus(true);

            try {
                const response = await axios.get('http://localhost:3500/answers/get-searched-answers', {
                    params: {
                        subjectId: subjectId
                    }
                });

                setAnswersList(response.data);
                setLoadingStatus(false);

            } catch (error) {
                setLoadingStatus(false);

                setTransition(TransitionUp);
                setErrorOpen(true);
                setSnackbarFailMsg('Error creating evaluation report!');
            }
        }
    }

    const columns = [
        { field: 'number', headerName: 'No.', width: 75 },
        { field: 'question', headerName: 'Question', width: 540 },
        { field: 'yes', headerName: 'Yes', width: 120 },
        { field: 'somewhat', headerName: 'Somewhat', width: 120 },
        { field: 'no', headerName: 'No', width: 120 },
    ];

    const rows = answersList ? answersList.map((answer, idnex) => ({
        number: idnex + 1,
        id: answer.answer_id,
        question: answer.question,
        yes: answer.good,
        no: answer.bad,
        somewhat: answer.ok,
    })) : [];

    const handleGenerateDoc = async () => {
        let isFormDirty = false;

        if (department === undefined || department.trim() === '') {
            setDepErrMsg('Select department');
            isFormDirty = true;
        } else {
            setDepErrMsg('');
        }

        if (teacher === undefined || teacher.trim() === '') {
            setTeacherErrMsg('Select teacher');
            isFormDirty = true;
        } else {
            setTeacherErrMsg('');
        }

        if (subject === undefined || subject.trim() === '') {
            setSubjectErrMsg('Select subject');
            isFormDirty = true;
        } else {
            setSubjectErrMsg('');
        }

        if (!isFormDirty) {
            setGenerateLoadingStatus(true);

            try {
                const response = await axios.get('http://localhost:3500/answers/create-answers-sheet', {
                    params: {
                        department: department,
                        faculty: faculty,
                        teacher: teacher,
                        subject: subject,
                        subjectId: subjectId,
                        semester: semester
                    },
                    responseType: 'blob',  // Set the response type to 'blob' to receive binary data
                });

                const blob = new Blob([response.data], { type: 'application/pdf' });
                // Create a URL for the Blob
                const url = URL.createObjectURL(blob);

                // If you want to offer the PDF as a download link
                // You can create an anchor tag with the blob URL and trigger a click event
                const a = document.createElement('a');
                a.href = url;
                a.download = `teacher-${teacher}-${subject}-evaluation.pdf`;
                a.click();

                setGenerateLoadingStatus(false);
            } catch (error) {
                setGenerateLoadingStatus(false);

                setTransition(TransitionUp);
                setErrorOpen(true);
                setSnackbarFailMsg('Error generating evaluation reports!');
            }
        }
    };


    return (
        <>
            <div className="dashboard-index">
                <Sidebar />
                <div className="content">
                    <Navbar title='Answers List' landingPage={false} />
                    <div className="students-page">
                        <div className="search-bar">
                            <form onSubmit={handleFormSubmit}>
                                <Box sx={{ minWidth: 120 }} className='form-row'>
                                    <FormControl className='form-group'>
                                        <InputLabel id="simple-select-label-department">Select Dept.</InputLabel>
                                        <Select
                                            labelId="simple-select-label-department"
                                            id="department-simple-select"
                                            value={department}
                                            onChange={handleDeptChange}
                                            label="Department"
                                            error={depErrMsg && depErrMsg.length > 0 ? true : false}
                                        >
                                            {departmentData.length > 0 ? (
                                                departmentData.map((row) => (
                                                    <MenuItem key={row.dep_id} value={row.department}>
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
                                        <InputLabel id="simple-select-label-teacher">Teacher</InputLabel>
                                        <Select
                                            labelId="simple-select-label-teacher"
                                            id="teacher-simple-select"
                                            label="teacher"
                                            value={teacher}
                                            onChange={handleTeacherChange}
                                            error={teacherErrMsg && teacherErrMsg.length > 0 ? true : false}
                                        >
                                            {teacherData.length > 0 ? (
                                                teacherData.map((row) => (
                                                    <MenuItem key={row.t_id} value={row.name}>
                                                        {row.name}
                                                    </MenuItem>
                                                ))
                                            ) : (
                                                <MenuItem value="">No teacher found</MenuItem>
                                            )}
                                        </Select>
                                        <span style={{ display: 'block', height: '1rem', marginBottom: '-1.25rem' }} className='error-alert'>{teacherErrMsg && teacherErrMsg.length > 0 ? teacherErrMsg : null}</span>
                                    </FormControl>

                                    <FormControl className='form-group'>
                                        <InputLabel id="simple-select-label-subject">Subject</InputLabel>
                                        <Select
                                            labelId="simple-select-label-subject"
                                            id="subject-simple-select"
                                            label="subject"
                                            value={subject}
                                            onChange={handleSubjectChange}
                                            error={subjectErrMsg && subjectErrMsg.length > 0 ? true : false}
                                        >
                                            {subjectData.length > 0 ? (
                                                subjectData.map((row) => (
                                                    <MenuItem key={row.sub_id} value={row.subject}>
                                                        {row.subject}
                                                    </MenuItem>
                                                ))
                                            ) : (
                                                <MenuItem value="">No subject found</MenuItem>
                                            )}
                                        </Select>
                                        <span style={{ display: 'block', height: '1rem', marginBottom: '-1.25rem' }} className='error-alert'>{subjectErrMsg && subjectErrMsg.length > 0 ? subjectErrMsg : null}</span>
                                    </FormControl>

                                    <div style={{ marginTop: '-1.5rem', width: '100%' }} className="form-group form-submit">
                                        <button type="submit" style={{ width: '100%' }}>
                                            {loadingStatus ? <CircularProgress style={{ height: '24px', width: '24px', color: '#fff', marginRight: '4px' }} /> : <SearchIcon className='icon' />}Search
                                        </button>
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
                            </form>

                            <div className="generate-doc" style={answersList && answersList.length > 0 ? { display: 'block' } : { display: 'none' }}>
                                <button onClick={handleGenerateDoc}>
                                    {generateLoadingStatus ? (
                                        <CircularProgress style={{ width: '1.25rem', height: '1.25rem' }} className='icon' />
                                    ) : (
                                        <NoteAddIcon className='icon' />
                                    )}
                                    Generate File
                                </button>
                            </div>

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
                    </div>
                </div>
            </div >
        </>
    );
};

export default Answers;
