import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const SuccessToast = ({ data, handleNavigation }) => {

    const [toastVisbility, setToastVisbility] = useState(data.visibility);

    useEffect(() => {
        setToastVisbility(data.visibility);
    }, [data.visibility])

    const handleToHomeBtn = () => {
        setToastVisbility(false);
        // call parent function
        handleNavigation();
    }

    return (
        <>
            <div className="toast-wrapper" style={toastVisbility ? { display: 'flex' } : { display: 'none' }}>
                <div className="success-top">
                    <CheckCircleIcon className='icon' />
                </div>
                <div className="bottom">
                    <div className="info">
                        <h3>Success</h3>
                        <p>{data.message}</p>
                    </div>
                    <div className="success-action">
                        <button onClick={handleToHomeBtn}><ArrowBackIcon className='icon' /> Back to Home</button>
                    </div>
                </div>
            </div >
        </>
    )
}

export default SuccessToast;