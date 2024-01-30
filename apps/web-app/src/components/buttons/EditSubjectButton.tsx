import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  CircularProgress,
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
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { trpc } from "@web-app/utils/trpc";
import React, { ChangeEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import FormError from "../errors/FormError";

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
  subjectId: string;
}


export default function EditSubjectButton({ subjectId }: Props) {
  const utils = trpc.useContext();
  const { data: subject, error } = trpc.useQuery(["subject.get", { id: subjectId }]);

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const { data: courses, error: coursesError } = trpc.useQuery(
    ["course.getAll"],
    {},
  );

  const courseMenuItems = courses!.map((course) => (
    <MenuItem key={course.name} value={course.id}>
      {course.name}
    </MenuItem>
  ));

  const [courseID, setCourseID] = useState("");
  const [subjectName, setSubjectName] = useState(subject!.name);
  const [stubCode, setStubCode] = useState(subject!.stubCode);
  const [subjectUnits, setSubjectUnits] = useState(subject!.units);
  const [curriculum, setCurriculum] = useState(subject!.curriculum);
  const [subjectCredits, setSubjectCredits] = useState(subject!.credits);

  const [errors, setErrors] = useState<string[]>([])

  //Edit subject mutation
  const { mutate: updateSubject, isLoading: isUpdatingSubject } =
    trpc.useMutation(["subject.update"], {
      onSuccess: (subject) => {
        toast.success(`Subject "${subject.name}" has been updated`);
        utils.invalidateQueries(["subject.get"]);
        utils.invalidateQueries(["subject.getAll"]);
      },
      onError: () => {
        toast.error("Error updating subject");
      },
    });

  const editSubject = (
    courseId: string,
    name: string,
    stubCode: string,
    curriculum: string,
    units: number,
    credits: number,
  ) => {
    updateSubject({
      courseId,
      name,
      stubCode,
      curriculum,
      units,
      credits
    });
  };

  const clearValues = () => {
    setCourseID("");
    setSubjectName("");
    setStubCode("");
    setCurriculum("");
    setSubjectUnits(0);
    setSubjectCredits(0);
  }

  const handleUnitChange = (e: SelectChangeEvent) => {
    setSubjectUnits(Number(e.target.value));
  };

  const handleCurriculumChange = (e: SelectChangeEvent) => {
    setCurriculum(e.target.value);
  };

  const handleCreditChange = (e: SelectChangeEvent) => {
    setSubjectCredits(Number(e.target.value));
  };

  const handleClickOpen = () => {
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

  const handleFormSubmit = () => {
    const isValid = validateFields();

    if (isValid) {
      editSubject(
        subjectName,
        courseID,
        stubCode,
        curriculum,
        subjectUnits,
        subjectCredits
      );
      clearValues();
      handleClose();
    }
    else {
      handleClickOpen();
    }

  };

  if (!subject) {
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
        <DialogTitle
          style={{ textAlign: "center", backgroundColor: "lavender" }}
        >
          Edit Subject
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
          <Button color="success" onClick={handleFormSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <Toaster />
    </React.Fragment>
  );
}
