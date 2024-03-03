import { D } from "@mobily/ts-belt";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,

} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { trpc } from "@web-app/utils/trpc";
import React, { ChangeEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormError from "../errors/FormError";
import AddIcon from '@mui/icons-material/Add';




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
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [subjectName, setSubjectName] = useState("");
  const [stubCode, setStubCode] = useState("");
  const [subjectUnits, setSubjectUnits] = useState(0);
  const [curriculum, setCurriculum] = useState("");
  const [subjectCredits, setSubjectCredits] = useState(0);
  const [curriculumOptions, setCurriculumOptions] = useState<string[]>(["2023-2024", "2022-2023", "2021-2022"]);
  const [isAddCurriculumDialogOpen, setIsAddCurriculumDialogOpen] = useState(false);
  const [curriculumInputValue, setCurriculumInputValue] = useState('');


  const [errors, setErrors] = useState<string[]>([])

  const clearValues = () => {
    setSubjectName("");
    setStubCode("");
    setCurriculum("");
    setSubjectUnits(0);
    setSubjectCredits(0);
  }

  const utils = trpc.useContext();

  //Add subject mutation
  const { mutate: addSubject, isLoading: isAddingSubject } = trpc.useMutation(
    ["subjectList.add"],
    {
      onSuccess: (subject) => {
        utils.invalidateQueries(["subjectList.getAll"]);
        toast.success(`Subject "${subject.subCode}" has been added`);
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

  // on clicking "add"
  const handleFormSubmit = () => {
    const isValid = validateFields();

    if (isValid) {
      addSubject(
        {
          title: subjectName,
          subCode: stubCode,
          curriculum: curriculum,
          units: subjectUnits,
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

  // new curriculum
  const [newCurriculum, setNewCurriculum] = useState("");

  const handleNewCurriculumChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewCurriculum(e.target.value);
  };

  const handleNewCurriculumSubmit = () => {
    setCurriculum(newCurriculum);
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
            <Box sx={{ width: 245 }}>
              <Typography sx={{ marginRight: 2 }}> Curriculum </Typography>
            </Box>

            <Autocomplete
              id="subjectUnits"
              options={curriculumOptions.concat(curriculum && !curriculumOptions.includes(curriculum) ? [`Add ${curriculum}`] : [])}
              freeSolo
              value={curriculum}
              openOnFocus
              onInputChange={(event, newInputValue) => {
                setCurriculumInputValue(newInputValue);
              }}
              isOptionEqualToValue={(option, value) => option === value}
              onChange={(event, newValue) => {
                if (newValue && newValue.startsWith("Add ")) {
                  setIsAddCurriculumDialogOpen(true); // Open the add curriculum dialog
                  // TODO: Add the new curriculum to the database here ~ Nang Angelika

                  // Then update the options array
                  setCurriculumOptions((prevOptions) => [...prevOptions, newValue.substring(4)]);
                }

                setCurriculum(newValue || '');
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Curriculum"
                  color="secondary"
                  variant="outlined"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <InputAdornment position="end" >
                        {/^\d{4}-\d{4}$/.test(curriculumInputValue) && !curriculumOptions.includes(curriculumInputValue) ? (
                          <IconButton>
                            {/* TODO: Add the new curriculum to your database in the AddIcon */}
                            <AddIcon />
                          </IconButton>
                        ) : (
                          params.InputProps.endAdornment
                        )}
                      </InputAdornment>
                    ),
                  }}
                  inputProps={{
                    ...params.inputProps,
                    pattern: "\\d{4}-\\d{4}", // This pattern ensures that the input is in the format 0000-0000
                  }}
                />
              )}
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