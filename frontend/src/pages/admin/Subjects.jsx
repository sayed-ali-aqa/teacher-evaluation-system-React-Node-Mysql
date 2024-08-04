import React, { useState, useEffect } from 'react';
import Navbar from '../../components/admin/Navbar';
import Sidebar from '../../components/admin/Sidebar';
import { Navigate, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import { DataGrid } from '@mui/x-data-grid';
import { Paper, IconButton, Menu } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Snackbars, { TransitionUp } from '../../components/admin/Snackbars';
import CustomDialog from '../../components/admin/CustomDialog';

const Subjects = () => {

    const [subjectsList, setSubjectsList] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
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
        if (option === 'edit') {
            Navigate(`/dashboard/subjects/edit/${params.row.id}`);
        }
        else if (option === 'delete') {
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
                    <MenuItem className='menu-item' onClick={() => handleOptionClick('edit', params)}><EditIcon className='icon' /> Edit</MenuItem>
                    <MenuItem className='menu-item' onClick={() => handleOptionClick('delete', params)}><DeleteForeverIcon className='icon' /> Delete</MenuItem>
                </Menu>
            </div>
        );
    };

    useEffect(() => {
        handleFetchSubjectData();
    }, [])

    const handleFetchSubjectData = async () => {
        try {
            const subjects = await axios.get('http://localhost:3500/subjects');

            setSubjectsList(subjects.data);
        } catch (error) {
            setTransition(TransitionUp);
            setErrorOpen(true);
            setSnackbarFailMsg('Error fetching subjects!');
        }
    }

    const columns = [
        { field: 'No', headerName: 'No', width: 75 },
        { field: 'subject', headerName: 'Subject', width: 280 },
        { field: 'semester', headerName: 'Semester', width: 100 },
        { field: 'credit', headerName: 'Credit', width: 75 },
        { field: 'teacher', headerName: 'Teacher', width: 130 },
        { field: 'department', headerName: 'Department', width: 200 },
        {
            field: 'action',
            headerName: 'Action',
            width: 80,
            renderCell: renderOptionsMenu, // Use the custom render function
        },
    ];

    const rows = subjectsList ? subjectsList.map((subject, idnex) => ({
        No: idnex + 1,
        id: subject.sub_id,
        subject: subject.subject,
        semester: subject.semester,
        credit: subject.credit,
        teacher: subject.name,
        department: subject.department
    })) : [];

    // close Dialog function
    const handleCloseDialog = () => {
        setOpenDialog(false);
        setDeleteId('');
    };

    const handleDialogDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:3500/subjects/${deleteId}`);


            if (response.data.success === true) {
                setTransition(TransitionUp);
                setOpen(true);
                setSnackbarSuccessMsg("Subject record deleted successfully!");

                setSubjectsList((prevSubjects) => prevSubjects.filter((subject) => subject.sub_id !== deleteId))

            } else if (response.data.success === false) {
                setTransition(TransitionUp);
                setErrorOpen(true);
                setSnackbarFailMsg('Error deleting subject record!');
            }

            setOpenDialog(false);
        }
        catch (error) {
            setOpenDialog(false);

            setTransition(TransitionUp);
            setErrorOpen(true);
            setSnackbarFailMsg('Error deleting subject record!');
        }
    }

    return (
        <>
            <div className="dashboard-index">
                <Sidebar />
                <div className="content">
                    <Navbar title='Subjects List' landingPage={false} />
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

                        {/* Dialog */}
                        <CustomDialog
                            openDialog={openDialog}
                            setOpenDialog={setOpenDialog}
                            onClose={handleCloseDialog}
                            handleCloseDialog={handleCloseDialog}
                            handleDialogDelete={handleDialogDelete}
                            category="subject"
                        />
                    </div>
                </div>
            </div >
        </>
    );
};

export default Subjects;
