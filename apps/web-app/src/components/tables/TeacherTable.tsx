import * as React from 'react';
import type { FC } from 'react';
import { Paper, Table } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';

const TeacherTable: FC = () => {
    return (
        <Paper className="mt-10" sx={{ boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.25)', borderRadius: 2, overflow: 'hidden' }}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableCell>
                            <TableCell>ID Number</TableCell>
                            <TableCell>Teachers</TableCell>
                            <TableCell>Department</TableCell>
                            <TableCell>Employment</TableCell>
                        </TableCell>
                    </TableHead>
                </Table>
            </TableContainer>
        </Paper>
    )
}


export default TeacherTable;