import React, { ChangeEvent, useEffect, useState } from "react";
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
import DaysOfWeek from "@web-app/server/scheduling/types/DaysOfWeek";
import { Time, timeArray } from "@web-app/server/scheduling/types/Time";
import { JSONValue } from "superjson/dist/types";


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

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
    id: string;
}

interface TimeRemarks {
    days: DaysOfWeek[];
    startTime: string;
    endTime: string;
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

    const [teacherId, setTeacherId] = useState<string | undefined>(undefined);
    const [subCode, setSubCode] = useState<string | undefined>(undefined);
    const [sections, setSections] = useState<number | undefined>(undefined);
    const [lecHours, setLecHours] = useState<number | undefined>(undefined);
    const [labHours, setLabHours] = useState<number | undefined>(undefined);
    const [timeRemarks, setTimeRemarks] = useState<TimeRemarks>({
        days: [] as DaysOfWeek[],
        startTime: "",
        endTime: ""
    });
    const [errors, setErrors] = useState<string[]>([]);

    const isTimeRemarks = (value: any): value is TimeRemarks => {
        return (
            value &&
            typeof value === "object" &&
            Array.isArray(value.days) &&
            typeof value.startTime === "string" &&
            typeof value.endTime === "string"
        );
    };

    // Set initial state values once PTLdata is loaded
    useEffect(() => {
        if (PTLdata) {
            setTeacherId(PTLdata.teacherId);
            setSubCode(PTLdata.subCode);
            setSections(PTLdata.sections);
            setLecHours(PTLdata.lecHours);
            setLabHours(PTLdata.labHours);

            if (isTimeRemarks(PTLdata.timeRemarks)) {
                setTimeRemarks(PTLdata.timeRemarks);
            } else {
                setTimeRemarks({ days: [], startTime: "", endTime: "" });
            }
        }
    }, [PTLdata]);



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
        timeRemarks: { days: DaysOfWeek[], startTime: string, endTime: string }
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

    const validateFields = () => {
        const newErrors: string[] = [];

        if (!teacherId) {
            newErrors.push("Please provide a teacher ID");
        }

        if (!subCode) {
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

    // on clicking "submit"
    const handleFormSubmit = () => {
        const isValid = validateFields();

        if (isValid) {
            updatePTL(
                id,
                teacherId!,
                subCode!,
                sections!,
                lecHours!,
                labHours!,
                timeRemarks
            );
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
        setOpen(false);
    };

    const handleSectionsChange = (e: SelectChangeEvent<string>) => {
        setSections(Number(e.target.value));
    };

    const handleLecHoursChange = (e: SelectChangeEvent<string>) => {
        setLecHours(Number(e.target.value));
    };

    const handleLabHoursChange = (e: SelectChangeEvent<string>) => {
        setLabHours(Number(e.target.value));
    };

    const handleDaysChange = (event: React.SyntheticEvent, newValue: DaysOfWeek[]) => {
        if (newValue.length === 0) {
            setTimeRemarks((prev) => ({ ...prev, days: daysOfWeek }));
        } else {
            setTimeRemarks((prev) => ({ ...prev, days: newValue }));
        }
    };

    const handleStartTimeChange = (
        event: React.SyntheticEvent,
        value: string | null,
        reason: any
    ) => {
        setTimeRemarks((prev) => ({ ...prev, startTime: value as Time }));
    };

    const handleEndTimeChange = (
        event: React.SyntheticEvent,
        value: string | null,
        reason: any
    ) => {
        setTimeRemarks((prev) => ({ ...prev, endTime: value as Time }));
    };

    const getOptionLabel = (option: { label: string | undefined }): string => {
        return option.label || '';
    };

    if (!PTLdata) {
        return <CircularProgress />;
    }

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
                            getOptionLabel={getOptionLabel}
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
                            value={{ label: subCode }}
                            id="subCode"
                            sx={{ width: 300 }}
                            options={subjectOptions}
                            getOptionLabel={getOptionLabel}
                            openOnFocus
                            onInputChange={(event, newInputValue) => setSubCode(newInputValue)}
                            isOptionEqualToValue={(option, value) => option === value}
                            renderInput={(params) => <TextField {...params} label="Subject Code" />}
                        />
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "baseline", marginTop: 2 }}>
                        {/* Sections */}
                        <Box sx={{ width: 245 }}>
                            <Typography sx={{ marginRight: 1, marginBottom: 0 }}>
                                Sections
                            </Typography>
                        </Box>
                        <Select
                            value={sections !== undefined ? sections.toString() : ''}
                            color="secondary"
                            autoFocus
                            margin="dense"
                            fullWidth
                            id="Sections"
                            onChange={handleSectionsChange}
                        >
                            <MenuItem value="0">0</MenuItem>
                            <MenuItem value="1">1</MenuItem>
                            <MenuItem value="2">2</MenuItem>
                            <MenuItem value="3">3</MenuItem>
                            <MenuItem value="4">4</MenuItem>
                            <MenuItem value="5">5</MenuItem>
                            <MenuItem value="6">6</MenuItem>
                        </Select>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "baseline", marginTop: 2 }}>
                        {/* Lecture Hours */}
                        <Box sx={{ width: 245 }}>
                            <Typography sx={{ marginRight: 1, marginBottom: 0 }}>
                                Lecture Hours
                            </Typography>
                        </Box>
                        <Select
                            value={lecHours !== undefined ? lecHours.toString() : ''}
                            color="secondary"
                            autoFocus
                            margin="dense"
                            fullWidth
                            id="Lecture Hours"
                            onChange={handleLecHoursChange}
                        >
                            <MenuItem value="0">0</MenuItem>
                            <MenuItem value="1">1</MenuItem>
                            <MenuItem value="2">2</MenuItem>
                            <MenuItem value="3">3</MenuItem>
                            <MenuItem value="4">4</MenuItem>
                            <MenuItem value="5">5</MenuItem>
                            <MenuItem value="6">6</MenuItem>
                        </Select>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "baseline", marginTop: 2 }}>
                        {/* Lab Hours */}
                        <Box sx={{ width: 245 }}>
                            <Typography sx={{ marginRight: 1, marginBottom: 0 }}>
                                Lab Hours
                            </Typography>
                        </Box>
                        <Select
                            value={labHours !== undefined ? labHours.toString() : ''}
                            color="secondary"
                            autoFocus
                            margin="dense"
                            fullWidth
                            id="Lab Hours"
                            onChange={handleLabHoursChange}
                        >
                            <MenuItem value="0">0</MenuItem>
                            <MenuItem value="1">1</MenuItem>
                            <MenuItem value="2">2</MenuItem>
                            <MenuItem value="3">3</MenuItem>
                            <MenuItem value="4">4</MenuItem>
                            <MenuItem value="5">5</MenuItem>
                            <MenuItem value="6">6</MenuItem>
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
                            value={timeRemarks.days}
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
                            value={timeRemarks.startTime}
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
                            value={timeRemarks.endTime}
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