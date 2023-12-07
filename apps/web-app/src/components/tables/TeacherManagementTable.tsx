import { Paper, Table } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { inferQueryOutput } from "@web-app/utils/trpc";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import type { FC } from "react";
import { useState } from "react";

import { AddTeachersButton } from "../buttons";
import RemoveButton from "../buttons/RemoveTeachersButton";
import { EducationLoader } from "../loaders";

interface TeacherManagementTableProps {
  teachers: inferQueryOutput<"teacher.getAll">;

}

const TeacherManagementTable: FC<TeacherManagementTableProps> = ({
  teachers,
}) => {

  const router = useRouter();

  const handleTeacherSelect = (teacherId: string) => {
    router.push(`/teachers/${teacherId}`);

  };

  if (!teachers) {
    return <EducationLoader />;
  }

  return (
    <div>
      {<AddTeachersButton />}
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
                  <TableRow
                    key={teacher.teacherId}
                    onClick={() =>
                      handleTeacherSelect(teacher.teacherId.toString())
                    }
                    hover
                  >
                    <TableCell>{teacher.teacherId}</TableCell>
                    <TableCell>
                      {isNotNullAndEmpty(teacher.middleName)
                        ? `${teacher.firstName} ${teacher.middleName![0]}. ${teacher.lastName
                        }`
                        : `${teacher.firstName} ${teacher.lastName}`}
                    </TableCell>
                    <TableCell>{teacher.department}</TableCell>
                    <TableCell>{teacher!.employment === "fulltime" ? "Full-Time" : "Part-Time"}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

    </div>
  );
};

export default TeacherManagementTable;

const isNotNullAndEmpty = (value: string | null) => {
  return value !== null && value !== "";
};
