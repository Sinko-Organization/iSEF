import MuiAlert from "@mui/material/Alert";
import type { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import * as React from "react";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type Props = {
  message: string;
  handleClose: (event?: React.SyntheticEvent | Event, reason?: string) => void;
  open: boolean;
};

export default function ErrorAlert({ message, handleClose, open }: Props) {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
