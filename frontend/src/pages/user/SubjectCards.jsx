import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import TaskIcon from '@mui/icons-material/Task';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Navbar from '../../components/user/Navbar';
import Footer from '../../components/user/Footer';
import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import AnswersModal from '../../components/user/AnswersModal';

const SubjectCards = () => {
    const [subjectData, setSubjectData] = useState([]);
    const [evaluationStatus, setEvaluationStatus] = useState([]);
    const [modalVisibility, setModalVisibility] = useState(false);
    const [answers, setAnswers] = useState([]);
    const [teacher, setTeacher] = useState('');
    const [subject, setSubject] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3500/subject-cards');
            setSubjectData(response.data.subCards);
            setEvaluationStatus(response.data.subEvaluationStatus); // Parse the JSON object directly
        } catch (error) {
            console.log('Error fetching data: ', error);
        }
    };

    const fetchAnswers = async (subjectId, subject) => {
        try {
            const response = await axios.get(`http://localhost:3500/answers/get-answers-by-subjectId/${subjectId}`);
            setAnswers(response.data.answers);
            setSubject(subject);
            setModalVisibility(!modalVisibility);
        } catch (error) {
            console.error("Error fetching answers:", error);
        }
    }

    const handleModalVisibility = () => {
        setModalVisibility(false);
    }

    return (
        <>
            <Navbar />
            <div className="sub-card-wrapper">
                <div className="sub-card">
                    <h1>Spring Semester, 2023</h1>
                    <div className="row">
                        {subjectData.map((item) => (
                            <div className="card" key={item.sub_id}>
                                <div className="header">
                                    <h5 className="subject">{item.subject}</h5>
                                    <h6 className="faculty">{item.faculty}</h6>
                                </div>
                                <div className="body">
                                    <span className="status-icon">
                                        {evaluationStatus.find((subItem) => subItem.subject_id === item.sub_id && subItem.status === 1) ? <CheckCircleIcon /> : <HourglassTopIcon />}
                                    </span>
                                </div>
                                <div className="seperator"></div>
                                <div className="footer">
                                    {
                                        evaluationStatus.find((subItem) => subItem.subject_id === item.sub_id && subItem.status === 0) ?
                                            <Link to={`/evaluation-form/${item.sub_id}`} className="see" data-tooltip-id="evaluate-teacher" data-tooltip-content="Evaluate Teacher" data-tooltip-place="top"><EditIcon /> <Tooltip id='evaluate-teacher' /></Link> :
                                            <div className='see' onClick={() => fetchAnswers(item.sub_id, item.subject)} data-tooltip-id="view-answers" data-tooltip-content="View Answers" data-tooltip-place="top"><VisibilityIcon /> <Tooltip id='view-answers' /> </div>
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {modalVisibility ? <AnswersModal data={answers} subject={subject} handleVisibility={handleModalVisibility} /> : null}
            </div >
            <Footer />
        </>
    );
};

export default SubjectCards;
