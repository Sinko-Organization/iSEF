import * as React from 'react';
import { inferQueryOutput } from '@web-app/utils/trpc';
import type { FC } from 'react';
import { Paper, Table } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

interface AccessControlTableProps {
  users: inferQueryOutput<'user.getAll'>;
}

const AccessControlTable: FC<AccessControlTableProps> = ({ users }) => {
  const isAdmin = true;

  return (
    <Paper className="mt-10" sx={{ boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.25)', borderRadius: 2, overflow: 'hidden' }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.email}>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role === 'admin' ? 'Access' : 'No Access'}</TableCell>
              </TableRow>
            ))} 
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default AccessControlTable;