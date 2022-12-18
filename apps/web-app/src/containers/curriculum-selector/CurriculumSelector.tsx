import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import { SemesterType } from "@prisma/client";
import _ from "lodash";
import type { FC } from "react";
import { useForm } from "react-hook-form";

interface CurriculumSelectorProps {
  schoolYearsData: {
    id: string;
    startYear: number;
    endYear: number;
  }[];
  submitHandler: (data: CurriculumType) => void;
  curriculum: CurriculumType;
}

export type CurriculumType = {
  schoolYear: number;
  semesterType: SemesterType;
};

const CurriculumSelector: FC<CurriculumSelectorProps> = ({
  schoolYearsData,
  submitHandler,
  curriculum,
}) => {
  const { register, handleSubmit } = useForm<CurriculumType>({
    defaultValues: {
      schoolYear: curriculum.schoolYear,
      semesterType: curriculum.semesterType,
    },
  });
  return (
    <Stack sx={{ maxWidth: 200, marginY: 2 }} spacing={2}>
      {/* School Year */}
      <InputLabel id="demo-simple-select-label">School Year</InputLabel>
      <Select defaultValue={curriculum.schoolYear} {...register("schoolYear")}>
        {schoolYearsData.map((year) => (
          <MenuItem key={year.id} value={year.startYear}>
            S.Y. {year.startYear} - {year.endYear}
          </MenuItem>
        ))}
      </Select>

      {/*  Semester Type */}
      <InputLabel id="demo-simple-select-label">Semester Type</InputLabel>
      <Select
        defaultValue={curriculum.semesterType}
        {...register("semesterType")}
      >
        {Object.values(SemesterType).map((semesterType) => (
          <MenuItem key={semesterType} value={semesterType}>
            <option value={semesterType}>
              {_.capitalize(semesterType.toLowerCase())}
            </option>
          </MenuItem>
        ))}
      </Select>

      {/* Submit */}
      <Button
        variant="contained"
        type="submit"
        onClick={handleSubmit((data) => {
          submitHandler(data);
        })}
      >
        Submit
      </Button>
    </Stack>
  );
};
export default CurriculumSelector;
