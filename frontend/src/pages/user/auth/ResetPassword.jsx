import React, { useState } from 'react';
import Navbar from '../../../components/user/Navbar';
import Footer from '../../../components/user/Footer';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


const ResetPassword = () => {

    const [passVisibility, setPassVisibility] = useState(false);
    const [confPassVisibility, setConfPassVisibility] = useState(false);

    const togglePassVisibility = () => {
        setPassVisibility(!passVisibility);
    }

    const toggleConfPassVisibility = () => {
        setConfPassVisibility(!confPassVisibility);
    }

    return (
        <>
            <Navbar />
            <div className='reset-pass-wrapper'>
                <h1>Reset Password</h1>
                <div className="row">
                    <div className="form-group">
                        <div className='info'>New Password<span>*</span> (required)</div>
                        <input type={passVisibility ? 'text' : 'password'} name="newPassword" placeholder='New Password' />

                        <div className="password-toggle" onClick={() => togglePassVisibility()}>
                            {passVisibility ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </div>
                    </div>
                    <div className="form-group">
                        <div className='info'>Comfirm New Password<span>*</span> (required)</div>
                        <input type={confPassVisibility ? 'text' : 'password'} name="confirmPassword" placeholder='Comfirm New Password' />
                        <div className="password-toggle" onClick={() => toggleConfPassVisibility()}>
                            {confPassVisibility ? <VisibilityOffIcon /> : < VisibilityIcon />}
                        </div>
                    </div>

                    <div className="form-group">
                        <button type='submit'>Reset</button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default ResetPassword;