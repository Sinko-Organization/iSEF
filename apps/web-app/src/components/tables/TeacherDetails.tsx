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
      }}
    >
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID Number</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Employment</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key={teacher[0]?.id}>
              <TableCell>{teacher[0]?.teacherId}</TableCell>
              <TableCell>{`${teacher[0]?.firstName} ${teacher[0]?.middleName} ${teacher[0]?.lastName}`}</TableCell>
              <TableCell>{teacher[0]?.birthday?.getFullYear()}</TableCell>
              <TableCell>{teacher[0]?.employment}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TeacherDetails;
