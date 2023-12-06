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
  setUserAsAdmin: (email: string) => void;
  isSettingAsAdmin: boolean;
}

export default function AddAdminAlert({
  email,
  isSettingAsAdmin,
  setUserAsAdmin,
}: Props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const setAdmin = () => {
    if (!email) return;
    setUserAsAdmin(email);
    handleClose();
  };

  return (
    <React.Fragment>
      {/*change functionality if the list is ready*/}
      <Link onClick={handleClickOpen} style={{ color: "green" }}>
        Grant Access
      </Link>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Grant Access"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to grant access to this email?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={setAdmin} disabled={isSettingAsAdmin}>
            Grant Access
          </Button>
          <Button onClick={handleClose} autoFocus style={{ color: "red" }}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
