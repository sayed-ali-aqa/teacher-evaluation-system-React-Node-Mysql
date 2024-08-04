import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Navbar from '../../components/user/Navbar';
import Footer from '../../components/user/Footer';
import femaleAvatar from '../../assets/images/avatar/female-avatar.png';
import maleAvatar from '../../assets/images/avatar/male-avatar.png';

const Profile = () => {

    // since I am using data as the obejct so I should pass empty object to the useState()
    const [data, setData] = useState({});

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3500/students');
            setData(response.data[0]);
        } catch (error) {
            console.log('Fetch profile error: ' + error);
        }
    }

    return (
        <>
            <Navbar />
            <div className='profile-page'>
                <div className="card">
                    <div className="top">
                        {data.gender == "Female" ? <img src= {femaleAvatar} alt="Female Profile Avatar" />: null} 
                        {data.gender == "Male" ? <img src= {maleAvatar} alt="Male Profile Avatar" />: null} 
                    </div>
                    <div className="bottom">
                        <div className="left">
                            <h5>Primary Information</h5>
                            <ul>
                                <li><span>Name:</span> {data.name}</li>
                                <li><span>Student ID:</span> {data.stu_reg_id}</li>
                                <li><span>Email:</span> {data.email}</li>
                                <li><span>Gender:</span> {data.gender}</li>
                            </ul>
                        </div>
                        <div className="right">
                            <h5>Secondary Information</h5>
                            <ul>
                                <li><span>Semester:</span> {data.semester}</li>
                                <li><span>Time:</span> {data.time}</li>
                                <li><span>Faculty:</span> {data.faculty}</li>
                                <li><span>Department:</span> {data.department}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Profile;
