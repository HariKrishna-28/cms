import React from 'react'
import { Alert, AlertTitle } from '@mui/material';
// import AlertTitle from '@mui/material/AlertTitle';

type Props = {
    message: string
}

const ErrorMessagebox: React.FC<Props> = ({ message }) => {
    return (
        <Alert severity="error" variant='filled'>
            <AlertTitle>Error</AlertTitle>
            {message}
            {/* This is an error alert — <strong>check it out!</strong> */}
        </Alert>
    )
}

export default ErrorMessagebox