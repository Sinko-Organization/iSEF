import TextField from "@mui/material/TextField";
import type { FC } from "react";

interface Props {
  text: string;
  onChangeText: (text: string) => void;
}

const SearchBar: FC<Props> = ({ text, onChangeText }) => {
  return (
    <TextField
      id="outlined-search"
      label="Search field"
      type="search"
      variant="standard"
      value={text}
      onChange={(event) => onChangeText(event.target.value)}
    />
  );
};

export default SearchBar;
