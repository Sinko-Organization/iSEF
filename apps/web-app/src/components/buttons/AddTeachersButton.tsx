import React from 'react';
import { makeStyles } from '@mui/styles';
import { IconButton, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#9078B6',
        color: 'white',
        borderRadius: 'full',
        padding: '10px',
        '&:hover': {
            backgroundColor: '#694f92',
        },
    },

    text: {
        marginLeft: '10px', 
    },
});

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
    onClick: () => void;
    disabled?: boolean;
}

const AddTeachersButton = () => {
    const classes = useStyles();

    return (
        <div className={classes.container}>

            <Typography variant="body1" className={classes.text}>
                Add Teachers
            </Typography>
            <IconButton
                className={`${classes.button} px-4 py-3 text-lg font-medium`}
            >
                <Add />
            </IconButton>
        </div>
    );
};

export default AddTeachersButton;