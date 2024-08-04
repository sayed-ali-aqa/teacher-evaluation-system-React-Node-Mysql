import React from 'react';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

const Navbar = (props) => {
  const {title, landingPage} = props;

  return (
    <div className='dash-navbar'>
      <div className="main">
        <div className="left">
          <span>{landingPage ? 'Overview' : ''}</span>
          <h1>{title}</h1>
        </div>
        <div className="right"><Link to='/dashboard/students/new'><AddIcon className='icon' /> New Student</Link></div>
      </div>

      <div className="seperator"></div>
    </div>
  )
}

export default Navbar;
