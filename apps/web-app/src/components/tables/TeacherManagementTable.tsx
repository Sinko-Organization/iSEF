import { Paper, Table } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { inferQueryOutput } from "@web-app/utils/trpc";
import * as React from "react";
import type { FC } from "react";

interface TeacherManagementTableProps {
  teachers: inferQueryOutput<"teacher.getAll">;
}

const TeacherManagementTable: FC<TeacherManagementTableProps> = ({
  teachers,
}) => {
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
              <TableCell>Department</TableCell>
              <TableCell>Employment</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teachers.map((teacher) => {
              return (
                <TableRow key={teacher.teacherId}>
                  <TableCell>{teacher.teacherId}</TableCell>
                  <TableCell>
                    {isNotNullAndEmpty(teacher.middleName)
                      ? `{teacher.firstName} {teacher.middleName}. {teacher.lastName}`
                      : `{teacher.firstName} {teacher.lastName}`}
                  </TableCell>
                  <TableCell>{/* put department here */} nyaa uwu :3</TableCell>
                  <TableCell>{teacher.employment}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TeacherManagementTable;

const isNotNullAndEmpty = (value: string | null) => {
  return value !== null && value !== "";
};
