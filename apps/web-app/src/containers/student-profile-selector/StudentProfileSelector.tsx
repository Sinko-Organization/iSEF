import { InputLabel, MenuItem, Select } from "@mui/material";
import React, { FC, HTMLAttributes } from "react";

interface StudentProfileSelectorProps extends HTMLAttributes<HTMLDivElement> {
  schoolYearsData: {
    id: string;
    startYear: number;
    endYear: number;
  }[];
  setSchoolYear: (schoolYear: number) => void;
}

const StudentProfileSelector: FC<StudentProfileSelectorProps> = ({
  schoolYearsData,
  setSchoolYear,
  ...props
}) => (
  <div {...props}>
    <div className="flex flex-row gap-5">
      <div className="flex flex-row gap-5">
        <InputLabel className="mt-auto">School Year:</InputLabel>
        <Select
          sx={{
            maxWidth: 200,
          }}
          variant="standard"
          defaultValue="All"
          onChange={(e) => {
            const val = e.target.value;
            const yearOption = val === "All" ? 0 : Number(val);
            setSchoolYear(yearOption);
          }}
        >
          <MenuItem value="All">All</MenuItem>
          {schoolYearsData.map((year) => (
            <MenuItem key={year.id} value={year.startYear}>
              S.Y. {year.startYear} - {year.endYear}
            </MenuItem>
          ))}
        </Select>
      </div>
    </div>
  </div>
);

export default StudentProfileSelector;
