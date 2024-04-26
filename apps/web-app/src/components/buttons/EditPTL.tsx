import React, { ChangeEvent, useState } from "react";
import { Button, DialogContent, Typography, DialogActions, Autocomplete, AutocompleteRenderInputParams, MenuItem, Select, SelectChangeEvent, CircularProgress } from "@mui/material";
import { Add, SubjectSharp } from "@mui/icons-material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import { B } from "@mobily/ts-belt";
import { trpc } from "@web-app/utils/trpc";
import toast, { Toaster } from "react-hot-toast";
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

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
    id: string;
}


const EditPTL = ({ id }: Props) => {
    const classes = useStyles();
    const utils = trpc.useContext();

    // Query to get PTL data
    const { data: PTLdata, status: PTLDataStatus } = trpc.useQuery([
        "proposedTeachingLoad.get",
        { PTLId: id },
    ]);

    // Query to get teachers
    const { data: teachers, error: teacherError } = trpc.useQuery(["teacher.getAllNoFilter"]);
    // Query to get subjects
    const { data: subjects, error: subjectError } = trpc.useQuery(["subjectList.getAllNoFilter"]);

    const teacherOptions = teachers?.map(teacher => ({
        label: teacher.teacherId,
    })) || [];

    const subjectOptions = subjects?.map(subject => ({
        label: subject.subCode,
    })) || [];

    const [open, setOpen] = useState(false);

    const [teacherId, setTeacherId] = useState(PTLdata?.teacherId);
    const [subCode, setSubCode] = useState(PTLdata?.subCode);
    const [sections, setSections] = useState<number | undefined>(Number(PTLdata?.sections));
    const [lecHours, setLecHours] = useState<number | undefined>(Number(PTLdata?.lecHours));
    const [labHours, setLabHours] = useState<number | undefined>(Number(PTLdata?.labHours));
    const [remarks, setRemarks] = useState(PTLdata?.timeRemarks);
    const [errors, setErrors] = useState<string[]>([])



    //Edit PTL mutation
    const { mutate: editPTL, isLoading: isEditingPTL } = trpc.useMutation(
        ["proposedTeachingLoad.update"],
        {
            onSuccess: () => {
                utils.invalidateQueries(["proposedTeachingLoad.getAll"]);
                utils.invalidateQueries(["proposedTeachingLoad.get"]);
                toast.success(`PTL has been updated`);
            },
            onError: () => {
                toast.error("Error updating PTL");
            },
        },
    );

    const updatePTL = (
        PTLId: string,
        teacherId: string,
        subCode: string,
        sections: number,
        lecHours: number,
        labHours: number,
        timeRemarks: string
    ) => {
        editPTL({
            PTLId,
            teacherId,
            subCode,
            sections,
            lecHours,
            labHours,
            timeRemarks
        });
    };

    const clearValues = () => {
        setTeacherId("");
        setSubCode("");
        setSections(undefined);
        setLecHours(undefined);
        setLabHours(undefined);
        setRemarks("");
    }

    const validateFields = () => {
        const newErrors: string[] = []

        if (teacherId === undefined) {
            newErrors.push("Please provide a teacher ID")
        }

        if (subCode === undefined) {
            newErrors.push("Please provide a subject code")
        }

        if (sections === undefined) {
            newErrors.push("Please select a number of sections")
        }

        if (lecHours === undefined) {
            newErrors.push("Please select a number of lecture hours")
        }

        if (labHours === undefined) {
            newErrors.push("Please select a number of laboratory hours")
        }

        if (remarks.length === 0) {
            newErrors.push("Please provide remarks")
        }

        setErrors(newErrors)
        return newErrors.length === 0;
    }

    // on clicking "submit"
    const handleFormSubmit = () => {
        const isValid = validateFields();

        if (isValid) {
            updatePTL(
                id,
                teacherId,
                subCode,
                sections!,
                lecHours!,
                labHours!,
                remarks
            );
            clearValues();
            handleClose();
        }
        else {
            handleOpen();
        }

    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setErrors([]);
        clearValues();
        setOpen(false);
    };

    const handleSectionsChange = (e: SelectChangeEvent) => {
        setSections(Number(e.target.value));
    };

    const handleLecHoursChange = (e: SelectChangeEvent) => {
        setLecHours(Number(e.target.value));
    };

    const handleLabHoursChange = (e: SelectChangeEvent) => {
        setLabHours(Number(e.target.value));
    };

    const handleRemarksChange = (e: SelectChangeEvent) => {
        setRemarks(e.target.value);
    };

    if (!PTLdata)
        return <CircularProgress />

    return (
        <React.Fragment>

            <div className={classes.container}>
                <Button
                    color="secondary"
                    className={classes.button}
                    variant="contained"
                    onClick={handleOpen}
                >
                    Edit PTL
                </Button>
            </div>


            <Dialog open={open} onClose={handleClose} >

                <DialogTitle
                    style={{
                        textAlign: "center",
                        backgroundColor: "lavender",
                    }}>
                    Edit PTL
                </DialogTitle>

                <DialogContent>

                    <FormError messages={errors} />

                    <Box sx={{ display: "flex", alignItems: "baseline", marginTop: 2 }} >
                        {/*Teacher ID*/}
                        <Box sx={{ width: 245 }}>
                            <Typography sx={{ marginRight: 1, marginBottom: 0 }}>
                                Teacher ID
                            </Typography>
                        </Box>
                        <Autocomplete
                            value={{ label: teacherId }}
                            id="teacherId"
                            sx={{ width: 300 }}
                            options={teacherOptions}
                            getOptionLabel={(option) => option.label}
                            openOnFocus
                            onInputChange={(event, newInputValue) => { setTeacherId(newInputValue); console.log("TEACHERID: ", newInputValue); }}
                            isOptionEqualToValue={(option, value) => option === value}
                            renderInput={(params) => <TextField {...params} label="Teacher ID" />}
                        />
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "baseline", marginTop: 2 }} >
                        {/*Subject Code*/}
                        <Box sx={{ width: 245 }}>
                            <Typography sx={{ marginRight: 1, marginBottom: 0 }}>
                                Subject Code
                            </Typography>
                        </Box>
                        <Autocomplete
                            value={{ label: subCode }}
                            id="subCode"
                            sx={{ width: 300 }}
                            options={subjectOptions}
                            getOptionLabel={(option) => option.label}
                            openOnFocus
                            onInputChange={(event, newInputValue) => { setSubCode(newInputValue), console.log("SUBCODE: ", newInputValue) }}
                            isOptionEqualToValue={(option, value) => option === value}
                            renderInput={(params) => <TextField {...params} label="Subject Code" />}
                        />
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "baseline", marginTop: 2 }} >
                        {/*Sections*/}
                        <Box sx={{ width: 245 }}>
                            <Typography sx={{ marginRight: 1, marginBottom: 0 }}>
                                Sections
                            </Typography>
                        </Box>
                        <Select
                            value={sections}
                            color="secondary"
                            autoFocus
                            margin="dense"
                            fullWidth
                            id="Sections"
                            onChange={handleSectionsChange}
                        >
                            <MenuItem value={0}>0</MenuItem>
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={6}>6</MenuItem>
                        </Select>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "baseline", marginTop: 2 }} >
                        {/*Lecture Hours*/}
                        <Box sx={{ width: 245 }}>
                            <Typography sx={{ marginRight: 1, marginBottom: 0 }}>
                                Lecture Hours
                            </Typography>
                        </Box>
                        <Select
                            value={lecHours}
                            color="secondary"
                            autoFocus
                            margin="dense"
                            fullWidth
                            id="Lecture Hours"
                            onChange={handleLecHoursChange}
                        >
                            <MenuItem value={0}>0</MenuItem>
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={6}>6</MenuItem>
                        </Select>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "baseline", marginTop: 2 }} >
                        {/*Lab Hours*/}
                        <Box sx={{ width: 245 }}>
                            <Typography sx={{ marginRight: 1, marginBottom: 0 }}>
                                Lab Hours
                            </Typography>
                        </Box>
                        <Select
                            value={labHours}
                            color="secondary"
                            autoFocus
                            margin="dense"
                            fullWidth
                            id="Lab Hours"
                            onChange={handleLabHoursChange}
                        >
                            <MenuItem value={0}>0</MenuItem>
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={6}>6</MenuItem>
                        </Select>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "baseline", marginTop: 2 }} >
                        <Box sx={{ width: 245 }}>
                            <Typography sx={{ marginRight: 1, marginBottom: 0 }}>
                                Remarks
                            </Typography>
                        </Box>
                        <TextField
                            value={remarks}
                            color="secondary"
                            autoFocus
                            margin="dense"
                            fullWidth
                            id="Remarks"
                            onChange={handleRemarksChange}
                        />
                    </Box>

                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleFormSubmit} color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
            <Toaster />
        </React.Fragment>
    );
}

export default EditPTL;