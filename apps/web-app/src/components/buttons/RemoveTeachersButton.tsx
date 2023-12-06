import { Delete } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles({
  container: {
    display: "flex",
    alignItems: "center",
  },
  button: {
    color: "red",
  },
});

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  disabled?: boolean;
}

const RemoveButton = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <IconButton className={`${classes.button} px-4 py-3 text-lg font-medium`}>
        <Delete /> {/* Render the trash can icon */}
      </IconButton>
    </div>
  );
};

export default RemoveButton;
