import { Delete } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { trpc } from "@web-app/utils/trpc";
import { useRouter } from "next/router";
import React from "react";
import toast from "react-hot-toast";

const useStyles = makeStyles({
  container: {
    display: "flex",
    alignItems: "center",
  },
  button: {
    color: "red",
  },
});

interface Props {
  teacherId: string;

}



const RemoveTeacherButton = ({
  teacherId,
}: Props) => {
  const utils = trpc.useContext();

  const router = useRouter();

  // remove teacher from database
  const { mutate: deleteTeacher } = trpc.useMutation(
    ["teacher.delete"],
    {
      onSuccess: (teacher: { teacherId: string }) => {
        utils.invalidateQueries(["teacher.get"]);
        utils.invalidateQueries(["teacher.getAll"]);
        toast.success(`Teacher ID: ${teacher.teacherId} has been deleted`);
      },
      onError: () => {
        toast.error("Error deleting teacher record");
      },
    },
  );

  //   Functions for props
  const removeTeacherRecord = (teacherId: string) => {
    deleteTeacher({
      teacherId,
    });
  };

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const removeTeacher = () => {
    removeTeacherRecord(teacherId);
    handleClose();
    router.push("/teacher-management")
  };
  return (
    <React.Fragment>
      <div className={classes.container}>
        <IconButton
          onClick={handleClickOpen}
          className={`${classes.button} px-4 py-3 text-lg font-medium`}
        >
          <Delete /> {/* Render the trash can icon */}
        </IconButton>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Teacher"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to DELETE this teacher?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={removeTeacher} style={{ color: "red" }}>
            Delete
          </Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default RemoveTeacherButton;
