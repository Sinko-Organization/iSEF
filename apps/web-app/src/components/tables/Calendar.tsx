import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    weekCalendar: {
        width: '100%',
        overflowY: 'auto',
        maxHeight: '400px',

    },
    table: {
        minWidth: '1000px',
        borderCollapse: 'collapse',


    },
    timeColumn: {
        textAlign: 'center',
        borderRight: '1px solid #ccc',
        padding: '16px',
        minWidth: '80px',
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
    );
};

export default Calendar;
