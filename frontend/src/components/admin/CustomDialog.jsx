import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';


const CustomDialog = ({ openDialog, handleCloseDialog, handleDialogDelete, category }) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <>
            <div>
                <Dialog
                    fullScreen={fullScreen}
                    open={openDialog}
                    onClose={handleCloseDialog}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">
                        Confirm deleting {category} record
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText style={{ color: 'rgba(0, 0, 0, 0.7)' }}>
                            You are about to delete a {category}'s record from the system. This action is irreversible, and all associated data will be permanently removed.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleCloseDialog}>
                            Cancel
                        </Button>
                        <Button onClick={handleDialogDelete} autoFocus style={{ color: 'red' }}>
                            Continue
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    )
}

export default CustomDialog;