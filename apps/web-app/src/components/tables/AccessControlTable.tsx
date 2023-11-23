import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

const columns: GridColDef[] = [

  { field: 'email', headerName: 'EMAIL', width: 550},
  { field: 'isAdmin', headerName: 'STATUS', width: 130 },

];

const rows = [
  { id: 1, email: 'Jon@gmail.com', isAdmin: 'No Access' },
  { id: 2, email: 'Lannister@gmail.com',isAdmin: 'Access'},
  { id: 3, email: 'Larsuares@gmail.com',isAdmin: 'No Access'},
];

export default function AccessControlTable() {
  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
           
          },
        }}
      />
    </div>
  );
}