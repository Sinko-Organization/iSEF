import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
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
}

export type CurriculumType = {
  schoolYear: number;
  semesterType: SemesterType;
};

const CurriculumSelector: FC<CurriculumSelectorProps> = ({
  schoolYearsData,
  submitHandler,
}) => {
  const { register, handleSubmit } = useForm<CurriculumType>();
  return (
    <Stack sx={{ maxWidth: 200, marginY: 2 }} spacing={2}>
      {/* School Year */}
      <FormControl>
        <InputLabel id="demo-simple-select-label">School Year</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          {...register("schoolYear")}
          label="Age"
        >
          {schoolYearsData.map((year) => (
            <MenuItem key={year.id} value={year.startYear}>
              S.Y. {year.startYear} - {year.endYear}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/*  Semester Type */}
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Semester Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          {...register("semesterType")}
          label="Age"
        >
          {Object.values(SemesterType).map((semesterType) => (
            <MenuItem key={semesterType} value={semesterType}>
              <option value={semesterType}>
                {_.capitalize(semesterType.toLowerCase())}
              </option>
            </MenuItem>
          ))}
        </Select>
      </FormControl>

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
