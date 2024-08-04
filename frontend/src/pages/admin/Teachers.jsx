import React, { useState, useEffect } from 'react';
import Navbar from '../../components/admin/Navbar';
import Sidebar from '../../components/admin/Sidebar';
import { Navigate, useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axios from 'axios';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import { DataGrid } from '@mui/x-data-grid';
import { Paper, IconButton, Menu } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Snackbars, { TransitionUp } from '../../components/admin/Snackbars';
import CustomDialog from '../../components/admin/CustomDialog';

const Teachers = () => {

    const [teahersList, setTeahersList] = useState([]);
    // Menu Item states
    const [selectedRowId, setSelectedRowId] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    // Dialog states
    const [openDialog, setOpenDialog] = React.useState(false);

    const [deleteId, setDeleteId] = useState('');
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
        if (option === 'view') {
            Navigate(`/dashboard/teachers/${params.row.id}`)
        }
        else if (option === 'edit') {
            Navigate(`/dashboard/teachers/edit/${params.row.id}`);
        }
        else if (option === 'delete') {
            console.log('Delete action clicked for row:', params.row.id);
            setOpenDialog(true);
            setDeleteId(params.row.id);
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
                    <MenuItem className='menu-item' onClick={() => handleOptionClick('view', params)}><VisibilityIcon className='icon' /> View</MenuItem>
                    <MenuItem className='menu-item' onClick={() => handleOptionClick('edit', params)}><EditIcon className='icon' /> Edit</MenuItem>
                    <MenuItem className='menu-item' onClick={() => handleOptionClick('delete', params)}><DeleteForeverIcon className='icon' /> Delete</MenuItem>
                </Menu>
            </div>
        );
    };



    useEffect(() => {
        handleFetchTeachers();
    }, [])

    const handleFetchTeachers = async () => {
        try {
            const teachers = await axios.get('http://localhost:3500/teachers');
            setTeahersList(teachers.data);
        } catch (error) {
            setTransition(TransitionUp);
            setErrorOpen(true);
            setSnackbarFailMsg('Error fetching teachers!');
        }
    }

    const columns = [
        { field: 'no', headerName: 'No', width: 75 },
        { field: 'fullName', headerName: 'Name', width: 180 },
        { field: 'gender', headerName: 'Gender', width: 100 },
        { field: 'degree', headerName: 'Degree', width: 130 },
        { field: 'acdemicAceivement', headerName: 'Acdemic Aceivement', width: 200 },
        { field: 'faculty', headerName: 'Faculty', width: 220 },
        {
            field: 'action',
            headerName: 'Action',
            width: 80,
            renderCell: renderOptionsMenu, // Use the custom render function
        },
    ];

    const rows = teahersList ? teahersList.map((teacher, idnex) => ({
        id: teacher.t_id,
        no: idnex + 1,
        fullName: teacher.name,
        gender: teacher.gender,
        degree: teacher.degree,
        acdemicAceivement: teacher.academic_acheivement,
        faculty: teacher.faculty
    })) : [];

    // close Dialog function
    const handleCloseDialog = () => {
        setOpenDialog(false);
        setDeleteId('');
    };

    const handleDialogDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:3500/teachers/${deleteId}`);

            if (response.status === 200) {
                setOpenDialog(false);
                setTeahersList((prevTeachers) => prevTeachers.filter((teacher) => teacher.t_id !== deleteId))

                setTransition(TransitionUp);
                setOpen(true);
                setSnackbarSuccessMsg("Teacher record deleted successfully!");
            }
        }
        catch (error) {
            setOpenDialog(false);

            setTransition(TransitionUp);
            setErrorOpen(true);
            setSnackbarFailMsg('Error deleting teacher record!');
        }
    }

    return (
        <>
            <div className="dashboard-index">
                <Sidebar />
                <div className="content">
                    <Navbar title='Teachers List' landingPage={false} />
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

                        <Box sx={{ minWidth: 120 }} className='form-row'>
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
                        </Box>

                        {/* Dialog */}
                        <CustomDialog
                            openDialog={openDialog}
                            setOpenDialog={setOpenDialog}
                            category="teacher"
                            onClose={handleCloseDialog}
                            handleCloseDialog={handleCloseDialog}
                            handleDialogDelete={handleDialogDelete}
                        />
                    </div>
                </div>
            </div >
        </>
    );
};

export default Teachers;
