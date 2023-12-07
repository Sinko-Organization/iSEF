import { Add } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { employmentType } from "@prisma/client";
import { Department } from "@prisma/client";
import React, { ChangeEvent, useState } from "react";

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

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  disabled?: boolean;
}

const AddTeachersButton = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [inputs, setInputs] = React.useState({
    teacherId: "",
    firstName: "",
    middleName: "",
    lastName: "",
  });
  // const [inputTId, SetTId] = useState("");
  // const [firstName, setFirstName] = useState("");
  // const [middleName, setMiddleName] = useState("");
  // const [lastName, setLastName] = useState("");
  const [dept, setDept] = useState("");
  const [emp, setEmp] = useState("");

  const handleTextChange = (e) => {
    const value = e.target.value;
    setInputs({
      ...inputs,
      [e.target.name]: value,
    });
    console.log(inputs);
  };

  const handleDeptChange = (e: SelectChangeEvent) => {
    setDept(e.target.value as string);
    console.log(dept);
  };

  const handleEmpChange = (e: SelectChangeEvent) => {
    setEmp(e.target.value as string);
    console.log(emp);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <div className={classes.container}>
        <Typography variant="body1" className={classes.text}>
          Add Teachers
        </Typography>
        <IconButton
          onClick={handleClickOpen}
          className={`${classes.button} px-4 py-3 text-lg font-medium`}
        >
          <Add />
        </IconButton>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Teacher</DialogTitle>
        <DialogContent>
          <TextField
            onChange={handleTextChange}
            autoFocus
            margin="dense"
            name="teacherId"
            label="Teacher ID"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            onChange={handleTextChange}
            margin="dense"
            name="firstName"
            label="First Name"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            onChange={handleTextChange}
            margin="dense"
            name="middleName"
            label="Middle Name"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            onChange={handleTextChange}
            margin="dense"
            name="lastName"
            label="Last Name"
            type="text"
            fullWidth
            variant="standard"
          />
          <div style={{ width: "300px" }}>
            <Select
              defaultValue=""
              id="department"
              value={dept}
              label="Department"
              onChange={handleDeptChange}
            >
              <MenuItem value={"Packaging"}>Packaging</MenuItem>
              <MenuItem value={"Civil"}>Civil</MenuItem>
              <MenuItem value={"Mechanical"}>Mechanical</MenuItem>
              <MenuItem value={"Electrical"}>Electrical</MenuItem>
              <MenuItem value={"Electronics"}>Electronics</MenuItem>
              <MenuItem value={"Software"}>Software</MenuItem>
            </Select>
          </div>
          <div style={{ width: "300px" }}>
            <Select
              defaultValue=""
              id="employment"
              value={emp}
              label="Employment Status"
              onChange={handleEmpChange}
            >
              <MenuItem value={"fulltime"}>Full-Time</MenuItem>
              <MenuItem value={"parttime"}>Part-Time</MenuItem>
            </Select>
          </div>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button color="success" onClick={handleClose}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default AddTeachersButton;
