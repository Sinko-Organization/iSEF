import React from 'react';
import { Button } from '@mui/material';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({
    container: {
        display: "flex",
        alignItems: "center",
    },
    button: {
        backgroundColor: "#9078B6",
        color: "white",
        borderRadius: "full",
        padding: "10px",
        "&:hover": {
            backgroundColor: "#694f92",
        },
    },

    text: {
        marginLeft: "10px",
    },
});



const SaveCalendar = () => {
    const classes = useStyles();
   
    
    return (
        <React.Fragment>
            <div className={classes.container}>
                <Button 
                   color="secondary"
                   className={classes.button}
                   variant="contained">
                    Save Schedule</Button>
            </div>
        </React.Fragment>
    );
    }
    
    export default SaveCalendar;