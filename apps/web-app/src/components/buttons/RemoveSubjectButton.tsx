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
    subCode: string;

}



const RemoveSubjectButton = ({
    subCode,
}: Props) => {
    const utils = trpc.useContext();

    const router = useRouter();

    // remove subject from database
    const { mutate: deleteSubject } = trpc.useMutation(
        ["subjectList.delete"],
        {
            onSuccess: (subject: { subCode: string }) => {
                utils.invalidateQueries(["subjectList.get"]);
                utils.invalidateQueries(["subjectList.getAll"]);
                toast.success(`Subject: ${subject.subCode} has been deleted`);
            },
            onError: () => {
                toast.error("Error deleting subject");
            },
        },
    );

    //   Functions for props
    const removeSubject = (subCode: string) => {
        deleteSubject({
            subCode,
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

    const removeSubjectData = () => {
        removeSubject(subCode);
        handleClose();
        router.push("/subjects")
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
                <DialogTitle id="alert-dialog-title">{"Remove Access"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to DELETE this teacher?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={removeSubjectData} style={{ color: "red" }}>
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

export default RemoveSubjectButton;
