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

const TeacherManagementTable: React.FC = () => {

  const router = useRouter();

  // State to store the selected department
  const [selectedDepartment, setSelectedDepartment] = useState<Department | undefined>(undefined);

  // Define your query input based on the optional department
  const queryInput: Department = {
    department: selectedDepartment,
  };

  //Fetch Data
  const { data: teachersList, error: teachersError } = trpc.useQuery(
    ["teacher.getAll", queryInput],
    {},
  );

  // Your handler for department selection
  const handleFilterChange = (newDepartment: Department | undefined) => {
    setSelectedDepartment(newDepartment);
  };



  const deptItems = Object.keys(Department).map((key) => (
    <MenuItem key={key} value={key}>
      {Department[key]}
    </MenuItem>
  ));


  const handleTeacherSelect = (teacherId: string) => {
    router.push(`/teachers/${teacherId}`);

  };

  if (!teachersList) {
    return <EducationLoader />;
  }

  return (
    <Grid >
      {/* filter */}
      <Grid container justifyContent="flex-start">
        <Box>
          <Select
            defaultValue="All"
            onChange={(e) => handleFilterChange(e.target.value as Department | undefined)}
            id="department"
            color="secondary"
          >
            <MenuItem value={undefined}>All</MenuItem>
            {deptItems}
          </Select>
        </Box>
      </Grid>

      <Grid container justifyContent="flex-end">
        <Box>
          <AddTeachersButton />
        </Box>
      </Grid>

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
              {teachersList!.map((teacher) => {
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

      {/* {selectedTeacher && <TeacherDetails teacher={selectedTeacher} />} */}
    </Grid>
  );
};

export default TeacherManagementTable;

const isNotNullAndEmpty = (value: string | null) => {
  return value !== null && value !== "";
};
