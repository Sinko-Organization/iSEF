import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import type { SelectChangeEvent } from "@mui/material/Select";
import type { FC } from "react";
import * as React from "react";
import { inferQueryOutput } from "@web-app/utils/trpc";


const DaySelector = () => {
    const handleChange = (event: SelectChangeEvent) => {
        console.log(event.target.value);
    };

    return (
        <Box sx={{ maxWidth: 200 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Day</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Day"
                    defaultValue = "Monday"
                    onChange={handleChange}
                >         
                <MenuItem>Monday</MenuItem>     
                <MenuItem>Tuesday</MenuItem>
                <MenuItem>Wednesday</MenuItem>
                <MenuItem>Thursday</MenuItem>
                <MenuItem>Friday</MenuItem>
                <MenuItem>Saturday</MenuItem>   

                </Select>
            </FormControl>
        </Box>
    );
};

export default DaySelector;