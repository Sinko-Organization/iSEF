import { Toast } from "@chakra-ui/react";
import { Add } from "@mui/icons-material";
import {
  Box,
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
import { DateField } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { employmentType } from "@prisma/client";
import { Department } from "@prisma/client";
import { trpc } from "@web-app/utils/trpc";
import dayjs from "dayjs";
import React, { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";

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
  const [dept, setDept] = useState("");
  const [emp, setEmp] = useState("");

  const [birthdate, setBirthdate] = useState<Date>(new Date());

  const utils = trpc.useContext();

  //Add teacher mutation
  const { mutate: addTeacher, isLoading: isAddingTeacher } = trpc.useMutation(
    ["teacher.add"],
    {
      onSuccess: (teacher: { teacherId: string }) => {
        utils.invalidateQueries(["teacher.getAll"]);
        toast.success(`Teacher ID: ${teacher.teacherId} has been added`);
      },
      onError: () => {
        toast.error("Error adding teacher record");
      },
    },
  );

  const addTeacherRecord = (
    teacherId: string,
    firstName: string,
    middleName: string,
    lastName: string,
    department: Department,
    employment: employmentType,
    birthday: Date,
  ) => {
    addTeacher({
      teacherId,
      firstName,
      middleName,
      lastName,
      department,
      employment,
      birthday,
    });
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputs({
      ...inputs,
      [e.target.name]: value,
    });
    console.log(inputs);
  };

  const handleDeptChange = (e: SelectChangeEvent) => {
    setDept(e.target.value);
  };

  const handleEmpChange = (e: SelectChangeEvent) => {
    setEmp(e.target.value as string);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addNewTeacher = () => {
    if (
      !inputs["teacherId"] &&
      !inputs["firstName"] &&
      !inputs["middleName"] &&
      !inputs["lastName"] &&
      !dept &&
      !emp &&
      !birthdate

    )
      return;
    addTeacherRecord(
      inputs["teacherId"],
      inputs["firstName"],
      inputs["middleName"],
      inputs["lastName"],
      dept,
      emp,
      birthdate,
    );
    handleClose();
  };

  return (
    <React.Fragment>
      <div className={classes.container}>
        <Button
          color="secondary"
          variant="contained"
          onClick={handleClickOpen}
          className={`${classes.button} px-1 py-3 text-lg font-medium`}
        >
          Add Teacher
        </Button>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle
          style={{
            textAlign: "center",
            backgroundColor: "lavender",
          }}
        >
          Add Teacher
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", alignItems: "flex-end", marginTop: 3 }}>
            <Box sx={{ width: 160 }}>
              <Typography sx={{ marginRight: 2 }}> Teacher ID</Typography>
            </Box>
            <TextField
              color="secondary"
              onChange={handleTextChange}
              autoFocus
              margin="dense"
              name="teacherId"
              type="text"
              variant="filled"
              fullWidth
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <Box sx={{ width: 160 }}>
              <Typography sx={{ marginRight: 2 }}> First Name</Typography>
            </Box>

            <TextField
              color="secondary"
              onChange={handleTextChange}
              margin="dense"
              name="firstName"
              type="text"
              fullWidth
              variant="filled"
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <Box sx={{ width: 160 }}>
              <Typography sx={{ marginRight: 2 }}> Middle Name</Typography>
            </Box>

            <TextField
              color="secondary"
              onChange={handleTextChange}
              margin="dense"
              name="middleName"
              type="text"
              fullWidth
              variant="filled"
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <Box sx={{ width: 160 }}>
              <Typography sx={{ marginRight: 2 }}> Last Name</Typography>
            </Box>
            <TextField
              color="secondary"
              onChange={handleTextChange}
              margin="dense"
              name="lastName"
              type="text"
              fullWidth
              variant="filled"
            />
          </Box>

          <Box
            component="form"
            noValidate
            sx={{
              display: "flex",
              alignItems: "center",
              "& .MuiTextField-root": { m: 1, width: "40ch" },
            }}
          >
            <Box sx={{ width: 160 }}>
              <Typography sx={{ marginRight: 2 }}> Department</Typography>
            </Box>
            <Box>
              <TextField
                defaultValue=""
                onChange={handleDeptChange}
                id="department"
                select
                value={dept}
                color="secondary"
              >
                <MenuItem value={"Packaging"}>Packaging</MenuItem>
                <MenuItem value={"Civil"}>Civil</MenuItem>
                <MenuItem value={"Mechanical"}>Mechanical</MenuItem>
                <MenuItem value={"Electrical"}>Electrical</MenuItem>
                <MenuItem value={"Electronics"}>Electronics</MenuItem>
                <MenuItem value={"Software"}>Software</MenuItem>
              </TextField>
            </Box>
          </Box>

          <Box
            component="form"
            sx={{
              display: "flex",
              alignItems: "center",
              "& .MuiTextField-root": { m: 1, width: "40ch" },
            }}
          >
            <Box sx={{ width: 160 }}>
              <Typography sx={{ marginRight: 2 }}>Employment</Typography>
            </Box>
            <Box>
              <TextField
                defaultValue=""
                onChange={handleEmpChange}
                id="employment"
                select
                value={emp}
                color="secondary"
              >
                <MenuItem value={"fulltime"}>Full-Time</MenuItem>
                <MenuItem value={"parttime"}>Part-Time</MenuItem>
              </TextField>
            </Box>
          </Box>

          <Box
            component="form"
            sx={{
              display: "flex",
              alignItems: "center",
              "& .MuiTextField-root": { m: 1, width: "40ch" },
            }}
          >
            <Box>
              <Typography sx={{ marginRight: 11.7 }}>Birthdate</Typography>
            </Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateField
                color="secondary"
                label="Birthdate"
                value={dayjs(birthdate)}
                onChange={(newDate) => setBirthdate(dayjs(newDate!).toDate())}
              />
            </LocalizationProvider>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            color="secondary"
            disabled={isAddingTeacher}
            onClick={addNewTeacher}

          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default AddTeachersButton;
