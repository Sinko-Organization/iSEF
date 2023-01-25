import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import { SemesterType } from "@prisma/client";
import { capitalize } from "lodash";
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
    <div className="flex flex-row gap-5">
      <div className="flex flex-row gap-5">
        <InputLabel className="mt-auto">School Year:</InputLabel>
        <Select
          sx={{
            maxWidth: 200,
          }}
          variant="standard"
          defaultValue={curriculum.schoolYear}
          onChange={(e) => setSchoolYear(Number(e.target.value))}
        >
          {schoolYearsData.map((year) => (
            <MenuItem key={year.id} value={year.startYear}>
              S.Y. {year.startYear} - {year.endYear}
            </MenuItem>
          ))}
        </Select>
      </div>

      <div className="flex flex-row gap-5">
        <InputLabel className="mt-auto">Semester Type:</InputLabel>
        <Select
          sx={{
            maxWidth: 100,
          }}
          variant="standard"
          defaultValue={curriculum.semesterType}
          onChange={(e) => setSemesterType(e.target.value as SemesterType)}
        >
          {Object.values(SemesterType).map((semesterType) => (
            <MenuItem
              key={semesterType}
              value={semesterType}
              className="capitalize"
            >
              {capitalize(semesterType)}
            </MenuItem>
          ))}
        </Select>
      </div>
    </div>
  );
};
export default CurriculumSelector;
