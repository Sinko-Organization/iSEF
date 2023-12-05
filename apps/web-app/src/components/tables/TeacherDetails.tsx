import React from "react";
import { FC } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import { TableContainer, TableRow } from "@mui/material";
import TableHead from "@mui/material/TableHead";
import { inferQueryOutput } from "@web-app/utils/trpc";

interface TeacherDetailsProps {
    teacher: inferQueryOutput<"teacher.getAll">;
}




const TeacherDetails: FC<TeacherDetailsProps> = ({ teacher }) => {

    return (
        <Paper
            className="mt-10"
            sx={{
                boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.25)",
                borderRadius: 2,
                overflow: "hidden",
            }}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID Number</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Department</TableCell>
                            <TableCell>Employment</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {teacher.map((teacher) => (
                            <TableRow key={teacher.id}>
                                <TableCell>{teacher.teacherId}</TableCell>
                                <TableCell>{teacher.teacherId}</TableCell>
                                <TableCell>{`${teacher.firstName} ${teacher.middleName} ${teacher.lastName}`}</TableCell>
                                <TableCell>{teacher.department}</TableCell>
                                <TableCell>{teacher.employment}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </TableContainer>

        </Paper>
    )
}

export default TeacherDetails;
