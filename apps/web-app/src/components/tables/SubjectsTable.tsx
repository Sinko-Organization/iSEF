import { Box, Grid, SelectChangeEvent, TextField, MenuItem } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { trpc, type inferQueryOutput } from "@web-app/utils/trpc";
import React, { useState, type FC } from "react";
import { Search } from "@mui/icons-material";
import { useRouter } from "next/router";
import { AddTeacherSubjects } from "../buttons";
import { EducationLoader } from "../loaders";


interface SubjectTableProps {
  subjects: inferQueryOutput<"subjectList.getAll">;
  curriculums: inferQueryOutput<"subjectList.curriculum">;
}

type Subject = {
  id: string;
  title: string;
  subCode: string;
  units: number;
  credits: number;
  curriculum: string;
}

const SubjectTable: React.FC = () => {

  const { data: curriculumList, error } = trpc.useQuery(["subjectList.curriculum"]);


  const router = useRouter();

  // State to store the selected curriculum
  const [selectedCurriculum, setSelectedCurriculum] = useState<string | undefined>(undefined);

  // Define your query input based on the optional curriculum
  const queryInput: { curriculum: string | undefined } = {
    curriculum: selectedCurriculum,
  };

  // Fetch data 
  const { data: subjectsList, error: subjectsError } = trpc.useQuery(
    ["subjectList.getAll", queryInput]
  );

  const handleFilterChange = (newCirruculum: string | undefined) => {
    setSelectedCurriculum(newCirruculum)
  }

  const handleSubjectSelect = (subCode: string) => {
    router.push(`/subjects/${subCode}`);

  };

  if (!subjectsList || !curriculumList) {
    return <EducationLoader />;
  }

  const curriculumItems = curriculumList!.map((curriculum) => (
    <MenuItem key={curriculum.id} value={curriculum.curriculum}>
      {curriculum.curriculum}
    </MenuItem>
  ));



  return (
    <Grid >
      {/* filter */}
      <Grid container justifyContent="space-between">
        <Box>
          <TextField
            defaultValue="All"
            onChange={(event) => handleFilterChange(event.target.value)}
            id="curriculum"
            select
            color="secondary"
          >
            <MenuItem value={"All"}>All</MenuItem>
            {curriculumItems}
          </TextField>
        </Box>
        <Box>
          <AddTeacherSubjects />
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
        { }

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
                  Subject Code
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
                  Subject Title
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
                  Units
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
                  Curriculum
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subjectsList!.map((subject) => {
                return (
                  <TableRow
                    key={subject.id}
                    onClick={() => handleSubjectSelect(subject.subCode.toString())}
                    hover
                  >
                    <TableCell
                      style={{
                        textAlign: "center",
                        fontFamily: "Arial",
                        border: "1px solid #e5e7eb",
                        borderRadius: 2,
                      }}>
                      {subject.subCode}
                    </TableCell>
                    <TableCell style={{
                      textAlign: "center",
                      fontFamily: "Arial",
                      border: "1px solid #e5e7eb",
                      borderRadius: 2,
                    }}
                    >
                      {subject.title}
                    </TableCell>
                    <TableCell style={{
                      textAlign: "center",
                      fontFamily: "Arial",
                      border: "1px solid #e5e7eb",
                      borderRadius: 2,
                    }}>
                      {subject.units}
                    </TableCell>
                    <TableCell style={{
                      textAlign: "center",
                      fontFamily: "Arial",
                      border: "1px solid #e5e7eb",
                      borderRadius: 2,
                    }}>
                      {subject.curriculum}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper >
    </Grid >
  );
};




// const handleUserInfo = (userInfo: ErrorResult | SuccessResult) => {
//   const isSuccess = typeof userInfo !== "string";
//   return isSuccess ? userInfo : O.None;
// };

// const isNotNullAndEmpty = (value: string | null) => {
//   return value !== null && value !== "";
// };

export default SubjectTable;