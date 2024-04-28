import { Box, CircularProgress, Grid, MenuItem, TextField } from "@mui/material";
import { AddTeacherSubjects } from "@web-app/components/buttons";
import { EducationLoader } from "@web-app/components/loaders";
import { SubjectTable } from "@web-app/components/tables";
import { trpc } from "@web-app/utils/trpc";
import type { NextPage } from "next";
import { useState } from "react";



const SubjectPage: NextPage = () => {

  const { data: curriculumList, error } = trpc.useQuery(["subjectList.curriculum"]);

  // State to store the selected curriculum
  const [selectedCurriculum, setSelectedCurriculum] = useState<string | undefined>(undefined);
  // State to store search text
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Define your query input based on the optional curriculum
  const queryInput: { curriculum: string | undefined, search: string | undefined } = {
    curriculum: selectedCurriculum,
    search: searchQuery
  };

  // Fetch data 
  const { data: subjectsList, error: subjectsError } = trpc.useQuery(
    ["subjectList.getAll", queryInput]
  );

  const handleFilterChange = (newCirruculum: string | undefined) => {
    setSelectedCurriculum(newCirruculum)
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const curriculumItems = curriculumList?.map((curriculum) => (
    <MenuItem key={curriculum.id} value={curriculum.curriculum}>
      {curriculum.curriculum}
    </MenuItem>
  ));

  return (
    <Grid paddingTop={5} paddingX={5} sx={{ flexGrow: 1 }}>
      <Grid item container direction="row">
        <Grid container spacing={2.5}>
          {/* filter */}
          <Grid item>
            {/* curriculum */}
            <Box sx={{ width: 150 }}>
              <TextField
                fullWidth
                defaultValue="All"
                onChange={(event) => handleFilterChange(event.target.value)}
                id="curriculum"
                select
                color="secondary"
                label="Curriculum"
              >
                <MenuItem value={"All"}>All</MenuItem>
                {curriculumItems ? curriculumItems : <CircularProgress />}
              </TextField>
            </Box>
          </Grid>
          <Grid item>
            {/* department */}
            <Box sx={{ width: 150 }}>
              <TextField
                fullWidth
                defaultValue="All"
                id="department"
                select
                color="secondary"
                label="Department"
              >
                <MenuItem value={"All"}>All</MenuItem>

              </TextField>
            </Box>
          </Grid>
          <Grid item>
            {/* search */}
            <Box sx={{ width: 250 }}>
              <TextField
                fullWidth
                color="secondary"
                label="Search"
                placeholder="Search by title"
                value={searchQuery}
                onChange={handleSearch} />
            </Box>
          </Grid>
          <Grid item >
            <Box sx={{ pl: 44, pt: 1 }}>
              <AddTeacherSubjects />
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <SubjectTable subjects={subjectsList!} />
    </Grid >






  );
};

export default SubjectPage;