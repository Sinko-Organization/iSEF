import { Toast } from "@chakra-ui/react";
import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
  TextField,
  Typography,
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
import toast, { Toaster } from "react-hot-toast";
import { e } from "vitest/dist/index-220c1d70";


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

  // start adding the backend stuff here!
interface scheduleDialogProps {
    dayOfTheWeek: string;
}

const SchedulingRow = ({dayOfTheWeek}: scheduleDialogProps) => {
    return <React.Fragment>

            <Box>
                {dayOfTheWeek}
                <Switch>
                </Switch>
                <Checkbox/> All Day
                <Checkbox/> AM 
                <Checkbox/> PM
            </Box>   
        
    </React.Fragment>

}

const AddScheduleButton = () => {

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
    };

    return (
    
    <React.Fragment>
      <div>
        <Button
          color="secondary"
          variant="contained"
          onClick={handleOpen}
          className={`-1 py-3 text-lg font-medium`}
        >
          Add Schedule
        </Button>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle
          style={{
            textAlign: "left",
            backgroundColor: "lavender",
          }}
        >
          Available on Days
        </DialogTitle>
        <DialogContent>

            <SchedulingRow dayOfTheWeek="Monday"/>
            <SchedulingRow dayOfTheWeek="Tuesday"/>
            <SchedulingRow dayOfTheWeek="Wednesday"/>
            <SchedulingRow dayOfTheWeek="Thursday"/>
            <SchedulingRow dayOfTheWeek="Friday"/>
            <SchedulingRow dayOfTheWeek="Saturday"/>

        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            color="secondary"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

    </React.Fragment>
  );
};

export default AddScheduleButton;