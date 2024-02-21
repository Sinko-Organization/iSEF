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
  subCode: string;
}


export default function EditSubjectButton({ subCode }: Props) {
  const utils = trpc.useContext();
  const { data: subject, error } = trpc.useQuery(["subjectList.get", { subCode: subCode }]);

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [subjectName, setSubjectName] = useState(subject!.title);
  const [stubCode, setStubCode] = useState(subject!.subCode);
  const [subjectUnits, setSubjectUnits] = useState(subject!.units);
  const [curriculum, setCurriculum] = useState(subject!.curriculum);
  const [subjectCredits, setSubjectCredits] = useState(subject!.credits);


  const [errors, setErrors] = useState<string[]>([])

  const clearValues = () => {
    setSubjectName("");
    setStubCode("");
    setCurriculum("");
    setSubjectUnits(0);
    setSubjectCredits(0);
  }

  //Edit subject mutation
  const { mutate: updateSubject, isLoading: isUpdatingSubject } = trpc.useMutation(
    ["subjectList.update"],
    {
      onSuccess: (subject) => {
        toast.success(`Subject "${subject.subCode}" has been updated`);
        utils.invalidateQueries(["subjectList.getAll"]);
        utils.invalidateQueries(["subjectList.get"]);
      },
      onError: () => {
        toast.error("Error updating subject");
      },
    },
  );

  const editSubject = (
    title: string,
    subCode: string,
    units: number,
    credits: number,
    curriculum: string
  ) => {
    updateSubject({
      units,
      credits,
      subCode,
      title,
      curriculum,
    });
  };


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
    clearValues();
    setOpen(false);
  };


  const validateFields = () => {
    const newErrors: string[] = []

    if (subjectName.length === 0) {
      newErrors.push("Please provide a subject name")
    }

    if (stubCode.length === 0) {
      newErrors.push("Please provide a subject code")
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

    setErrors(newErrors)
    return newErrors.length === 0;
  }

  // on clicking "submit"
  const handleFormSubmit = () => {
    const isValid = validateFields();

    if (isValid) {
      editSubject(
        subjectName,
        stubCode,
        subjectUnits,
        subjectCredits,
        curriculum
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

          <Box sx={{ display: "flex", alignItems: "baseline", marginTop: 2 }}>
            <Box sx={{ width: 245 }}>
              <Typography sx={{ marginRight: 1, marginBottom: 0 }}>Subject Title</Typography>
            </Box>
            <TextField
              color="secondary"
              autoFocus
              margin="dense"
              fullWidth
              id="subjectName"
              label="Subject Name"
              // variant="filled"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "baseline", marginTop: 1 }}>
            <Box sx={{ width: 245 }}>
              <Typography sx={{ marginRight: 1, marginBottom: 0 }}>Subject Code</Typography>
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
                <MenuItem value={"2022-2023"}>2023-2024</MenuItem>
                <MenuItem value={"2021-2022"}>2022-2023</MenuItem>
                <MenuItem value={"2021-2022"}>2021-2022</MenuItem>
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
              <Typography sx={{ marginRight: 2 }}> Subject Units </Typography>
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
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
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
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
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
            disabled={isUpdatingSubject}
            onClick={handleFormSubmit}

          >
            Submit
          </Button>
        </DialogActions>


      </Dialog>
      <Toaster />
    </React.Fragment>
  )
}
