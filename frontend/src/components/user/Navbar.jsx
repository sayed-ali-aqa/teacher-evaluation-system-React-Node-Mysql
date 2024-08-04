import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from '../../assets/images/logo/logo.png';
import femaleAvatar from '../../assets/images/avatar/female-avatar.png';
import maleAvatar from '../../assets/images/avatar/male-avatar.png';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Link } from "react-router-dom";

const Navbar = () => {

    const [info, setInfo] = useState({});

    useEffect(() => {
        fetchInfo();
    }, []);

    const fetchInfo = async () => {
        try {
            const response = await axios.get('http://localhost:3500/students/info');
            setInfo(response.data[0]);
        } catch (error) {
            console.log('Fetch info error: ' + error);
        }
    }

    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);

    }

    const modalStatus = {
        opacity: modal ? 1 : 0,
        display: modal ? 'block' : 'none',
    }

    return (
        <nav>
            <Link className="logo-link" to='/'><div className="logo"><img src={logo} alt="University logo" /></div></Link>
            <div className="header-title">
                <h1>Ministry of Higher Education</h1>
                <h2>Khana-e Noor University</h2>
            </div>
            <div className="profile" onClick={() => toggleModal()}>
                {info.gender == "Female" ? <img src={femaleAvatar} alt="Female user profile avatar" /> : null}
                {info.gender == "Male" ? <img src={maleAvatar} alt="Male user profile avatar" /> : null}
                <div className="arrow-down">
                    <ArrowDropDownIcon />
                </div>

                <div className="modal" style={modalStatus}>
                    <div className="header">
                        <div className="left">
                            {info.gender == "Female" ? <img src={femaleAvatar} alt="Female user profile avatar" /> : null}
                            {info.gender == "Male" ? <img src={maleAvatar} alt="Male user profile avatar" /> : null}
                        </div>
                        <div className="right">
                            <div className="name">{info.name}</div>
                            <div className="action"><Link to='/user/profile'>View Profile</Link></div>
                        </div>
                    </div>
                    <hr />
                    <div className="body">
                        <Link to="/privacy-policy">Privacy & Policy</Link>
                        <Link to="/user/reset-password">Reset Password</Link>
                        <a to="#"><LogoutIcon className="logout-icon" /> Logout</a>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;