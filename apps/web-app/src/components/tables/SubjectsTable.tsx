import { Box, Grid, SelectChangeEvent, TextField, MenuItem } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { type inferQueryOutput } from "@web-app/utils/trpc";
import { useState, type FC } from "react";
import { Search } from "@mui/icons-material";
import { useRouter } from "next/router";
import { AddTeacherSubjects } from "../buttons";


interface SubjectTableProps {
  subjects: inferQueryOutput<"subjectList.getAll">;
}

type Subject = {
  id: string;
  title: string;
  subCode: string;
  units: number;
  credits: number;
  curriculum: string;
}

const SubjectTable: FC<SubjectTableProps> = ({
  subjects,
}) => {

  const router = useRouter();


  const [searchText, setSearchText] = useState("");
  const [filteredList, setFilteredList] = useState<Subject[]>(subjects);

  const curriculum = ["2022-2023", "2023-2024"]
  const curriculumList = curriculum.map(() => (
    <MenuItem >
      {curriculum}
    </MenuItem>
  ));

  const handleFilterChange = (e: SelectChangeEvent) => {
    let selectedCurriculum = e.target.value;

    if (selectedCurriculum === "All") {
      setFilteredList(subjects)
    }
    else {
      setFilteredList(subjects.filter(subject => subject.curriculum! === selectedCurriculum))
    }
  }

  const getSearchedSubjects = (searchText: string, subjectsList: Subject[]) => {

    if (!searchText) {
      return subjectsList
    }
    return subjectsList.filter(subject => subject.title.includes(searchText) || subject.subCode.includes(searchText))
  }

  const filteredSubjects = getSearchedSubjects(searchText, filteredList)



  return (
    <Grid >
      {/*searchbar */}
      <Grid container justifyContent="flex-start">
        <Box>
          <Search /><input type="text" onChange={(e) => (e.target.value)} />
        </Box>
      </Grid>
      {/* filter */}
      <Grid container justifyContent="flex-start">
        <Box>
          <TextField
            defaultValue="All"
            onChange={handleFilterChange}
            id="curriculum"
            select
            color="secondary"
          >
            <MenuItem value="All">All</MenuItem>
            {curriculumList}
          </TextField>
        </Box>
      </Grid>

      <Grid container justifyContent="flex-end">
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
                <TableCell>Curriculum</TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#B2A1E1",
                    padding: "10px",
                    textAlign: "center",
                    color: "white",
                    border: "1px solid #F5F5F5",
                    borderRadius: 2,
                    fontFamily: "Arial"

                  }}
                >
                  Subject Code
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#B2A1E1",
                    padding: "10px",
                    textAlign: "center",
                    color: "white",
                    border: "1px solid #F5F5F5",
                    borderRadius: 2,
                    fontFamily: "Arial"

                  }}>
                  Subject Title
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#B2A1E1",
                    padding: "10px",
                    textAlign: "center",
                    color: "white",
                    border: "1px solid #F5F5F5",
                    borderRadius: 2,
                    fontFamily: "Arial"

                  }}>
                  Units
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#B2A1E1",
                    padding: "10px",
                    textAlign: "center",
                    color: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: 2,
                    fontFamily: "Arial"

                  }}>
                  Curriculum
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSubjects.map((subject) => {
                return (
                  <TableRow
                    key={subject.id}
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