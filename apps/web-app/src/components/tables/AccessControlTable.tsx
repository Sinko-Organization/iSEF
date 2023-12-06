import { Paper, Table } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { inferQueryOutput } from "@web-app/utils/trpc";
import * as React from "react";
import type { FC } from "react";

import AddAdminAlert from "../buttons/AddAdminList";
import RemoveAdminAlert from "../buttons/RemoveAdminList";

// The mutations being passed as props

interface AccessControlTableProps {
  users: inferQueryOutput<"user.getAll">;
  setUserAsAdmin: (email: string) => void;
  isSettingAsAdmin: boolean;
  setUserNotAdmin: (email: string) => void;
  isSettingNotAdmin: boolean;
}

const AccessControlTable: FC<AccessControlTableProps> = ({
  users,
  isSettingAsAdmin,
  setUserAsAdmin,
  isSettingNotAdmin,
  setUserNotAdmin,
}) => {
  const isAdmin = true;

  return (
    <Paper
      className="mt-10"
      sx={{
        boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.25)",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date Joined</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => {
              return (
                <TableRow key={user.email}>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>
                    {/* refactor to have repeated comparison as a boolean variable */}
                    {user.role === "admin" || user.role === "superadmin"
                      ? "Access"
                      : "No Access"}
                  </TableCell>
                  <TableCell>{user.createdAt.toLocaleString()}</TableCell>
                  <TableCell>
                    {user.role === "admin" || user.role === "superadmin" ? (
                      <RemoveAdminAlert
                        email={user.email}
                        isSettingNotAdmin={isSettingNotAdmin}
                        setUserNotAdmin={setUserNotAdmin}
                      />
                    ) : (
                      <AddAdminAlert
                        email={user.email}
                        isSettingAsAdmin={isSettingAsAdmin}
                        setUserAsAdmin={setUserAsAdmin}
                      />
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default AccessControlTable;
