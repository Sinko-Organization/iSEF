import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Link from "@mui/material/Link";
import { trpc } from "@web-app/utils/trpc";
import * as React from "react";

interface Props {
  email: string | null;
  setUserNotAdmin: (email: string) => void;
  isSettingNotAdmin: boolean;
}

export default function RemoveAdminAlert({
  email,
  setUserNotAdmin,
  isSettingNotAdmin,
}: Props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const setNotAdmin = () => {
    if (!email) return;
    setUserNotAdmin(email);
    handleClose();
  };

  return (
    <React.Fragment>
      <Link onClick={handleClickOpen} style={{ color: "red" }}>
        Remove Access
      </Link>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Remove Access"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to remove access from this email?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={setNotAdmin} style={{ color: "red" }}>
            Remove
          </Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
