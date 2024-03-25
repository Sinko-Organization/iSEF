import React from "react";
import { Button, DialogContent, Typography, DialogActions } from "@mui/material";
import { Add } from "@mui/icons-material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import { B } from "@mobily/ts-belt";


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


const AddPTL = () => {
    const classes = useStyles();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [open, setOpen] = React.useState(false);




    return (
        <React.Fragment>

            <div className={classes.container}>
                <Button
                    color="secondary"
                    className={classes.button}
                    variant="contained"
                    onClick={handleOpen}
                >
                    Add PTL
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

                    <Box sx={{ display: "flex", alignItems: "baseline", marginTop: 2 }} >
                        {/*Subject Code*/}
                        <Box sx={{ width: 245 }}>
                            <Typography sx={{ marginRight: 1, marginBottom: 0 }}>
                                Subject Code
                            </Typography>
                        </Box>
                        <TextField
                            color="secondary"
                            autoFocus
                            margin="dense"
                            fullWidth
                            id="subjectCode"
                            label="Subject Code"
                        />
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "baseline", marginTop: 2 }} >
                        {/*Subject*/}
                        <Box sx={{ width: 245 }}>
                            <Typography sx={{ marginRight: 1, marginBottom: 0 }}>
                                Descriptive Title
                            </Typography>
                        </Box>
                        <TextField
                            color="secondary"
                            autoFocus
                            margin="dense"
                            fullWidth
                            id="descriptiveTitle"
                            label="Descriptive Title"
                        />

                    </Box>

                    <Box sx={{ display: "flex", alignItems: "baseline", marginTop: 2 }} >
                        {/*Teacher ID*/}
                        <Box sx={{ width: 245 }}>
                            <Typography sx={{ marginRight: 1, marginBottom: 0 }}>
                                Teacher ID
                            </Typography>
                        </Box>
                        <TextField
                            color="secondary"
                            autoFocus
                            margin="dense"
                            fullWidth
                            id="Teacher ID"
                        />
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "baseline", marginTop: 2 }} >
                        {/*Sections*/}
                        <Box sx={{ width: 245 }}>
                            <Typography sx={{ marginRight: 1, marginBottom: 0 }}>
                                Sections
                            </Typography>
                        </Box>
                        <TextField
                            color="secondary"
                            autoFocus
                            margin="dense"
                            fullWidth
                            id="Sections"
                        />
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "baseline", marginTop: 2 }} >
                        {/*Lecture Hours*/}
                        <Box sx={{ width: 245 }}>
                            <Typography sx={{ marginRight: 1, marginBottom: 0 }}>
                                Lecture Hours
                            </Typography>
                        </Box>
                        <TextField
                            color="secondary"
                            autoFocus
                            margin="dense"
                            fullWidth
                            id="Lecture Hours"
                        />
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "baseline", marginTop: 2 }} >
                        {/*Lab Hours*/}
                        <Box sx={{ width: 245 }}>
                            <Typography sx={{ marginRight: 1, marginBottom: 0 }}>
                                Lab Hours
                            </Typography>
                        </Box>
                        <TextField
                            color="secondary"
                            autoFocus
                            margin="dense"
                            fullWidth
                            id="Lab Hours"
                        />
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "baseline", marginTop: 2 }} >
                        <Box sx={{ width: 245 }}>
                            <Typography sx={{ marginRight: 1, marginBottom: 0 }}>
                                Remarks
                            </Typography>
                        </Box>
                        <TextField
                            color="secondary"
                            autoFocus
                            margin="dense"
                            fullWidth
                            id="Remarks"
                        />
                    </Box>

                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleClose} color="primary">
                            Add
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}

export default AddPTL;