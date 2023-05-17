import SearchIcon from "@mui/icons-material/Search";
import { TextField } from "@mui/material";
import React, { FC } from "react";

interface Props {
  text: string;
  onChangeText: (text: string) => void;
}

const SearchBar: FC<Props> = ({ text, onChangeText }) => {
  return (
    <TextField
      sx={{ width: 450 }}
      id="outlined-search"
      label="Search"
      type="search"
      variant="outlined"
      value={text}
      onChange={(event) => onChangeText(event.target.value)}
      InputProps={{
        startAdornment: <SearchIcon />,
        sx: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(0, 0, 0, 0.23)", // Adjust the border color
          },
        },
      }}
    />
  );
};

export default SearchBar;
