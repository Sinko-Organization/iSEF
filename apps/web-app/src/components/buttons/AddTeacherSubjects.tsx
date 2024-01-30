import { D } from "@mobily/ts-belt";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
  Typography,

} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { trpc } from "@web-app/utils/trpc";
import React, { ChangeEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { SelectChangeEvent } from "@mui/material/Select";
import FormError from "../errors/FormError";



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


const AddSubjectsButton = () => {

  const { data: courses, error: coursesError } = trpc.useQuery(
    ["course.getAll"],
    {},
  );

  const courseMenuItems = courses!.map((course) => (
    <MenuItem key={course.name} value={course.id}>
      {course.name}
    </MenuItem>
  ));

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [courseID, setCourseID] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [stubCode, setStubCode] = useState("");
  const [subjectUnits, setSubjectUnits] = useState(0);
  const [curriculum, setCurriculum] = useState("");
  const [subjectCredits, setSubjectCredits] = useState(0);


  const [errors, setErrors] = useState<string[]>([])

  const clearValues = () => {
    setCourseID("");
    setSubjectName("");
    setStubCode("");
    setCurriculum("");
    setSubjectUnits(0);
    setSubjectCredits(0);
  }

  const utils = trpc.useContext();

  //Add subject mutation
  const { mutate: addSubject, isLoading: isAddingSubject } = trpc.useMutation(
    ["subject.add"],
    {
      onSuccess: (subject) => {
        utils.invalidateQueries(["subject.getAll"]);
        toast.success(`Subject "${subject.name}" has been added`);
      },
      onError: () => {
        toast.error("Error adding subject");
      },
    },
  );


  const handleUnitChange = (e: SelectChangeEvent) => {
    setSubjectUnits(Number(e.target.value));
  };

  const handleCurriculumChange = (e: SelectChangeEvent) => {
    setCurriculum(e.target.value);
  };

  const handleCreditChange = (e: SelectChangeEvent) => {
    setSubjectCredits(Number(e.target.value));
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

    if (courseID.length === 0) {
      newErrors.push("Please select a course")
    }

    if (subjectName.length === 0) {
      newErrors.push("Please provide a subject name")
    }

    if (stubCode.length === 0) {
      newErrors.push("Please provide a stub code")
    }

    if (subjectUnits === 0) {
      newErrors.push("Please select a number of units")
    }

    if (curriculum.length === 0) {
      newErrors.push("Please select a curriculum")
    }

    if (subjectCredits === 0) {
      newErrors.push("Please select a number of credits")
    }

    // const VALID_CURRICULUM = /^\d{4}-\d{4}$/;
    // if (!VALID_CURRICULUM.test(curriculum)) {
    //   newErrors.push('Invalid curriculum input. Must be in the form XXXX-XXXX.');
    // }

    setErrors(newErrors)
    return newErrors.length === 0;
  }

  // on clicking "add"
  const handleFormSubmit = () => {
    const isValid = validateFields();

    if (isValid) {
      addSubject(
        {
          name: subjectName,
          courseId: courseID,
          stubCode: stubCode,
          units: subjectUnits,
          curriculum: curriculum,
          credits: subjectCredits
        }
      );
      clearValues();
      handleClose();
    }
    else {
      handleOpen();
    }

  };

  return (
    <React.Fragment>
      <div className={classes.container}>
        <Button
          color="secondary"
          className={classes.button}
          variant="contained"
          onClick={handleOpen}
        >
          Add Subject
        </Button>
      </div>

      <Dialog open={open} onClose={handleClose} >
        <DialogTitle
          style={{
            textAlign: "center",
            backgroundColor: "lavender",
          }}>
          Add Subject
        </DialogTitle>


        <DialogContent>

          <FormError messages={errors} />

          <Box sx={{ display: "flex", alignItems: "flex-end", marginTop: 3 }}>
            <Box sx={{ width: 160 }}>
              <Typography sx={{ marginRight: 2 }}>Subject</Typography>
            </Box>
            <TextField
              color="secondary"
              autoFocus
              margin="dense"
              fullWidth
              id="course"
              label="Course"
              // variant="filled"
              value={courseID}
              onChange={(e) => setCourseID(e.target.value)}
            >
              {!courses ? <CircularProgress /> : courseMenuItems}
            </TextField>
          </Box>

          <Box sx={{ display: "flex", alignItems: "flex-end", marginTop: 3 }}>
            <Box sx={{ width: 160 }}>
              <Typography sx={{ marginRight: 2 }}>Subject Name</Typography>
            </Box>
            <TextField
              color="secondary"
              autoFocus
              margin="dense"
              fullWidth
              id="subjectName"
              label="Subject Name"
              variant="filled"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "flex-end", marginTop: 3 }}>
            <Box sx={{ width: 160 }}>
              <Typography sx={{ marginRight: 2 }}>Subject Code</Typography>
            </Box>
            <TextField
              color="secondary"
              autoFocus
              margin="dense"
              fullWidth
              id="stubCode"
              label="Stub Code"
              // variant="filled"
              value={stubCode}
              onChange={(e) => setStubCode(e.target.value)}
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
              <Typography sx={{ marginRight: 2 }}> Curriculum </Typography>
            </Box>
            <Box>
              <TextField
                defaultValue=""
                onChange={handleCurriculumChange}
                id="subjectUnits"
                select
                value={curriculum}
                color="secondary"
              >
                <MenuItem value={"2022-2023"}>2022-2023</MenuItem>
                <MenuItem value={"2021-2022"}>2022-2023</MenuItem>
              </TextField>
            </Box>
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
              <Typography sx={{ marginRight: 2 }}> Subject Unit </Typography>
            </Box>
            <Box>
              <TextField
                defaultValue=""
                onChange={handleUnitChange}
                id="subjectUnits"
                select
                value={subjectUnits}
                color="secondary"
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
              </TextField>
            </Box>
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
              <Typography sx={{ marginRight: 2 }}> Subject Credits </Typography>
            </Box>
            <Box>
              <TextField
                defaultValue=""
                onChange={handleCreditChange}
                id="subjectCredits"
                select
                value={subjectCredits}
                color="secondary"
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
              </TextField>
            </Box>
          </Box>


        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            color="secondary"
            disabled={isAddingSubject}
            onClick={handleFormSubmit}

          >
            Add
          </Button>
        </DialogActions>


      </Dialog>
      <Toaster />
    </React.Fragment>
  )
}

export default AddSubjectsButton;