import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../../assets/images/logo/logo.png';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import maleAvatar from '../../assets/images/avatar/male-avatar.png';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Tooltip } from 'react-tooltip';
import GroupIcon from '@mui/icons-material/Group';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import BusinessIcon from '@mui/icons-material/Business';
import ApartmentIcon from '@mui/icons-material/Apartment';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import QuizIcon from '@mui/icons-material/Quiz';
import FactCheckIcon from '@mui/icons-material/FactCheck';


const Sidebar = () => {

    const [activeLinkGroup, setActiveLinkGroup] = useState(false);
    const [linkNo, setLinkNo] = useState(0);
    const [activeMobileToggle, setActiveMobileToggle] = useState(false);

    const handleLinkGroupClick = (link) => {
        if (link === linkNo) {
            setActiveLinkGroup(false);
            setLinkNo(0);
        } else {
            setActiveLinkGroup(true);
            setLinkNo(link);
        }
    };

    const handleMobileToggle = () => {
        setActiveMobileToggle(!activeMobileToggle);
    }

    const activeLinkGroupStyle = {
        height: 'fit-content',
    }

    const activeLinkArrowStyle = {
        transform: activeLinkGroup ? 'rotateX(180deg)' : 'unset',
        transition: '0.5s ease'
    }

    const activeLinkStyle = {
        color: '#2c7be5',
    }

    const mobileMenuStyle = {
        display: activeMobileToggle ? 'block' : null,
        transition: '0.5s',
    }

    const mobileMenuBorderStyle = {
        borderBottom: activeMobileToggle ? '1px solid #e3ebf6' : 'unset',
    }

    return (
        <div className='dash-sidebar' style={mobileMenuBorderStyle}>
            <div className="top">
                <div className="menu-icon" onClick={handleMobileToggle}>{activeMobileToggle ? <CloseIcon className='icon' /> : <MenuIcon className='icon' />}</div>
                <div className="logo">
                    <Link to='/dashboard'><img src={Logo} alt="University logo - dashboard" /></Link>
                </div>
                <div className="profile">
                    <div className="active-mark"></div>
                    <img src={maleAvatar} alt="Admin profile image" />
                </div>
            </div>
            <div className="links" style={mobileMenuStyle}>
                <ul>
                    <li className="link-group">
                        <button className='toggle-btn' style={(activeLinkGroup && linkNo === 1) ? activeLinkStyle : null} onClick={() => handleLinkGroupClick(1)}>
                            <div className="left"><GroupIcon className='icon' /> Student</div>
                            <div className="right"><KeyboardArrowDownIcon className='arrow-icon' style={linkNo === 1 ? activeLinkArrowStyle : null} /></div>
                        </button>
                        <div className="main" style={(activeLinkGroup && linkNo === 1) ? activeLinkGroupStyle : null}>
                            <div className="link"><NavLink to='/dashboard/students'>Students List</NavLink></div>
                            <div className="link"><NavLink to='/dashboard/students/new'>Add New Student</NavLink></div>
                        </div>
                    </li>

                    <li className="link-group">
                        <button className='toggle-btn' style={(activeLinkGroup && linkNo === 2) ? activeLinkStyle : null} onClick={() => handleLinkGroupClick(2)}>
                            <div className="left"><AssignmentIndIcon className='icon' /> Teacher</div>
                            <div className="right"><KeyboardArrowDownIcon className='arrow-icon' style={linkNo === 2 ? activeLinkArrowStyle : null} /></div>
                        </button>
                        <div className="main" style={(activeLinkGroup && linkNo === 2) ? activeLinkGroupStyle : null}>
                            <div className="link"><Link to='/dashboard/teachers'>Teachers List</Link></div>
                            <div className="link"><Link to='/dashboard/teachers/new'>Add New Teacher</Link></div>
                        </div>
                    </li>

                    <li className="link-group">
                        <button className='toggle-btn' style={(activeLinkGroup && linkNo === 3) ? activeLinkStyle : null} onClick={() => handleLinkGroupClick(3)}>
                            <div className="left"><BusinessIcon className='icon' /> Faculty</div>
                            <div className="right"><KeyboardArrowDownIcon className='arrow-icon' style={linkNo === 3 ? activeLinkArrowStyle : null} /></div>
                        </button>
                        <div className="main" style={(activeLinkGroup && linkNo === 3) ? activeLinkGroupStyle : null}>
                            <div className="link"><Link to='/dashboard/faculties'>Faculties List</Link></div>
                            <div className="link"><Link to='/dashboard/faculties/new'>Add New Faculty</Link></div>
                        </div>
                    </li>

                    <li className="link-group">
                        <button className='toggle-btn' style={(activeLinkGroup && linkNo === 4) ? activeLinkStyle : null} onClick={() => handleLinkGroupClick(4)}>
                            <div className="left"><ApartmentIcon className='icon' /> Department</div>
                            <div className="right"><KeyboardArrowDownIcon className='arrow-icon' style={linkNo === 4 ? activeLinkArrowStyle : null} /></div>
                        </button>
                        <div className="main" style={(activeLinkGroup && linkNo === 4) ? activeLinkGroupStyle : null}>
                            <div className="link"><Link to='/dashboard/departments'>Departments List</Link></div>
                            <div className="link"><Link to='/dashboard/departments/new'>Add New Department</Link></div>
                        </div>
                    </li>


                    <li className="link-group">
                        <button className='toggle-btn' style={(activeLinkGroup && linkNo === 5) ? activeLinkStyle : null} onClick={() => handleLinkGroupClick(5)}>
                            <div className="left"><MenuBookIcon className='icon' /> Subject</div>
                            <div className="right"><KeyboardArrowDownIcon className='arrow-icon' style={linkNo === 5 ? activeLinkArrowStyle : null} /></div>
                        </button>
                        <div className="main" style={(activeLinkGroup && linkNo === 5) ? activeLinkGroupStyle : null}>
                            <div className="link"><Link to='/dashboard/subjects'>Subjects List</Link></div>
                            <div className="link"><Link to='/dashboard/subjects/new'>Add New Subject</Link></div>
                        </div>
                    </li>

                    <li className="link-group">
                        <button className='toggle-btn' style={(activeLinkGroup && linkNo === 6) ? activeLinkStyle : null} onClick={() => handleLinkGroupClick(6)}>
                            <div className="left"><QuizIcon className='icon' /> Question</div>
                            <div className="right"><KeyboardArrowDownIcon className='arrow-icon' style={linkNo === 6 ? activeLinkArrowStyle : null} /></div>
                        </button>
                        <div className="main" style={(activeLinkGroup && linkNo === 6) ? activeLinkGroupStyle : null}>
                            <div className="link"><Link to='/dashboard/questions'>Questions List</Link></div>
                            <div className="link"><Link to='/dashboard/questions/new'>Add New Question</Link></div>
                        </div>
                    </li>

                    <li className="link-group">
                        <button className='toggle-btn' style={(activeLinkGroup && linkNo === 7) ? activeLinkStyle : null} onClick={() => handleLinkGroupClick(7)}>
                            <div className="left"><FactCheckIcon className='icon' /> Answer</div>
                            <div className="right"><KeyboardArrowDownIcon className='arrow-icon' style={linkNo === 7 ? activeLinkArrowStyle : null} /></div>
                        </button>
                        <div className="main" style={(activeLinkGroup && linkNo === 7) ? activeLinkGroupStyle : null}>
                            <div className="link"><Link to='/dashboard/answers'>Answers List</Link></div>
                        </div>
                    </li>

                    <li className='link-group-seperator'>
                        <div className="seperator">
                            <span>Account & Settings</span>
                        </div>
                    </li>

                    <li className="link-group">
                        <button className='toggle-btn' style={(activeLinkGroup && linkNo === 9) ? activeLinkStyle : null} onClick={() => handleLinkGroupClick(9)}>
                            <div className="left"><TurnedInNotIcon className='icon' /> Dashboard</div>
                            <div className="right"><KeyboardArrowDownIcon className='arrow-icon' style={linkNo === 9 ? activeLinkArrowStyle : null} /></div>
                        </button>
                        <div className="main" style={(activeLinkGroup && linkNo === 9) ? activeLinkGroupStyle : null}>
                            <div className="link"><Link to='#'>SignIn</Link></div>
                            <div className="link"><Link to='#'>Reset Password</Link></div>
                            <div className="link"><Link to='#'>SignOut</Link></div>
                        </div>
                    </li>

                    <li className="link-group mobile-logout">
                        <Link to='/admin/logout'>
                            <div className="left"><LogoutIcon className='icon' /></div>
                            <div className="right">Logout</div>
                        </Link>
                    </li>
                </ul>

                <div className="bottom-link">
                    <div className="wrapper">
                        <div className="profile">
                            <div className="active-mark"></div>
                            <img
                                data-tooltip-id="profile-tooltip"
                                data-tooltip-content="Profile Page"
                                data-tooltip-place="top"
                                src={maleAvatar} alt="Admin profile image" />
                            <Tooltip id='profile-tooltip' />
                        </div>
                        <div className="logout">
                            <Link
                                data-tooltip-id="logout-tooltip"
                                data-tooltip-content="Logout"
                                data-tooltip-place="top"
                                to='/admin/logout'><LogoutIcon className='icon' /></Link>
                            <Tooltip id="logout-tooltip" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;