import { Paper, Table } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { inferQueryOutput } from "@web-app/utils/trpc";
import Link from "next/link";
import * as React from "react";
import type { FC } from "react";

import RemoveButton from "../buttons/RemoveTeachersButton";
import { EducationLoader } from "../loaders";

interface TeacherManagementTableProps {
  teachers: inferQueryOutput<"teacher.getAll">;
  onTeacherSelect: (teacher: inferQueryOutput<"teacher.getAll">) => void;
}

const TeacherManagementTable: FC<TeacherManagementTableProps> = ({
  teachers,
  onTeacherSelect,
}) => {
  if (!teachers) {
    return <EducationLoader />;
  }

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
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teachers.map((teacher) => (
              <TableRow key={teacher.teacherId}>
                <TableCell>{teacher.teacherId}</TableCell>
                <TableCell>
                  {isNotNullAndEmpty(teacher.middleName)
                    ? `${teacher.firstName} ${teacher.middleName![0]}. ${
                        teacher.lastName
                      }`
                    : `${teacher.firstName} ${teacher.lastName}`}
                </TableCell>
                <TableCell>{teacher.department} </TableCell>
                <TableCell>{teacher.employment}</TableCell>
                <TableCell>
                  <RemoveButton />
                </TableCell>
                <TableCell>
                  <Link href={`/teachers/${teacher.teacherId}`} passHref>
                    <a onClick={() => onTeacherSelect([teacher])}>
                      View Details
                    </a>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
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
