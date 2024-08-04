import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

// snackbar
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// Define the TransitionUp component
export function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
}

const Snackbars = ({ open, setOpen, errorOpen, setErrorOpen, transition, setTransition, successMsg, failMsg }) => {
    // Success snackbar close 
    const handleClose = () => {
        setOpen(false);
    };

    // Error snackbar close 
    const handleErrorClose = () => {
        setErrorOpen(false);
    };

    return (
        <>
            <Stack spacing={2} sx={{ width: 'fit-content' }}>
                {/* success */}
                <Snackbar
                    sx={{ width: 'fit-content' }}
                    autoHideDuration={6000}
                    severity="success"
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={TransitionUp}
                    key={transition ? transition.name : ''}
                >
                    <Alert onClose={handleClose} severity="success" sx={{ width: 'fit-content' }}>
                        {successMsg}
                    </Alert>
                </Snackbar>

                {/* error */}
                <Snackbar
                    sx={{ width: 'fit-content' }}
                    autoHideDuration={6000}
                    severity="error"
                    open={errorOpen}
                    onClose={handleErrorClose}
                    TransitionComponent={TransitionUp}
                    key={transition ? transition.name : ''}
                >
                    <Alert onClose={handleErrorClose} severity="error" sx={{ width: 'fit-content' }}>
                        {failMsg}
                    </Alert>
                </Snackbar>
            </Stack>
        </>
    )
}

export default Snackbars;
