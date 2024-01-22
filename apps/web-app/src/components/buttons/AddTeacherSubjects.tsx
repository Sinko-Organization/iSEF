import { D } from "@mobily/ts-belt";
import {
  Box,
  Button,
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
import toast from "react-hot-toast";
import { SelectChangeEvent } from "@mui/material/Select";



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
  const [inputs, setInputs] = React.useState({
    Subject: "",
    SubjectCode: "",
    SubjectName: "",
    SubjectUnits: "",
  });

  const [subject, setSubject] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [subjectUnits, setSubjectUnits] = useState("");
  const [curriculum, setCurriculum] = useState("");


  const handleUnitChange = (e: SelectChangeEvent) => {
    setSubjectUnits(e.target.value);
  };

  const handleCurriculumChange = (e: SelectChangeEvent) => {
    setCurriculum(e.target.value);
  };

  return (
    <React.Fragment>
      <div className={classes.container}>
        <Button
          color="secondary"
          className={classes.button}
          variant="contained"
          onClick={() => setOpen(true)}
        >
          Add Subject
        </Button>
      </div>

      <Dialog open={open} onClose={() => setOpen(false)} >
        <DialogTitle
          style={{
            textAlign: "center",
            backgroundColor: "lavender",
          }}>
          Add Subject
        </DialogTitle>
        
        <DialogContent>

          <Box sx={{ display: "flex", alignItems: "flex-end", marginTop: 3 }}>
            <Box sx={{ width: 160 }}>
              <Typography sx={{ marginRight: 2 }}>Subject</Typography>
            </Box>
            <TextField
              color="secondary"
              autoFocus
              margin="dense"
              fullWidth
              id="subject"
              label="Subject"
              variant="filled"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
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
              id="subjectCode"
              label="Subject Code"
              variant="filled"
              value={subjectCode}
              onChange={(e) => setSubjectCode(e.target.value)}
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
                <MenuItem value={"1"}>1</MenuItem>
                <MenuItem value={"2"}>2</MenuItem>
                <MenuItem value={"3"}>3</MenuItem>
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
              </TextField>
            </Box>
          </Box>


        </DialogContent>
      </Dialog>
    </React.Fragment>
  )
}

export default AddSubjectsButton;