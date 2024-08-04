import React, { useState } from "react";
import useFormContext from "../hooks/useFormContext";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


const Behavior = () => {
    const { questions } = useFormContext();

    const [checkedOption, setCheckedOption] = useState(0);

    const handleCheckRadio = (option) => {
        setCheckedOption(option);
    };

    if (questions.length === 0) {
        // Show loading message if questions are not yet loaded
        return <div>Loading...</div>;
    }

    // Render the questions
    return (
        <>
            <div className="question-form">
                <div className="header">
                    <h5>Artificial Intelligence</h5>
                    <div className="row">
                        <div className="left">Software Engineering - BCS</div>
                        <div className="right">Question 4 of 16</div>
                    </div>
                </div>

                <div className="body">
                    <div className="suggestion">
                        <label htmlFor="suggestion">Your suggestion</label>
                        <textarea resize='false' name='suggestion' placeholder='Type your suggestion here...'></textarea>
                    </div>

                    <div className="submit-div">
                        <button type='submit'>Submit Form</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Behavior;
