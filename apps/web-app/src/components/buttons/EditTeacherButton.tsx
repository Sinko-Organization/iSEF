import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  CircularProgress
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
  teacherId: string;
}

const EditTeacherButton = ({ teacherId }: Props) => {
  const utils = trpc.useContext();
  const { data: teacher, error } = trpc.useQuery(["teacher.get", { teacherId: teacherId }]);

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [inputs, setInputs] = React.useState({
    firstName: teacher!.firstName,
    middleName: teacher!.middleName,
    lastName: teacher!.lastName,
  });
  const [dept, setDept] = useState(teacher!.department);
  const [emp, setEmp] = useState(teacher!.employment);

  const [birthdate, setBirthdate] = useState<Date>(teacher!.birthday);



  //Add teacher mutation
  const { mutate: updateTeacher, isLoading: isUpdatingTeacher } =
    trpc.useMutation(["teacher.update"], {
      onSuccess: (teacher: { teacherId: string }) => {
        utils.invalidateQueries(["teacher.get"]);
        utils.invalidateQueries(["teacher.getAll"]);
        toast.success(`Teacher ID: ${teacher.teacherId} has been updated`);
      },
      onError: () => {
        toast.error("Error updating teacher record");
      },
    });

  const editTeacherRecord = (
    teacherId: string,
    firstName: string,
    middleName: string,
    lastName: string,
    department: Department,
    employment: employmentType,
    birthday: Date,
  ) => {
    updateTeacher({
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
    setDept(e.target.value as string);
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

  const updateTeacherRecord = () => {
    if (
      !inputs["firstName"] &&
      !inputs["middleName"] &&
      !inputs["lastName"] &&
      !dept &&
      !emp &&
      !birthdate
    )
      return;
    editTeacherRecord(
      teacherId,
      inputs["firstName"],
      inputs["middleName"],
      inputs["lastName"],
      dept,
      emp,
      birthdate,
    );
    handleClose();
  };

  if (!teacher) {
    return <CircularProgress />
  }

  return (
    <React.Fragment>
      <div className={classes.container}>
        <IconButton
          onClick={handleClickOpen}
          className={`${classes.button} px-4 py-3 text-lg font-medium`}
        >
          <EditIcon />
        </IconButton>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Teacher</DialogTitle>
        <DialogContent>
          <TextField
            onChange={handleTextChange}
            value={inputs["firstName"]}
            margin="dense"
            name="firstName"
            label="First Name"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            onChange={handleTextChange}
            value={inputs["middleName"]}
            margin="dense"
            name="middleName"
            label="Middle Name"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            onChange={handleTextChange}
            value={inputs["lastName"]}
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
              label="Employment"
              onChange={handleEmpChange}
            >
              <MenuItem value={"fulltime"}>Full-Time</MenuItem>
              <MenuItem value={"parttime"}>Part-Time</MenuItem>
            </Select>
          </div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateField
              label="Birthdate"
              value={dayjs(birthdate)}
              onChange={(newDate) => setBirthdate(dayjs(newDate!).toDate())}
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            color="success"
            disabled={isUpdatingTeacher}
            onClick={updateTeacherRecord}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default EditTeacherButton;
