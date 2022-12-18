import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import type { SelectChangeEvent } from "@mui/material/Select";
import type { Semester } from "@web-app/types/semester";
import _ from "lodash";
import type { FC } from "react";

const semesters: Semester[] = ["FIRST", "SECOND", "SUMMER"];

interface SemesterSelectorProps {
  semester: string;
  setSemester: (semester: Semester) => void;
}

const SemesterSelector: FC<SemesterSelectorProps> = ({
  semester,
  setSemester,
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    setSemester(event.target.value as Semester);
  };

  return (
    <Box sx={{ maxWidth: 200 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Semester Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={semester}
          label="Age"
          onChange={handleChange}
        >
          {semesters.map((semester) => (
            <MenuItem key={semester} value={semester}>
              {semester === "SUMMER"
                ? "Summer"
                : `${_.capitalize(semester)} Semester`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SemesterSelector;
