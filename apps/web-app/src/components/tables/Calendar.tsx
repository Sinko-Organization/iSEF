import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, IconButton, Paper, Toolbar, Tooltip, Typography } from '@mui/material';

const useStyles = makeStyles((theme) => ({
    weekCalendar: {
        width: '100%',
        overflowY: 'auto',
        maxHeight: '400px',

    },
    table: {
        minWidth: '1090px',
        borderCollapse: 'collapse',


    },
    timeColumn: {
        textAlign: 'center',
        borderRight: '1px solid #ccc',
        padding: '16px',
        minWidth: '100px',
        backgroundColor: '#D9D9D9',
    },
    eventColumn: {
        border: '1px solid #ccc',
        padding: '16px',
        minWidth: '120px',



    },
}));

const Calendar = () => {
    const classes = useStyles();

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const timeSlots: string[] = [];
    for (let hour = 7; hour <= 21; hour++) {
        timeSlots.push(`${hour < 10 ? '0' + hour : hour}:00`);
    }

    const renderRows = () => {
        return timeSlots.map((time, index) => (
            <tr key={index}>
                <td style={{ color: '#9078B6' }} className={classes.timeColumn}>{time}</td>
                {daysOfWeek.map((day, index) => (
                    <td key={index} className={classes.eventColumn}></td>
                ))}
            </tr>
        ));
    };

    return (
        <>
            <Paper className="mt-10"
                sx={{
                    boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.25)",
                    borderRadius: 2,
                    overflow: "hidden",
                }}>
                <Toolbar
                    sx={{
                        backgroundColor: "#B2A1E1",
                        pl: { sm: 2 },
                        pr: { xs: 1, sm: 1 },
                        borderBottom: "1px solid #ddd",
                        color: "white",
                        textAlign: "center",
                    }}
                >
                    <Typography
                        sx={{
                            flex: "1 1 100%",
                            fontFamily: "Times New Roman",
                            fontSize: "20px",
                        }}
                        // variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        <div className="font-bold">CALENDAR</div>
                    </Typography>
                </Toolbar>
                <div className={classes.weekCalendar}>
                    <table className={classes.table}>
                        <thead>
                            <tr>
                                <th style={{ color: '#9078B6' }}>Time</th>
                                {daysOfWeek.map((day, index) => (
                                    <th style={{ color: '#9078B6' }} key={index}>{day}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>{renderRows()}</tbody>
                    </table>
                </div>
            </Paper>
        </>



    );
};

export default Calendar;
