import { Box, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { trpc } from "@web-app/utils/trpc";
import type { FC } from "react";

interface Props {
  yearLevel: number;
  setYearLevel: (yearLevel: number | null) => void;
}

const YearLevelSelector: FC<Props> = ({ yearLevel, setYearLevel, ...props }) => {
  const { data: yearLevels } = trpc.useQuery(["yearLevel.getAll"]);
  return (
    <div {...props}>
      <div className="flex flex-row gap-5">
        <FormControl fullWidth>
          <InputLabel
            id="school-year-select-label"
            className="mt-auto"

            sx={{ color: "text.secondary", }}
          >
            Year Level
          </InputLabel>
          <Box sx={{ width: 150 }}>
            <TextField
              select
              fullWidth
              label="Year Level"
              color="secondary"
              value={yearLevel}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (value > 0 && value <= 5) {
                  setYearLevel(value);
                } else {
                  setYearLevel(null);
                }
              }}
            >
              {/* {yearLevels.map((data) => (
            <MenuItem
              key={data.id}
              value={data.yearLevel}
              className="capitalize"
            >
              {data.yearLevel}
            </MenuItem>
          ))} */}
            </TextField>
          </Box>

        </FormControl>
      </div>
    </div>

  );
};
export default YearLevelSelector;
