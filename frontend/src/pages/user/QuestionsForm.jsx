import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Navbar from '../../components/user/Navbar';
import Footer from '../../components/user/Footer';
import { useParams } from "react-router-dom";
import FailToast from "../../components/user/FailToast";


const QuestionsForm = () => {
    const { id } = useParams();
    const [questions, setQuestions] = useState([]);
    const [subjectData, setSubjectData] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [validationMsg, setValidationMsg] = useState("");
    // New state for tracking submit button click
    const [isSubmitButtonClicked, setIsSubmitButtonClicked] = useState(false);
    const [errorMessage, setErrorMessage] = useState({
        visibility: false,
        message: ''
    });

    // for dynamic redirection
    const navigate = useNavigate();

    const nextBtnStyle = {
        display: currentQuestionIndex === 14 ? 'none' : 'flex',
    };

    const submitBtnStyle = {
        display: currentQuestionIndex === 14 ? 'flex' : 'none',
    };

    const reviewListStyle = {
        display: currentQuestionIndex === 14 ? 'block' : 'none',
    };

    const fetchSubjectData = async (id) => {
        try {
            const response = await axios.get(`http://localhost:3500/subjects/${id}`);
            setSubjectData(response.data[0]);
        } catch (error) {
            console.log('Error fetching subject data: ' + error);
            setErrorMessage({ visibility: true, message: 'An error happened while fetching data. Please reload the page!' });
        }
    };

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3500/questions');
            setQuestions(response.data);
        } catch (error) {
            console.log('Fetch Questions Error: ' + error);
            setErrorMessage({ visibility: true, message: 'An error happened while fetching data. Please reload the page!' });
        }
    }

    useEffect(() => {
        fetchData();
        fetchSubjectData(id);
    }, [id]);

    if (questions.length === 0) {
        return (
            <div>Loading Subjects...</div>
        );

    }

    const handleCheckOption = (e) => {
        try {
            setSelectedOptions((prevSelectedOptions) => ({
                ...prevSelectedOptions,
                [e.target.name]: e.target.value
            }));

        } catch (error) {
            console.log('Error Handling Radio select: ' + error);
            setErrorMessage({ visibility: true, message: 'An error happened while selecting an option. Please try again!' });
        }
    }

    const handleNextBtn = () => {

        if (!selectedOptions.hasOwnProperty(questions[currentQuestionIndex].q_id)) {
            setValidationMsg("Please select an option to move to the next question!");
            return;
        }

        if (currentQuestionIndex !== 14) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setValidationMsg("");
        }
    }

    const handlePreviousBtn = () => {
        if (currentQuestionIndex !== 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSubmitButtonClicked) {
            setIsSubmitButtonClicked(false); // Reset the flag

            try {
                const response = await axios.post('http://localhost:3500/answers', {
                    answers: selectedOptions,
                    subjectId: id
                });

                if (response.status === 201) {
                    navigate(`/evaluation-success/${id}`);
                } else {
                    console.log("Failed to submit evaluation form!");
                    setErrorMessage({ visibility: true, message: 'An error happened while submitting the form. Please try again!' });
                }

            } catch (error) {
                console.log('Error submit form: ' + error);
                setErrorMessage({ visibility: true, message: 'An error happened while submitting the form. Please try again!' });
            }
        }
    }

    // Render the questions
    return (
        <>
            <Navbar />
            <div className="question-form">
                <FailToast data={errorMessage} />
                <div className="header">
                    <div key={subjectData.sub_id}>
                        <h5>{subjectData.subject}</h5>
                        <div className="row">
                            <div className="left">{subjectData.department} - {subjectData.faculty}</div>
                            <div className="right">Question {currentQuestionIndex <= 13 ? currentQuestionIndex + 1 : 14} of 14</div>
                        </div>
                    </div>
                </div>

                <div style={reviewListStyle} className="answers-review">
                    <h3>Evaluation Form Review</h3>
                    <table>
                        <thead>
                            <tr>
                                <th className="number">No.</th>
                                <th>Question</th>
                                <th className="selected">Selected</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(selectedOptions).map(([key, value], index) => (
                                <tr key={key}>
                                    <td>{index + 1}</td>
                                    <td>{questions[index].question}</td>
                                    <td>{value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={nextBtnStyle} className="body">
                        <div className="question-div">
                            <div className="question">
                                <p>
                                    <span>{currentQuestionIndex + 1}.</span> {currentQuestionIndex < 14 ? questions[currentQuestionIndex].question : null}
                                </p>
                                <span className="validation-alert">{validationMsg}</span>
                            </div>

                            <div className="row">
                                <div className="input-group">
                                    <label className="wrapper">
                                        <input
                                            name={currentQuestionIndex <= 13 ? questions[currentQuestionIndex].q_id : questions[13].q_id}
                                            type="radio"
                                            value="Yes"
                                            checked={currentQuestionIndex <= 13 ? ((selectedOptions.hasOwnProperty(questions[currentQuestionIndex].q_id) && selectedOptions[questions[currentQuestionIndex].q_id] === "Yes") ? true : false) : false}
                                            onChange={handleCheckOption}
                                        />
                                        <span>Yes</span>
                                    </label>
                                </div>
                                <div className="input-group">
                                    <label className="wrapper">
                                        <input
                                            name={currentQuestionIndex <= 13 ? questions[currentQuestionIndex].q_id : questions[13].q_id}
                                            type="radio"
                                            value="Somewhat"
                                            checked={currentQuestionIndex <= 13 ? ((selectedOptions.hasOwnProperty(questions[currentQuestionIndex].q_id) && selectedOptions[questions[currentQuestionIndex].q_id] === "Somewhat") ? true : false) : false}
                                            onChange={handleCheckOption}
                                        />
                                        <span>Somewhat</span>
                                    </label>
                                </div>
                                <div className="input-group">
                                    <label className="wrapper">
                                        <input
                                            name={currentQuestionIndex <= 13 ? questions[currentQuestionIndex].q_id : questions[13].q_id}
                                            type="radio"
                                            value="No"
                                            checked={currentQuestionIndex <= 13 ? ((selectedOptions.hasOwnProperty(questions[currentQuestionIndex].q_id) && selectedOptions[questions[currentQuestionIndex].q_id] === "No") ? true : false) : false}
                                            onChange={handleCheckOption}
                                        />
                                        <span>No</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <input type="hidden" name="subjectId" value={id} />
                    <div className="navigation-btns">
                        <button className="prev" disabled={currentQuestionIndex === 0 ? true : false} onClick={handlePreviousBtn}>< ArrowBackIosNewIcon className='icon' /> Previous</button>
                        <button style={nextBtnStyle} className="next" onClick={handleNextBtn}>Next <ArrowForwardIosIcon className='icon' /></button>
                        <button style={submitBtnStyle} type="submit" className="form-submit" onClick={() => setIsSubmitButtonClicked(true)} >Submit</button>
                    </div>
                </form>
            </div >
            <Footer />
        </>
    );
};

export default QuestionsForm;
