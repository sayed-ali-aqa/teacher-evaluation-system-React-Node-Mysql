import React, { useState } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import Navbar from '../../components/admin/Navbar';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbars, { TransitionUp } from '../../components/admin/Snackbars';

const AddQuestion = () => {

    const [question, setQuestion] = useState('');

    // Snakbar
    const [open, setOpen] = useState(false);
    const [transition, setTransition] = useState(undefined);
    const [errorOpen, setErrorOpen] = useState(false);
    const [snackbarSuccessMsg, setSnackbarSuccessMsg] = useState('');
    const [snackbarFailMsg, setSnackbarFailMsg] = useState('');

    // validation states
    const [questionErrMsg, setQuestionErrMsg] = useState('');
    const [loadingStatus, setLoadingStatus] = useState(false);


    const handleQuestionChange = (event) => {
        setQuestion(event.target.value);
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!question || question.trim() === '') {
            setQuestionErrMsg("Question is required");
        }else if (!isNaN(parseFloat(question)) && isFinite(question)) {
            setQuestionErrMsg("Question cannot be a number");
        }else if (question.length > 250) {
            setQuestionErrMsg(`Question should be less than 250 characters`);
        }
        else {
            setQuestionErrMsg('');
            setLoadingStatus(true);

            try {
                const response = await axios.post('http://localhost:3500/questions/new', {
                    question: question
                });

                setLoadingStatus(false);

                if (response.data.success === false && response.data.statusCode === 200) {
                    setQuestionErrMsg(response.data.msg);
                } else if (response.data.success === true && response.data.statusCode === 201) {
                    setTransition(TransitionUp);
                    setOpen(true);
                    setSnackbarSuccessMsg("Question record created successfully!");
                }
                else if (response.data.success === false && response.data.statusCode === 500) {
                    setTransition(TransitionUp);
                    setErrorOpen(true);
                    setSnackbarFailMsg("Error creating question record!");
                }

            } catch (error) {
                setLoadingStatus(false);

                setTransition(TransitionUp);
                setErrorOpen(true);
                setSnackbarFailMsg("Error creating question record!");
            }
        }
    };

    return (
        <>
            <div className="dashboard-index">
                <Sidebar />
                <div className="content">
                    <Navbar title='Add New Question' landingPage={false} />
                    <div className="edit-student">
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                            onSubmit={handleFormSubmit} // Add the onSubmit handler here
                        >
                            <div className="form-group" style={{ width: '100%' }}>
                                <TextField
                                    style={{ width: '100%' }}
                                    // required
                                    id="question"
                                    onChange={handleQuestionChange}
                                    label="Question"
                                    value={question}
                                    variant="outlined"
                                    error={questionErrMsg && questionErrMsg.length > 0 ? true : false}
                                    helperText={questionErrMsg}
                                />
                            </div>

                            <div className="form-submit">
                                <button type="submit">
                                    {loadingStatus ? <CircularProgress style={{ height: '24px', width: '24px', color: '#fff', marginRight: '4px' }} /> : <AddIcon className='icon' />} Add
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

                    </div>
                </div>
            </div>
        </>
    );
}


export default AddQuestion;