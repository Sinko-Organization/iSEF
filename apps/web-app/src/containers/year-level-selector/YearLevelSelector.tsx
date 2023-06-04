import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { trpc } from "@web-app/utils/trpc";
import type { FC } from "react";

interface Props {
  yearLevel: number | null;
  setYearLevel: (yearLevel: number | null) => void;
}

const YearLevelSelector: FC<Props> = ({ yearLevel, setYearLevel }) => {
  const { data: yearLevels } = trpc.useQuery(["yearLevel.getAll"]);
  return (
    <div className="flex flex-row gap-5">
      <FormControl fullWidth sx={{ width: 100 }}>
        <InputLabel className="mt-auto">Year Level:</InputLabel>
        {yearLevels && (
          <Select
            sx={{
              maxWidth: 100,
              height: 40
            }}
            variant="outlined"
            label="Year Level"
            defaultValue={yearLevel}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value > 0 && value <= 5) {
                setYearLevel(value);
              } else {
                setYearLevel(null);
              }
            }}
          >
            <MenuItem value={0}>All</MenuItem>
            {yearLevels.map((data) => (
              <MenuItem
                key={data.id}
                value={data.yearLevel}
                className="capitalize"
              >
                {data.yearLevel}
              </MenuItem>
            ))}
          </Select>
        )}
      </FormControl>
    </div>
  );
};
export default YearLevelSelector;
