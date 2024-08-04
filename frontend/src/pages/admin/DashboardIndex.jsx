import React, { useState, useEffect } from 'react';
import Navbar from '../../components/admin/Navbar';
import Sidebar from '../../components/admin/Sidebar';
import GroupIcon from '@mui/icons-material/Group';
import { PieChart, Pie, Cell } from 'recharts';
import axios from 'axios';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import ApartmentIcon from '@mui/icons-material/Apartment';
import BusinessIcon from '@mui/icons-material/Business';
import Snackbars, { TransitionUp } from '../../components/admin/Snackbars';

// -------------------------------------------------
import { Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
// -------------------------------------------------

const DashboardIndex = () => {

    const [statisticsData, setStatisticsData] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [cardInfoCount, setCardInfoCount] = useState([]);

    // Snakbar
    const [open, setOpen] = useState(false);
    const [transition, setTransition] = useState(undefined);
    const [errorOpen, setErrorOpen] = useState(false);
    const [snackbarSuccessMsg, setSnackbarSuccessMsg] = useState('');
    const [snackbarFailMsg, setSnackbarFailMsg] = useState('');

    useEffect(() => {
        handleStatisticsData();
        getQuestions();
        getCardsInfoCount();
    }, [])

    // ----------------------- List data begins ---------------------------

    const getQuestions = async () => {
        try {
            const response = await axios.get('http://localhost:3500/questions');
            setQuestions(response.data);

        } catch (error) {
            setTransition(TransitionUp);
            setErrorOpen(true);
            setSnackbarFailMsg('Error fetching questions!');
        }
    }

    const handleStatisticsData = async () => {
        try {
            const response = await axios.get('http://localhost:3500/answers/statistics-info');
            setStatisticsData(response.data);
        } catch (error) {
            setTransition(TransitionUp);
            setErrorOpen(true);
            setSnackbarFailMsg('Error fetching statistical infos!');
        }
    }

    const getCardsInfoCount = async () => {
        try {
            const [studentsResponse, teachersResponse, deprtmentsResponse, facultiesResponse] = await Promise.all([
                axios.get('http://localhost:3500/students/students-count'),
                axios.get('http://localhost:3500/teachers/teachers-count'),
                axios.get('http://localhost:3500/departments/departments-count'),
                axios.get('http://localhost:3500/faculties/faculties-count'),
            ])

            setCardInfoCount([studentsResponse.data[0].studentCount, teachersResponse.data[0].teachersCount, deprtmentsResponse.data[0].departmentsCount, facultiesResponse.data[0].facultiesCount]);
        } catch (error) {
            setTransition(TransitionUp);
            setErrorOpen(true);
            setSnackbarFailMsg('Error fetching data!');
        }
    }

    let data = [];

    if (statisticsData.length > 0) {
        const yesData = statisticsData.filter(item => item.answer === 'Yes');
        const somewhatData = statisticsData.filter(item => item.answer === 'Somewhat');
        const noData = statisticsData.filter(item => item.answer === 'No');

        data = [
            { name: yesData[0].answer, value: yesData[0].count },
            { name: somewhatData[0].answer, value: somewhatData[0].count },
            { name: noData[0].answer, value: noData[0].count },
        ];
    } else {
        data = [
            { name: 'Yes', value: 0 },
            { name: 'Somewhat', value: 0 },
            { name: 'No', value: 0 },
        ];
    }

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <>
            <div className="dashboard-index">
                <Sidebar />
                <div className="content">
                    <Navbar title='TES Dashboard' landingPage={true} />
                    <div className="dash-landing-page">
                        <div className="cards">
                            <div className="card-info">
                                <div className="left">
                                    <span>Total Students</span>
                                    <h3>{cardInfoCount[0]}</h3>
                                </div>
                                <div className="right">
                                    <GroupIcon className='icon' />
                                </div>
                            </div>

                            <div className="card-info">
                                <div className="left">
                                    <span>Total Teachers</span>
                                    <h3>{cardInfoCount[1]}</h3>
                                </div>
                                <div className="right">
                                    <AssignmentIndIcon className='icon' />
                                </div>
                            </div>

                            <div className="card-info">
                                <div className="left">
                                    <span>Total Departments</span>
                                    <h3>{cardInfoCount[2]}</h3>
                                </div>
                                <div className="right">
                                    <ApartmentIcon className='icon' />
                                </div>
                            </div>

                            <div className="card-info">
                                <div className="left">
                                    <span>Total Faculties</span>
                                    <h3>{cardInfoCount[3]}</h3>
                                </div>
                                <div className="right">
                                    <BusinessIcon className='icon' />
                                </div>
                            </div>

                        </div>
                        <div className="chart-info">
                            <div className="questions-list">
                                <h2>Teacher Evaluation Questions</h2>
                                <Paper>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>No.</TableCell>
                                                <TableCell>Question</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {questions.map((row, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>{index + 1}</TableCell>
                                                    <TableCell>{row.question}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </Paper>
                            </div>
                            <div className="pie-chart">
                                <h2>Evaluation Chart</h2>
                                <div className="row">
                                    <PieChart width={300} height={400}>
                                        <Pie
                                            data={data}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={renderCustomizedLabel}
                                            outerRadius={80}
                                            dataKey="value"
                                        >
                                            {data.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>

                                    </PieChart>
                                    <div className="pie-chart-info">
                                        <div className='label-info'>
                                            <div className="color-marker yes-marker"></div>
                                            <span>Yes</span>
                                        </div>

                                        <div className='label-info'>
                                            <div className="color-marker somewhat-marker"></div>
                                            <span>Somewhat</span>
                                        </div>

                                        <div className='label-info'>
                                            <div className="color-marker no-marker"></div>
                                            <span>No</span>
                                        </div>
                                    </div>
                                </div>
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
        </>
    );
};

export default DashboardIndex;
