import React from 'react'
import Navbar from '../../components/user/Navbar';
import Footer from '../../components/user/Footer';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RateReviewIcon from '@mui/icons-material/RateReview';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useParams } from 'react-router-dom';

const EvaluationComplete = () => {
    const { id } = useParams();

    return (
        <>
            <Navbar />
            <div className="evaluation-success">
                <div className="icon-wrapper">
                    <CheckCircleIcon className="icon" />
                </div>
                <h1>Success</h1>
                <p>Thank you for submitting the evaluation form successfully!</p>
                <div className="suggestion-msg">
                    <span>If you have any suggestions regarding the subject you submitted the form for, click the 'Write Suggestion' button below to be redirected to the suggestion page.</span>
                </div>
                <div className="actions">
                    <Link className='write-suggestion' to={`/evaluation-form/suggestion/${id}`}><RateReviewIcon className='icon' /> Write Suggestion</Link>
                    <Link className='back-home' to='/subjects'><ArrowBackIcon className='icon' /> Back to Home</Link>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default EvaluationComplete;