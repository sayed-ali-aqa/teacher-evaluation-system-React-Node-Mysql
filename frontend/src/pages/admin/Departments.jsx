import React, { useState, useEffect } from 'react';
import Navbar from '../../components/admin/Navbar';
import Sidebar from '../../components/admin/Sidebar';
import { Navigate, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import { DataGrid } from '@mui/x-data-grid';
import { Paper, IconButton, Menu } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Snackbars, { TransitionUp } from '../../components/admin/Snackbars';

const Departments = () => {

    const [departmentsList, setDepartmentsList] = useState([]);
    // Menu Item states
    const [selectedRowId, setSelectedRowId] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);

    // Snakbar
    const [open, setOpen] = useState(false);
    const [transition, setTransition] = useState(undefined);
    const [errorOpen, setErrorOpen] = useState(false);
    const [snackbarSuccessMsg, setSnackbarSuccessMsg] = useState('');
    const [snackbarFailMsg, setSnackbarFailMsg] = useState('');

    const Navigate = useNavigate();

    // Step 4: Function to close options menu
    const handleMenuClose = () => {
        setSelectedRowId(null);
        setAnchorEl(null);
    };

    const handleOptionClick = (option, params) => {
        if (option === 'edit') {
            Navigate(`/dashboard/departments/edit/${params.row.id}`);
        }

        // Close the options menu after handling the action
        handleMenuClose();
    };


    // Step 6: Function to render the options menu for each row
    const renderOptionsMenu = (params) => {
        const handleOptionsClick = (event) => {
            setSelectedRowId(params.id);
            setAnchorEl(event.currentTarget); // Update anchorEl state
        };

        return (
            <div>
                <IconButton
                    aria-controls={`action-menu-${params.id}`}
                    aria-haspopup="true"
                    onClick={handleOptionsClick} // Use the handleOptionsClick function
                >
                    <MoreVertIcon />
                </IconButton>
                {/* Step 2: Render the options menu conditionally */}
                <Menu
                    id={`action-menu-${params.id}`}
                    anchorEl={anchorEl}
                    keepMounted
                    open={selectedRowId === params.id}
                    onClose={handleMenuClose}
                >
                    {/* Step 3: Implement options */}
                    <MenuItem className='menu-item' onClick={() => handleOptionClick('edit', params)}><EditIcon className='icon' /> Edit</MenuItem>
                </Menu>
            </div>
        );
    };



    useEffect(() => {
        handleFetchDepartments();
    }, [])

    const handleFetchDepartments = async () => {
        try {
            const departments = await axios.get('http://localhost:3500/departments');
            setDepartmentsList(departments.data);
            console.log(departments.data);
        } catch (error) {
            setTransition(TransitionUp);
            setErrorOpen(true);
            setSnackbarFailMsg('Error fetching departments!');
        }
    }

    const columns = [
        { field: 'no', headerName: 'No', width: 75 },
        { field: 'department', headerName: 'Department', width: 220 },
        { field: 'faculty', headerName: 'Faculty', width: 220 },
        { field: 'createdAt', headerName: 'Created At', width: 220 },
        {
            field: 'action',
            headerName: 'Action',
            width: 80,
            renderCell: renderOptionsMenu, // Use the custom render function
        },
    ];

    const rows = departmentsList ? departmentsList.map((department, idnex) => ({
        id: department.dep_id,
        no: idnex + 1,
        department: department.department,
        faculty: department.faculty,
        createdAt: new Date(department.created_at).toLocaleString()
    })) : [];

    return (
        <>
            <div className="dashboard-index">
                <Sidebar />
                <div className="content">
                    <Navbar title='Departments List' landingPage={false} />
                    <div className="students-page">
                        <Paper style={{ height: 500 }}>
                            <div style={{ height: 500, width: '100%' }}>
                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    initialState={{
                                        pagination: {
                                            paginationModel: { page: 0, pageSize: 5 },
                                        },
                                    }}
                                    pageSizeOptions={[5, 10]}
                                />
                            </div>
                        </Paper>

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
            </div >
        </>
    );
};

export default Departments;
