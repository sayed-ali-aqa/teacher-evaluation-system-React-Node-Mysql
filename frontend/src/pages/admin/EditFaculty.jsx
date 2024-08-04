import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar';
import Navbar from '../../components/admin/Navbar';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbars, { TransitionUp } from '../../components/admin/Snackbars';

const EditFaculty = () => {
    const { id } = useParams();

    // Snakbar
    const [open, setOpen] = useState(false);
    const [transition, setTransition] = useState(undefined);
    const [errorOpen, setErrorOpen] = useState(false);
    const [snackbarSuccessMsg, setSnackbarSuccessMsg] = useState('');
    const [snackbarFailMsg, setSnackbarFailMsg] = useState('');

    // validation states
    const [facultyErrMsg, setFacultyErrMsg] = useState('');
    const [loadingStatus, setLoadingStatus] = useState(false);

    // default values
    const [faculty, setFaculty] = useState("");

    // Include 'id' in the dependency array to re-run the effect when it changes
    useEffect(() => {
        fetchFacultyData(id);
    }, [id])

    const fetchFacultyData = async (id) => {
        try {
            const response = await axios.get(`http://localhost:3500/faculties/${id}`);
            setFaculty(response.data[0].faculty);
        } catch (error) {
            setTransition(TransitionUp);
            setErrorOpen(true);
            setSnackbarFailMsg('Error fetching faculty record!');
        }
    }

    const handleFacultyChange = (event) => {
        setFaculty(event.target.value);
    };

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
                const response = await axios.patch(`http://localhost:3500/faculties/${id}`, {
                    faculty: faculty
                });
                setLoadingStatus(false);

                if (response.data.success === false && response.data.statusCode === 200) {
                    setFacultyErrMsg(response.data.msg);
                } else if (response.data.success === true && response.data.statusCode === 201) {
                    setTransition(TransitionUp);
                    setOpen(true);
                    setSnackbarSuccessMsg("Faculty record updated successfully!");
                }
                else if (response.data.success === false && response.data.statusCode === 500) {
                    setTransition(TransitionUp);
                    setErrorOpen(true);
                    setSnackbarFailMsg("Error updating faculty record!");
                }

            } catch (error) {
                setLoadingStatus(false);

                setTransition(TransitionUp);
                setErrorOpen(true);
                setSnackbarFailMsg('Error updating faculty record!');
            }
        }

    }

    return (
        <>
            <div className="dashboard-index">
                <Sidebar />
                <div className="content">
                    <Navbar title='Edit Faculty information' landingPage={false} />
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
                                        onChange={handleFacultyChange}
                                        label="faculty"
                                        value={faculty}
                                        variant="outlined"
                                        error={facultyErrMsg && facultyErrMsg.length > 0 ? true : false}
                                        helperText={facultyErrMsg} />
                                </div>
                            </div>

                            <div className="form-submit" style={{ marginTop: '-1rem' }}>
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


export default EditFaculty;