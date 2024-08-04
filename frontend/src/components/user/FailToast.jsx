import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CancelIcon from '@mui/icons-material/Cancel';
import CloseIcon from '@mui/icons-material/Close';

const FailToast = (props) => {

    const [toastVisbility, setToastVisbility] = useState(props.data.visibility);

    useEffect(()=>{
        setToastVisbility(props.data.visibility);
    }, [props.data.visibility])

    const handleCloseBtn = () => {
        setToastVisbility(false);
    }

    return (
        <>
            <div className="toast-wrapper" style={toastVisbility ? { display: 'flex' } : { display: 'none' }}>
                <div className="fail-top">
                    <CancelIcon className='icon' />
                </div>
                <div className="bottom">
                    <div className="info">
                        <h3>Fail</h3>
                        <p>{props.data.message}</p>
                    </div>
                    <div className="fail-action">
                        <button onClick={handleCloseBtn}><CloseIcon className='icon' /> Close</button >
                    </div>
                </div>
            </div >
        </>
    )
}

export default FailToast;