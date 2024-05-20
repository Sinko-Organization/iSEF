import React, { ChangeEvent, useState } from "react";
import { Button, DialogContent, Typography, DialogActions, Autocomplete, AutocompleteRenderInputParams, MenuItem, Select, SelectChangeEvent } from "@mui/material";
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
import DaysOfWeek from "@web-app/server/scheduling/types/DaysOfWeek";
import { Time, timeArray } from "@web-app/server/scheduling/types/Time";


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

const daysOfWeek: DaysOfWeek[] = ["M", "T", "W", "TH", "F", "S"];

const AddPTL = () => {
    const classes = useStyles();
    const utils = trpc.useContext();

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

    const [teacherId, setTeacherId] = useState("");
    const [subCode, setSubCode] = useState("");
    const [sections, setSections] = useState<number | undefined>(0);
    const [lecHours, setLecHours] = useState<number | undefined>(0);
    const [labHours, setLabHours] = useState<number | undefined>(0);
    const [timeRemarks, setTimeRemarks] = useState({
        days: [] as DaysOfWeek[],
        startTime: "",
        endTime: ""
    });
    const [errors, setErrors] = useState<string[]>([])

    //Add PTL mutation
    const { mutate: addPTL, isLoading: isAddingPTL } = trpc.useMutation(
        ["proposedTeachingLoad.add"],
        {
            onSuccess: (teacher: { teacherId: string }) => {
                utils.invalidateQueries(["proposedTeachingLoad.getAll"]);
                toast.success(`PTL has been added`);
            },
            onError: () => {
                toast.error("Error adding teacher record");
            },
        },
    );

    const addNewPTL = (
        teacherId: string,
        subCode: string,
        sections: number,
        lecHours: number,
        labHours: number,
        timeRemarks: { days: DaysOfWeek[], startTime: string, endTime: string }
    ) => {
        addPTL({
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
        setTimeRemarks({
            days: [],
            startTime: "",
            endTime: ""
        });
    };

    const validateFields = () => {
        const newErrors: string[] = [];

        if (teacherId.length === 0) {
            newErrors.push("Please provide a teacher ID");
        }

        if (subCode.length === 0) {
            newErrors.push("Please provide a subject code");
        }

        if (sections === undefined) {
            newErrors.push("Please select a number of sections");
        }

        if (lecHours === undefined) {
            newErrors.push("Please select a number of lecture hours");
        }

        if (labHours === undefined) {
            newErrors.push("Please select a number of laboratory hours");
        }

        // if (timeRemarks.days.length === 0) {
        //     newErrors.push("Please select the days");
        // }

        if (timeRemarks.startTime.length === 0) {
            newErrors.push("Please select a start time");
        }

        if (timeRemarks.endTime.length === 0) {
            newErrors.push("Please select an end time");
        }

        setErrors(newErrors);
        return newErrors.length === 0;
    };

    // on clicking "add"
    const handleFormSubmit = () => {
        const isValid = validateFields();

        if (isValid) {
            addNewPTL(
                teacherId,
                subCode,
                sections!,
                lecHours!,
                labHours!,
                timeRemarks
            );
            clearValues();
            handleClose();
        } else {
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

    const handleDaysChange = (event: React.SyntheticEvent, newValue: DaysOfWeek[]) => {
        if (newValue.length === 0) {
            setTimeRemarks((prev) => ({ ...prev, days: daysOfWeek }));
        } else {
            setTimeRemarks((prev) => ({ ...prev, days: newValue }));
        }
    };

    const handleStartTimeChange = (event: React.SyntheticEvent, newValue: Time | null) => {
        setTimeRemarks((prev) => ({ ...prev, startTime: newValue || "" }));
    };

    const handleEndTimeChange = (event: React.SyntheticEvent, newValue: Time | null) => {
        setTimeRemarks((prev) => ({ ...prev, endTime: newValue || "" }));
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
                    Add PTL
                </Button>
            </div>


            <Dialog open={open} onClose={handleClose} >

                <DialogTitle
                    style={{
                        textAlign: "center",
                        backgroundColor: "lavender",
                    }}>
                    Add PTL
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
                            id="teacherId"
                            sx={{ width: 300 }}
                            options={teacherOptions}
                            getOptionLabel={(option) => option.label}
                            openOnFocus
                            onInputChange={(event, newInputValue) => setTeacherId(newInputValue)}
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
                            id="subCode"
                            sx={{ width: 300 }}
                            options={subjectOptions}
                            getOptionLabel={(option) => option.label}
                            openOnFocus
                            onInputChange={(event, newInputValue) => setSubCode(newInputValue)}
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

                    <Box sx={{ display: "flex", alignItems: "baseline", marginTop: 2 }}>
                        {/* Days */}
                        <Box sx={{ width: 245 }}>
                            <Typography sx={{ marginRight: 1, marginBottom: 0 }}>
                                Days
                            </Typography>
                        </Box>
                        <Autocomplete
                            multiple
                            id="days"
                            options={daysOfWeek}
                            getOptionLabel={(option) => option}
                            onChange={handleDaysChange}
                            renderInput={(params) => <TextField {...params} label="Days" />}
                        />
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "baseline", marginTop: 2 }}>
                        {/* Start Time */}
                        <Box sx={{ width: 245 }}>
                            <Typography sx={{ marginRight: 1, marginBottom: 0 }}>
                                Start Time
                            </Typography>
                        </Box>
                        <Autocomplete
                            id="startTime"
                            options={timeArray}
                            getOptionLabel={(option) => option}
                            onChange={handleStartTimeChange}
                            renderInput={(params) => <TextField {...params} label="Start Time" />}
                        />
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "baseline", marginTop: 2 }}>
                        {/* End Time */}
                        <Box sx={{ width: 245 }}>
                            <Typography sx={{ marginRight: 1, marginBottom: 0 }}>
                                End Time
                            </Typography>
                        </Box>
                        <Autocomplete
                            id="endTime"
                            options={timeArray}
                            getOptionLabel={(option) => option}
                            onChange={handleEndTimeChange}
                            renderInput={(params) => <TextField {...params} label="End Time" />}
                        />
                    </Box>


                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleFormSubmit} color="primary">
                            Add
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
            <Toaster />
        </React.Fragment>
    );
}

export default AddPTL;