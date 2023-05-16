import { AccessTime, Logout, Warning } from "@mui/icons-material";
import { Alert, AlertTitle, Tooltip } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import type { FC } from "react";

const handleLogout = () => {
  signOut();
};

const AccountError: FC = () => {
  const { data: session } = useSession();

  return (
    <div className="flex justify-center items-center h-screen">
      <Alert
        severity="warning"
        sx={{ maxWidth: 800, width: "100%", p: 4, borderRadius: 4 }}
      >
        <div className="flex justify-between items-center mb-3">
          <AlertTitle>
            <Warning fontSize="large" />
            Account not approved
          </AlertTitle>
          {session && (
            <div className="flex items-center">
              <Tooltip title="Logout">
                <Logout
                  sx={{ cursor: "pointer" }}
                  fontSize="medium"
                  onClick={handleLogout}
                />
              </Tooltip>
            </div>
          )}
        </div>
        <p>Please wait while your account is being reviewed.</p>
        <div className="flex items-center mt-4">
          <AccessTime />
          <span className="ml-2">
            Expected approval time: 1-2 business days
          </span>
        </div>
      </Alert>
    </div>
  );
};

export default AccountError;
