import { color } from "@chakra-ui/react";
import { WidthFull } from "@mui/icons-material";
import { Box, TextField } from "@mui/material";
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
            <Box sx={{ width: 150 }}>
              <TextField
                select
                fullWidth
                label="School Year"
                color="secondary"
                value={curriculum.schoolYear}
                onChange={(e) => setSchoolYear(Number(e.target.value))}
              >
                {schoolYearsData.map((year) => (
                  <MenuItem key={year.id} value={year.startYear}>
                    S.Y. {year.startYear} - {year.endYear}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </FormControl>
        </div>

        <div className="flex flex-row gap-5">
          <FormControl fullWidth sx={{ width: 200 }}>
            <Box sx={{ width: 150 }}>
              <TextField
                select
                fullWidth
                label="Semester"
                color="secondary"
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
              </TextField>
            </Box>
          </FormControl>
        </div>
      </div>
    </div>
  );
};
export default CurriculumSelector;
