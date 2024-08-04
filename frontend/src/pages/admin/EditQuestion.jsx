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

const EditQuestion = () => {
    const { id } = useParams();

    // Snakbar
    const [open, setOpen] = useState(false);
    const [transition, setTransition] = useState(undefined);
    const [errorOpen, setErrorOpen] = useState(false);
    const [snackbarSuccessMsg, setSnackbarSuccessMsg] = useState('');
    const [snackbarFailMsg, setSnackbarFailMsg] = useState('');

    // validation states
    const [questionErrMsg, setQuestionErrMsg] = useState('');
    const [loadingStatus, setLoadingStatus] = useState(false);

    // default values
    const [question, setQuestion] = useState('');

    // Include 'id' in the dependency array to re-run the effect when it changes
    useEffect(() => {
        fetchQuestionData(id);
    }, [id])

    const fetchQuestionData = async (id) => {
        try {
            const response = await axios.get(`http://localhost:3500/questions/${id}`);
            setQuestion(response.data[0].question);
        } catch (error) {
            setTransition(TransitionUp);
            setErrorOpen(true);
            setSnackbarFailMsg('Error fetching question record!');
        }
    }

    const handleQuestionChange = (event) => {
        setQuestion(event.target.value);
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!question || question.trim() === '') {
            setQuestionErrMsg("Question is required");
        } else if (!isNaN(parseFloat(question)) && isFinite(question)) {
            setQuestionErrMsg("Question cannot be a number");
        } else if (question.length > 250) {
            setQuestionErrMsg('Question should be less than 250 characters');
        } 
        else {
            setLoadingStatus(true);

            try {
                const response = await axios.patch(`http://localhost:3500/questions/${id}`, {
                    question: question
                });
                setLoadingStatus(false);

                if (response.data.success === false && response.data.statusCode === 200) {
                    setQuestionErrMsg(response.data.msg);
                } else if (response.data.success === true && response.data.statusCode === 201) {
                    setTransition(TransitionUp);
                    setOpen(true);
                    setSnackbarSuccessMsg("Question record updated successfully!");
                }
                else if (response.data.success === false && response.data.statusCode === 500) {
                    setTransition(TransitionUp);
                    setErrorOpen(true);
                    setSnackbarFailMsg("Error updating question record!");
                }

            } catch (error) {
                setLoadingStatus(false);

                setTransition(TransitionUp);
                setErrorOpen(true);
                setSnackbarFailMsg('Error updating question record!');
            }
        }

    }

    return (
        <>
            <div className="dashboard-index">
                <Sidebar />
                <div className="content">
                    <Navbar title='Edit Question' landingPage={false} />
                    <div className="edit-student">
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <div className="form-group" style={{ width: '100%' }}>
                                <TextField
                                    style={{ width: '100%' }}
                                    required id="question"
                                    onChange={handleQuestionChange}
                                    label="Question" value={question}
                                    variant="outlined"
                                    error={questionErrMsg && questionErrMsg.length > 0 ? true : false}
                                    helperText={questionErrMsg} />
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


export default EditQuestion;