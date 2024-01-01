import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
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
  Typography,
  CircularProgress
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DateField } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { employmentType } from "@prisma/client";
import { Department } from "@prisma/client";
import FormError from "../errors/FormError";
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
    color: "green",
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

  const [errors, setErrors] = useState<string[]>([])



  //Edit teacher mutation
  const { mutate: updateTeacher, isLoading: isUpdatingTeacher } =
    trpc.useMutation(["teacher.update"], {
      onSuccess: (teacher: { teacherId: string }) => {
        toast.success(`Teacher ID: ${teacher.teacherId} has been updated`);
        utils.invalidateQueries(["teacher.get"]);
        utils.invalidateQueries(["teacher.getAll"]);
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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setErrors([]);
    setOpen(false);
  };

  const validateFields = () => {
    const newErrors: string[] = []

    if (
      inputs["firstName"].length === 0 &&
      inputs["middleName"].length === 0 &&
      inputs["lastName"].length === 0) {
      newErrors.push("Name fields cannot be empty")
    }

    const age = calculateAge(birthdate);
    if (age < 20 || age > 65) {
      newErrors.push('Age must be between 20 and 65.');
    }

    setErrors(newErrors)
    return newErrors.length === 0;
  }

  const handleFormSubmit = () => {

    const isValid = validateFields();

    if (isValid) {
      editTeacherRecord(
        teacherId,
        capitalizeNames(inputs["firstName"]),
        capitalizeNames(inputs["middleName"]),
        capitalizeNames(inputs["lastName"]),
        dept,
        emp,
        birthdate,
      );
      handleClose();
    } else {
      handleOpen();
    }
  };

  if (!teacher) {
    return <CircularProgress />
  }

  return (
    <React.Fragment>
      <div className={classes.container}>
        <IconButton
          onClick={handleOpen}
          className={`${classes.button} px-4 py-3 text-lg font-medium`}
        >
          <EditIcon />
        </IconButton>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle
          style={{
            textAlign: "center",
            backgroundColor: "lavender",
          }}
        >Edit Teacher</DialogTitle>

        <FormError messages={errors} />

        <div>
          fn: {inputs["firstName"].length}
        </div>
        <div>
          mn: {inputs["middleName"].length}
        </div>
        <div>
          ln: {inputs["lastName"].length}
        </div>

        <DialogContent>
          <Box sx={{ display: "flex", alignItems: "flex-end", marginTop: 3 }}>
            <Box sx={{ width: 160 }}>
              <Typography sx={{ marginRight: 2 }}> First Name</Typography>
            </Box>
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
          </Box>

          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <Box sx={{ width: 160 }}>
              <Typography sx={{ marginRight: 2 }}> Middle Name</Typography>
            </Box>

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
          </Box>

          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <Box sx={{ width: 160 }}>
              <Typography sx={{ marginRight: 2 }}> Last Name</Typography>
            </Box>
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
            color="success"
            disabled={isUpdatingTeacher}
            onClick={handleFormSubmit}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default EditTeacherButton;

const capitalizeNames = (name: string): string => name.replace(/\b\w/g, (match) => match.toUpperCase());

const calculateAge = (birthdate: Date): number => {
  const currentDate = new Date();
  const birthYear = birthdate.getFullYear();
  const currentYear = currentDate.getFullYear();

  let age = currentYear - birthYear;

  // Adjust age if the birthday hasn't occurred yet this year
  const birthMonth = birthdate.getMonth();
  const currentMonth = currentDate.getMonth();
  const birthDay = birthdate.getDate();
  const currentDay = currentDate.getDate();

  if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
    age--;
  }

  return age;
};