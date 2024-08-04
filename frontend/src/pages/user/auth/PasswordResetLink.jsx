import React from 'react'
import Navbar from '../../../components/user/Navbar';
import Footer from '../../../components/user/Footer';
import EmailIcon from '@mui/icons-material/Email';

const PasswordResetLink = () => {
    return (
        <>
            <Navbar />
            <div className="reset-link">
                <h1>Password Reset</h1>
                <p>To reset your passowrd, please enter your email and a link will be sent to your email. If you could not see the email, please check the spam folder.</p>

                <div className="row">
                    <div className="input-group">
                        <div className='info'>Email Address<span>*</span> (required)</div>
                        <input type="email" name="email" placeholder='Email Address' />
                        <EmailIcon className="left-icon" />
                    </div>
                    <div className="input-group">
                        <button type='submit'>Continue</button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default PasswordResetLink;