import React, { useState } from 'react'
import Navbar from '../../../components/user/Navbar';
import Footer from '../../../components/user/Footer';
import login from '../../../assets/images/auth/login.svg';
import logo from '../../../assets/images/logo/logo.png';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Cookies from 'js-cookie';


const Login = () => {

    const [passVisibility, setPassVisibility] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const Navigate = useNavigate();
    const [loadingStatus, setLoadingStatus] = useState(false);

    // validation
    const [invalidCredential, setInvalidCredential] = useState('');
    const [usernameErrMsg, setUsernameErrMsg] = useState('');
    const [passwordErrMsg, setPasswordErrMsg] = useState('');

    const togglePassVisibility = () => {
        setPassVisibility(!passVisibility);
    }

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        let isFormDirty = false;

        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (username === undefined || username.trim() === '') {
            setUsernameErrMsg('Email is required');
            isFormDirty = true;
        } else if (emailPattern.test(username) === false) {
            setUsernameErrMsg('Invalid Email format');
            isFormDirty = true;
        } else {
            isFormDirty = false;
            setUsernameErrMsg('');
        }

        if (password === undefined || password.trim() === '') {
            setPasswordErrMsg('Password is required');
            isFormDirty = true;
        } else {
            isFormDirty = false;
            setPasswordErrMsg('');
        }

        if (!isFormDirty) {
            setLoadingStatus(true);

            try {
                const response = await axios.post('http://localhost:3500/auth/user', {
                    authData: {
                        username: username,
                        password: password
                    }
                })

                const token = response.data.token;

                // Calculate the expiration date (one month from the current time)
                const expirationDate = new Date();
                expirationDate.setMonth(expirationDate.getMonth() + 1);

                // Set a cookie with a name 'token' and the token value, and set the expiration date
                Cookies.set('token', token, { expires: expirationDate });

                setLoadingStatus(false);

                // Redirect or perform any other actions after successful login
                Navigate('/subjects');

            } catch (error) {
                setLoadingStatus(false);
                if (error.response.status === 401) {
                    setInvalidCredential('Invalid ussername or password');
                }
                else if (error.response.status === 500) {
                    setInvalidCredential('Authentication failed');
                } else {
                    setInvalidCredential('');
                }
            }
        }
    }

    return (
        <>
            <Navbar />
            <div className='login'>
                <div className="left">
                    <img src={login} alt="Login page icon" />
                </div>
                <div className="right">
                    <img src={logo} alt="University Logo" />
                    <h1>Login As a Student</h1>

                    <span className='error-alert' style={{ textAlign: 'center', marginBottom: '-1rem', marginTop: '1rem', fontSize: '1rem' }}>{invalidCredential && invalidCredential.length > 0 ? invalidCredential : null}</span>

                    <form onSubmit={handleLoginSubmit} method="post">
                        <div className="row">
                            <div className="input-group">
                                <span>Email Address</span>
                                <input
                                    type="email"
                                    name="email"
                                    onChange={handleUsernameChange}
                                    placeholder='Email Address'
                                    style={usernameErrMsg && usernameErrMsg.length > 0 ? ({ borderColor: '#d32f2f' }) : null}
                                />

                                <EmailIcon className="left-icon" />
                            </div>

                            <span className='error-alert' style={{ marginBottom: '-0.25rem', marginTop: '-0.75rem' }}>{usernameErrMsg && usernameErrMsg.length > 0 ? usernameErrMsg : null}</span>

                            <div className="input-group">
                                <span>Password</span>
                                <input
                                    type={passVisibility ? 'text' : 'password'}
                                    name="password"
                                    onChange={handlePasswordChange}
                                    placeholder='Password'
                                    style={passwordErrMsg && passwordErrMsg.length > 0 ? ({ borderColor: '#d32f2f' }) : null}
                                />

                                <LockIcon className="left-icon" />
                                <div className="password-toggle" onClick={() => togglePassVisibility()}>
                                    {passVisibility ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                </div>
                            </div>

                            <span className='error-alert' style={{ marginBottom: '-0.25rem', marginTop: '-0.75rem' }}>{passwordErrMsg && passwordErrMsg.length > 0 ? passwordErrMsg : null}</span>

                            <div className="input-group">
                                <button onClick={handleLoginSubmit} type="submit">{loadingStatus ? <CircularProgress style={{ height: '32px', width: '32px', marginLeft: 'auto', marginRight: 'auto' }} /> : "Login"}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Login;
