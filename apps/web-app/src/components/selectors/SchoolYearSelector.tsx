import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import type { SelectChangeEvent } from "@mui/material/Select";
import type { FC } from "react";

// integers from 1990 to 2100
const schoolYearsData: number[] = Array.from(
  { length: 2100 - 1990 + 1 },
  (_, i) => 1990 + i,
);

interface SchoolYearSelectorProps {
  schoolYears?: number[];
  schoolYear: string;
  setSchoolYear: (schoolYear: string) => void;
}

const SchoolYearSelector: FC<SchoolYearSelectorProps> = ({
  schoolYears = schoolYearsData,
  schoolYear,
  setSchoolYear,
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    setSchoolYear(event.target.value as string);
  };

  return (
    <FormControl fullWidth>
      <InputLabel className="mt-auto">School Year:</InputLabel>
      <Select
        style={{ height: "40px" }}
        variant="outlined"
        value={schoolYear}
        label="School Year:"
        onChange={handleChange}
      >
        {schoolYears.map((year) => (
          <MenuItem key={year} value={year}>
            S.Y. {year} - {year + 1}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SchoolYearSelector;
