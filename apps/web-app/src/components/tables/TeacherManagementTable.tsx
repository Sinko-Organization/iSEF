import { Paper, Table } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Link from "next/link";
import * as React from "react";
import type { FC } from "react";
import { inferQueryOutput } from "@web-app/utils/trpc";
import TeacherDetails from "@web-app/components/tables/TeacherDetails";
import { useState } from "react";
import { useRouter } from "next/router";

interface TeacherManagementTableProps {
  teachers: inferQueryOutput<"teacher.getAll">;
}

const TeacherManagementTable: FC<TeacherManagementTableProps> = ({
  teachers
}) => {
  const [selectedTeacher, setSelectedTeacher] = useState<inferQueryOutput<"teacher.getAll"> | null
  >(null);
  const router = useRouter()

  const handleTeacherSelect = (teacherId: string) => {
    router.push(`/teacher?id=${teacherId}`)
    /*
     const selectedTeacher = teachers.find(
       (teacher) => teacher.teacherId === teacherId
     );
 
     setSelectedTeacher(selectedTeacher ? [selectedTeacher] : null);
    */
  };

  return (
    <div>
      <Paper
        className="mt-10"
        sx={{
          boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.25)",
          borderRadius: 2,
          overflow: "hidden"
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
                  <TableRow key={teacher.teacherId} onClick={() =>
                    handleTeacherSelect(teacher.teacherId.toString())
                  } hover>
                    <TableCell>{teacher.teacherId}</TableCell>
                    <TableCell>
                      {isNotNullAndEmpty(teacher.middleName)
                        ? `${teacher.firstName} ${teacher.middleName}. ${teacher.lastName}`
                        : `${teacher.firstName} ${teacher.lastName}`}
                    </TableCell>
                    <TableCell>{teacher.department}</TableCell>
                    <TableCell>{teacher.employment}</TableCell>
                    <TableCell>
                      {/* Trash button here */}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {selectedTeacher && <TeacherDetails teacher={selectedTeacher} />}
    </div>
  );
};

export default TeacherManagementTable;

const isNotNullAndEmpty = (value: string | null) => {
  return value !== null && value !== "";
};
