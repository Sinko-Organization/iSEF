import { Box, Grid, MenuItem, Paper, Select, SelectChangeEvent, Table, TextField } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { inferQueryOutput, trpc } from "@web-app/utils/trpc";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import type { FC } from "react";
import { useState } from "react";

import { AddTeachersButton } from "../buttons";
import { EducationLoader } from "../loaders";
import SearchBar from "../search/Search";
import { Search } from "@mui/icons-material";
import { Department, employmentType } from "@prisma/client";

interface TeacherManagementTableProps {
  teachers: inferQueryOutput<"teacher.getAll">;

}

type Teacher = {
  id: string;
  teacherId: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  department: Department | null;
  employment: employmentType | null;
  birthday: Date;
  createdAt: Date;
  updatedAt: Date;
}

const TeacherManagementTable: FC<TeacherManagementTableProps> = ({ teachers }) => {

  const router = useRouter();


  const handleTeacherSelect = (teacherId: string) => {
    router.push(`/teachers/${teacherId}`);

  };

  if (!teachers) {
    return <EducationLoader />;
  }


  return (
    <Grid >
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
                <TableCell
                  style={{
                    backgroundColor: "#CABFE9",
                    fontSize: "16px",
                    fontWeight: "bold",
                    padding: "10px",
                    textAlign: "center",
                    color: "black",
                    border: "1px solid #ddd",
                    borderRadius: 2,
                    fontFamily: "Times New Roman"
                  }}
                >
                  ID Number
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#CABFE9",
                    fontSize: "16px",
                    fontWeight: "bold",
                    padding: "10px",
                    textAlign: "center",
                    color: "black",
                    border: "1px solid #ddd",
                    borderRadius: 2,
                    fontFamily: "Times New Roman"

                  }}>
                  Name
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#CABFE9",
                    fontSize: "16px",
                    fontWeight: "bold",
                    padding: "10px",
                    textAlign: "center",
                    color: "black",
                    border: "1px solid #ddd",
                    borderRadius: 2,
                    fontFamily: "Times New Roman"

                  }}>
                  Department
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#CABFE9",
                    fontSize: "16px",
                    fontWeight: "bold",
                    padding: "10px",
                    textAlign: "center",
                    color: "black",
                    border: "1px solid #ddd",
                    borderRadius: 2,
                    fontFamily: "Times New Roman"

                  }}>
                  Employment
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teachers!.map((teacher) => {
                return (
                  <TableRow
                    key={teacher.teacherId}
                    onClick={() =>
                      handleTeacherSelect(teacher.teacherId.toString())
                    }
                    hover
                  >
                    <TableCell
                      style={{
                        textAlign: "center",
                        fontFamily: "Arial",
                        border: "1px solid #e5e7eb",
                        borderRadius: 2,
                      }}
                    >
                      {teacher.teacherId}
                    </TableCell>
                    <TableCell
                      style={{
                        textAlign: "center",
                        fontFamily: "Arial",
                        border: "1px solid #e5e7eb",
                        borderRadius: 2,
                      }}>
                      {isNotNullAndEmpty(teacher.middleName)
                        ? `${teacher.firstName} ${teacher.middleName![0]}. ${teacher.lastName
                        }`
                        : `${teacher.firstName} ${teacher.lastName}`}
                    </TableCell>
                    <TableCell
                      style={{
                        textAlign: "center",
                        fontFamily: "Arial",
                        border: "1px solid #e5e7eb",
                        borderRadius: 2,
                      }}
                    >
                      {teacher.department}
                    </TableCell>
                    <TableCell
                      style={{
                        textAlign: "center",
                        fontFamily: "Arial",
                        border: "1px solid #e5e7eb",
                        borderRadius: 2,
                      }}>
                      {teacher!.employment === "fulltime" ? "Full-Time" : "Part-Time"}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Grid>
  );
};

export default TeacherManagementTable;

const isNotNullAndEmpty = (value: string | null) => {
  return value !== null && value !== "";
};
