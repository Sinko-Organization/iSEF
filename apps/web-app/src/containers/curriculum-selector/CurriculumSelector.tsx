import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import { SemesterType } from "@prisma/client";
import type { FC } from "react";

interface CurriculumSelectorProps {
  schoolYearsData: {
    id: string;
    startYear: number;
    endYear: number;
  }[];
  curriculum: CurriculumType;
  setSchoolYear: (schoolYear: number) => void;
  setSemesterType: (semesterType: SemesterType) => void;
}

export type CurriculumType = {
  schoolYear: number;
  semesterType: SemesterType;
};

const CurriculumSelector: FC<CurriculumSelectorProps> = ({
  schoolYearsData,
  curriculum,
  setSchoolYear,
  setSemesterType,
}) => {
  return (
    <Stack sx={{ maxWidth: 200, marginY: 2 }} spacing={2}>
      {/* School Year */}
      <InputLabel>School Year</InputLabel>
      <Select
        defaultValue={curriculum.schoolYear}
        onChange={(e) => setSchoolYear(Number(e.target.value))}
      >
        {schoolYearsData.map((year) => (
          <MenuItem key={year.id} value={year.startYear}>
            S.Y. {year.startYear} - {year.endYear}
          </MenuItem>
        ))}
      </Select>

      {/*  Semester Type */}
      <InputLabel>Semester Type</InputLabel>
      <Select
        defaultValue={curriculum.semesterType}
        onChange={(e) => setSemesterType(e.target.value as SemesterType)}
      >
        {Object.values(SemesterType).map((semesterType) => (
          <MenuItem key={semesterType} value={semesterType}>
            <option value={semesterType} className="capitalize">
              {semesterType.toLowerCase()}
            </option>
          </MenuItem>
        ))}
      </Select>
    </Stack>
  );
};
export default CurriculumSelector;
