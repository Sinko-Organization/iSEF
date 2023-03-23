import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { SemesterType } from "@prisma/client";
import Search from "@web-app/components/search";
import { capitalize } from "lodash";
import type { FC, HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  schoolYearsData: {
    id: string;
    startYear: number;
    endYear: number;
  }[];
  yearLevelsData: {
    id: string;
    yearLevel: number;
  }[];
  courseOptions: CourseOptionsType;
  searchText: string;
  setSearchText: (text: string) => void;
  setSchoolYear: (schoolYear: number) => void;
  setSemesterType: (semesterType: SemesterType) => void;
  setYearLevel: (yearLevel: number) => void;
}

export type CourseOptionsType = {
  schoolYear: number;
  semesterType: SemesterType;
  yearLevel: number;
};

const CourseOptionSelector: FC<Props> = ({
  schoolYearsData,
  courseOptions,
  setSchoolYear,
  setSemesterType,
  yearLevelsData,
  setYearLevel,
  searchText,
  setSearchText,
  ...props
}) => {
  return (
    <div {...props}>
      <div className="flex flex-row gap-5">
        <div className="flex flex-row gap-5">
          <InputLabel className="mt-auto">School Year:</InputLabel>
          <Select
            sx={{
              maxWidth: 200,
            }}
            variant="standard"
            defaultValue={courseOptions.schoolYear}
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
            defaultValue={courseOptions.semesterType}
            onChange={(e) => setSemesterType(e.target.value as SemesterType)}
          >
            {Object.values(SemesterType).map((semesterType) => (
              <MenuItem key={semesterType} value={semesterType}>
                {capitalize(semesterType.toLowerCase())}
              </MenuItem>
            ))}
          </Select>
        </div>

        <div className="flex flex-row gap-5">
          <InputLabel className="mt-auto">Year Level:</InputLabel>
          <Select
            sx={{
              maxWidth: 100,
            }}
            variant="standard"
            defaultValue={courseOptions.yearLevel}
            onChange={(e) => setYearLevel(Number(e.target.value))}
          >
            {yearLevelsData.map((data) => (
              <MenuItem
                key={data.id}
                value={data.yearLevel}
                className="capitalize"
              >
                {data.yearLevel}
              </MenuItem>
            ))}
          </Select>
          <Search text={searchText} onChangeText={setSearchText} />
        </div>
      </div>
    </div>
  );
};
export default CourseOptionSelector;
