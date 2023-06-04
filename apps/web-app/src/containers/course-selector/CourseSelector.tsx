import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { trpc } from "@web-app/utils/trpc";
import type { FC } from "react";

interface Props {
  course: string | null;
  setCourse: (course: string | null) => void;
}

const CourseSelector: FC<Props> = ({ course, setCourse }) => {
  const { data: courses } = trpc.useQuery(["course.getAll"]);
  return (
    <FormControl fullWidth sx={{ width: "100%"}}>
      <InputLabel className="mt-auto">Course:</InputLabel>
      {courses && (
        <Select
          sx={{ minWidth: "120px", height: "40px"}}
          variant="outlined"
          label="Course"
          defaultValue={course}
          onChange={(e) => {
            const value = e.target.value;
            if (e.target.value === "all") {
              setCourse(null);
            } else {
              setCourse(value);
            }
          }}
        >
          <MenuItem value={"all"}>All</MenuItem>
          {courses.map((course) => (
            <MenuItem key={course.id} value={course.id} className="capitalize">
              {course.name}
            </MenuItem>
          ))}
        </Select>
      )}
    </FormControl>
  );
};

export default CourseSelector;
