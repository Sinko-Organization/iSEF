import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { SemesterType } from "@prisma/client";
import { capitalize } from "lodash";
import type { FC, HTMLAttributes } from "react";

interface CurriculumSelectorProps extends HTMLAttributes<HTMLDivElement> {
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
  ...props
}) => {
  return (
    <div {...props}>
      <div className="flex flex-row gap-5">
        <div className="flex flex-row gap-5">
          <FormControl fullWidth>
            <InputLabel
              id="school-year-select-label"
              className="mt-auto"
              sx={{ color: "text.secondary" }}
            >
              School Year
            </InputLabel>
            <Select
              sx={{
                maxWidth: 200,
              }}
              variant="outlined"
              label="School Year"
              labelId="school-year-select-label"
              value={curriculum.schoolYear}
              onChange={(e) => setSchoolYear(Number(e.target.value))}
            >
              {schoolYearsData.map((year) => (
                <MenuItem key={year.id} value={year.startYear}>
                  S.Y. {year.startYear} - {year.endYear}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="flex flex-row gap-5">
          <FormControl fullWidth sx={{ width: 500 }}>
            <InputLabel className="mt-auto" sx={{ color: "text.secondary" }}>
              Semester Type
            </InputLabel>
            <Select
              sx={{
                maxWidth: 150,
              }}
              variant="outlined"
              label="Semester Type"
              labelId="semester-type-select-label"
              value={curriculum.semesterType}
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
          </FormControl>
        </div>
      </div>
    </div>
  );
};
export default CurriculumSelector;
