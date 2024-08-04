import React, { useState } from 'react';
import Navbar from '../../components/admin/Navbar';
import Sidebar from '../../components/admin/Sidebar';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbars, { TransitionUp } from '../../components/admin/Snackbars';

const AddFaculty = () => {

    const [faculty, setFaculty] = useState('');

    // Snakbar
    const [open, setOpen] = useState(false);
    const [transition, setTransition] = useState(undefined);
    const [errorOpen, setErrorOpen] = useState(false);
    const [snackbarSuccessMsg, setSnackbarSuccessMsg] = useState('');
    const [snackbarFailMsg, setSnackbarFailMsg] = useState('');

    // validation states
    const [facultyErrMsg, setFacultyErrMsg] = useState('');
    const [loadingStatus, setLoadingStatus] = useState(false);

    const handleFaculty = (event) => {
        setFaculty(event.target.value);
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!faculty || faculty.trim() === '') {
            setFacultyErrMsg('Faculty is required');
        } else if (!isNaN(parseFloat(faculty)) && isFinite(faculty)) {
            setFacultyErrMsg('Faculty cannot be number');
        } else if (faculty.length > 100) {
            setFacultyErrMsg('Faculty should be less than 100 chracters');
        } else {
            setFacultyErrMsg('');
            setLoadingStatus(true);

            try {
                const response = await axios.post('http://localhost:3500/faculties/new', {
                    faculty: faculty
                });

                setLoadingStatus(false);

                if (response.data.success === false && response.data.statusCode === 200) {
                    setFacultyErrMsg(response.data.msg);
                } else if (response.data.success === true && response.data.statusCode === 201) {
                    setTransition(TransitionUp);
                    setOpen(true);
                    setSnackbarSuccessMsg("Faculty record created successfully!");
                }
                else if (response.data.success === false && response.data.statusCode === 500) {
                    setTransition(TransitionUp);
                    setErrorOpen(true);
                    setSnackbarFailMsg("Error creating faculty record!");
                }
                
            } catch (error) {
                console.log(error);
                setLoadingStatus(false);

                setTransition(TransitionUp);
                setErrorOpen(true);
                setSnackbarFailMsg('Error creating faculty record!');
            }
        }
    }

    return (
        <>
            <div className="dashboard-index">
                <Sidebar />
                <div className="content">
                    <Navbar title='Add New Faculty' landingPage={false} />
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
                                        id="faculty"
                                        name='faculty'
                                        onChange={handleFaculty}
                                        label="New faculty"
                                        value={faculty}
                                        variant="outlined"
                                        error={facultyErrMsg && facultyErrMsg.length > 0 ? true : false}
                                        helperText={facultyErrMsg} />
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
            </div >
        </>
    );

}


export default AddFaculty;
