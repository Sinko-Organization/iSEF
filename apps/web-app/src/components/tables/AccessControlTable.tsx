import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { trpc } from "@web-app/utils/trpc";
import * as React from "react";

import AddAdminAlert from "../alerts/AddAdminList";
import RemoveAdminAlert from "../alerts/RemoveAdminList";
import AdminError from "../errors/AdminError";

const columns: GridColDef[] = [
  { field: "email", headerName: "EMAIL", width: 550 },
  { field: "isAdmin", headerName: "STATUS", width: 130 },
];

const rows = [
  { id: 1, email: "Jon@gmail.com", isAdmin: "No Access" },
  { id: 2, email: "Lannister@gmail.com", isAdmin: "Access" },
  { id: 3, email: "Larsuares@gmail.com", isAdmin: "No Access" },
];

export default function AccessControlTable() {
  const { data: user, error } = trpc.useQuery(["user.role"]);

  if (user?.role !== "superadmin") {
    return <AdminError />;
  } else {
    return (
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {},
          }}
        />
      </div>
    );
  }
}
