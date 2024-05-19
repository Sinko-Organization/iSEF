import { background } from "@chakra-ui/react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Modal,
  Paper,
  SelectChangeEvent,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState, useEffect } from "react";

const useStyles = makeStyles({
  container: {
    display: "flex",
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

const subjects = ["OSH", "Algorithms", "Networking", "Web Development", "Database Management", "Software Engineering", "Operating Systems", "Computer Architecture", "Data Structures", "Machine Learning", "Cyber Security"];
const rooms = ["En101", "En102", "En103", "En104", "En105", "En106", "En107", "En108", "En109", "En110", "En200"];
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const hours = Array.from({ length: 15 }, (_, i) => 7 + i);


const AddScheduleButton = () => {
  const classes = useStyles();

  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleSubjectChange = (event: SelectChangeEvent<string>) => {
    setSelectedSubject(event.target.value);
  };

  const handleRoomChange = (event: SelectChangeEvent<string>) => {
    setSelectedRoom(event.target.value);
  };

  const handleDayChange = (event: SelectChangeEvent<string>) => {
    setSelectedDay(event.target.value);
  };

  const handleStartTimeChange = (event: SelectChangeEvent<string>) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event: SelectChangeEvent<string>) => {
    setEndTime(event.target.value);
  };

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleAddSchedule = () => {
    if (selectedDay && selectedSubject && selectedRoom && startTime && endTime) {
      const newSchedule = {
        day: selectedDay,
        subject: selectedSubject,
        room: selectedRoom,
        startTime: startTime,
        endTime: endTime
      };
      console.log('New Schedule:', newSchedule);
      // Add logic to save the new schedule
      handleCloseModal();
    } else {
      alert('Please fill all fields!');
    }
  };



  return (
    <React.Fragment>
      <div>
        <Button variant="contained" color="secondary" onClick={handleOpenModal} style={{ marginBottom: '16px' }} className={classes.button}>
          Add Schedule
        </Button>
        <Modal open={modalOpen} onClose={handleCloseModal} className={classes.container}>
          <Paper sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '20px' }} style={{ background: "lavender" }}>
            <Typography variant="h6" gutterBottom>
              Add Schedule
            </Typography>
            <form>
              {/* Subject */}
              <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
                <Typography variant="body1" sx={{ marginRight: 2 }}>
                  Subject
                </Typography>
                <Box sx={{ width: 200 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Subject</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Subject"
                      value={selectedSubject}
                      onChange={handleSubjectChange}
                      sx={{ width: "100%" }}
                    >
                      {subjects.map((subject, index) => (
                        <MenuItem key={index} value={subject}>
                          {subject}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Box>
              {/* Room */}
              <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
                <Typography variant="body1" sx={{ marginRight: 2 }}>
                  Room
                </Typography>
                <Box sx={{ width: 200 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Room</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Room"
                      value={selectedRoom}
                      onChange={handleRoomChange}
                      sx={{ width: "100%" }}
                    >
                      {rooms.map((room, index) => (
                        <MenuItem key={index} value={room}>
                          {room}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Box>
              {/* Day */}
              <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
                <Typography variant="body1" sx={{ marginRight: 2 }}>
                  Day
                </Typography>
                <Box sx={{ width: 200 }}>
                  <FormControl fullWidth>
                    <InputLabel id="day-label">Day</InputLabel>
                    <Select
                      labelId="day-label"
                      id="day"
                      value={selectedDay}
                      onChange={handleDayChange}
                      label="Day"
                    >
                      {daysOfWeek.map((day, index) => (
                        <MenuItem key={index} value={day}>
                          {day}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Box>
              {/* Start Time */}
              <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
                <Typography variant="body1" sx={{ marginRight: 2 }}>
                  Start Time
                </Typography>
                <Box sx={{ width: 200 }}>
                  <FormControl fullWidth>
                    <InputLabel id="start-time-label">Start Time</InputLabel>
                    <Select
                      labelId="start-time-label"
                      id="start-time"
                      value={startTime}
                      onChange={handleStartTimeChange}
                      label="Start Time"
                    >
                      {hours.map((hour, index) => (
                        <MenuItem key={index} value={`${hour}:00`}>
                          {`${hour}:00 ${hour < 12 ? 'AM' : 'PM'}`}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Box>
              {/* End Time */}
              <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
                <Typography variant="body1" sx={{ marginRight: 2 }}>
                  End Time
                </Typography>
                <Box sx={{ width: 200 }}>
                  <FormControl fullWidth>
                    <InputLabel id="end-time-label">End Time</InputLabel>
                    <Select
                      labelId="end-time-label"
                      id="end-time"
                      value={endTime}
                      onChange={handleEndTimeChange}
                      label="End Time"
                    >
                      {hours.map((hour, index) => (
                        <MenuItem key={index} value={`${hour}:00`}>
                          {`${hour}:00 ${hour < 12 ? 'AM' : 'PM'}`}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Box>
              {/* Add Schedule Button */}
              <DialogActions>
                <Button color="error" onClick={handleCloseModal}>
                  Cancel
                </Button>
                <Button color="secondary">Add</Button>
              </DialogActions>

            </form>
          </Paper>
        </Modal>
      </div>
    </React.Fragment >



  );
};

export default AddScheduleButton;
