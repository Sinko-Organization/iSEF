import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import type { SelectChangeEvent } from "@mui/material/Select";
import type { FC } from "react";
import * as React from "react";
import { inferQueryOutput } from "@web-app/utils/trpc";

interface TeacherSelectorProps{
    teachers: inferQueryOutput<"teacher.getAll">;
    };

const TeacherSelector: FC<TeacherSelectorProps> = ({
    teachers,
}) => {
    const handleChange = (event: SelectChangeEvent) => {
        console.log(event.target.value);
    };

    return (
        <Box sx={{ maxWidth: 200 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Teacher</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Teacher"
                    onChange={handleChange}
                >
                    {teachers.map((teacher) => (
                        <MenuItem key={teacher.id} value={teacher.id}>
                            {`${teacher.lastName}, ${teacher.firstName} ${teacher.middleName}`}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export default TeacherSelector;