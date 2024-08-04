import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar';
import Navbar from '../../components/admin/Navbar';
import axios from 'axios';
import maleAvatar from '../../assets/images/avatar/male-avatar.png';
import femaleAvatar from '../../assets/images/avatar/female-avatar.png';
import Snackbars, { TransitionUp } from '../../components/admin/Snackbars';

export const Teacher = () => {
    const { id } = useParams();
    const [data, setData] = useState({});

    // Snakbar
    const [open, setOpen] = useState(false);
    const [transition, setTransition] = useState(undefined);
    const [errorOpen, setErrorOpen] = useState(false);
    const [snackbarSuccessMsg, setSnackbarSuccessMsg] = useState('');
    const [snackbarFailMsg, setSnackbarFailMsg] = useState('');

    // Include 'id' in the dependency array to re-run the effect when it changes
    useEffect(() => {
        fetchTeacherData(id);
    }, [id])

    const fetchTeacherData = async (id) => {
        try {
            const response = await axios.get(`http://localhost:3500/teachers/${id}`);
            setData(response.data[0]);
        } catch (error) {
            setTransition(TransitionUp);
            setErrorOpen(true);
            setSnackbarFailMsg('Error fetching teacher record!');
        }
    }

    return (
        <>
            <div className="dashboard-index">
                <Sidebar />
                <div className="content">
                    <Navbar title='Teacher information' landingPage={false} />
                    <div className='dash-profile-page'>
                        <div className="card">
                            <div className="top">
                                {data.gender === "Female" ? <img src={femaleAvatar} alt="Female Profile Avatar" /> : null}
                                {data.gender === "Male" ? <img src={maleAvatar} alt="Male Profile Avatar" /> : null}
                            </div>
                            <div className="bottom">
                                <div className="left">
                                    <h5>Personal Information</h5>
                                    <ul>
                                        <li><span>Name:</span> {data.name}</li>
                                        <li><span>Gender:</span> {data.gender}</li>
                                    </ul>
                                </div>
                                <div className="right">
                                    <h5>Academic Information</h5>
                                    <ul>
                                        <li><span>Academic Acheivement:</span> {data.academic_acheivement}</li>
                                        <li><span>Faculty:</span> {data.faculty}</li>
                                        <li><span>Department:</span> {data.department}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* imported snackbars with the required props*/}
                        <Snackbars
                            open={open}
                            setOpen={setOpen}
                            errorOpen={errorOpen}
                            setErrorOpen={setErrorOpen}
                            transition={transition}
                            setTransition={setTransition}
                            successMsg={snackbarSuccessMsg}
                            failMsg={snackbarFailMsg}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}


export default Teacher;