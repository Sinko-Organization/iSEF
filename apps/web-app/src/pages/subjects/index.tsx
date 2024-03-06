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

  const curriculumItems = curriculumList!.map((curriculum) => (
    <MenuItem key={curriculum.id} value={curriculum.curriculum}>
      {curriculum.curriculum}
    </MenuItem>
  ));

  return (
    <>
      <div className="mx-32 fontsans mt-10">
        <Grid container justifyContent="space-between">

          <Grid item xs={4} style={{ textAlign: "center" }} >
            {/* searchbar*/}
            <TextField placeholder="Search by title" value={searchQuery} onChange={handleSearch} />
          </Grid>
          <Box>
            {/* filter */}
            <TextField
              defaultValue="All"
              onChange={(event) => handleFilterChange(event.target.value)}
              id="curriculum"
              select
              color="secondary"
              label="Filter"
            >
              <MenuItem value={"All"}>All</MenuItem>
              {curriculumItems ? curriculumItems : <CircularProgress />}
            </TextField>
          </Box>
          <Box>
            <AddTeacherSubjects />
          </Box>
        </Grid>

        <SubjectTable subjects={subjectsList!} />
      </div>
    </>
  );
};

export default SubjectPage;