import {Warning } from "@mui/icons-material";
import { Alert, AlertTitle, Tooltip } from "@mui/material";
import type { FC } from "react";

const AdminError: FC = () => {

  return (
    <div className="flex justify-center items-center h-screen">
      <Alert
        severity="warning"
        sx={{ maxWidth: 800, width: "100%", p: 4, borderRadius: 4 }}
      >
        <div className="flex justify-between items-center mb-3">
          <AlertTitle>
            <Warning fontSize="large" />
            You are not authorized to view this page
          </AlertTitle>
        </div>
      </Alert>
    </div>
  );
};

export default AdminError;
