
import { Box, Grid, MenuItem, Select, TextField } from "@mui/material";
import { Department } from "@prisma/client";
import { AddTeachersButton } from "@web-app/components/buttons";
import AdminError from "@web-app/components/errors/AdminError";
import { EducationLoader } from "@web-app/components/loaders";
import { TeacherManagementTable } from "@web-app/components/tables";
import { trpc } from "@web-app/utils/trpc";
import { NextPage } from "next";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";


const TeacherManagementPage: NextPage = () => {

  const { data: user, error } = trpc.useQuery(["user.role"]);

  // State to store the selected department
  const [selectedDepartment, setSelectedDepartment] = useState<Department | undefined>();
  // State to store search text
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Define your query input based on the optional department
  const queryInput: { department: Department | undefined, search: string | undefined } = {
    department: selectedDepartment,
    search: searchQuery
  };

  // Fetch Data
  const { data: teachersList, error: teachersError } = trpc.useQuery(
    ["teacher.getAll", queryInput],
    {},
  );

  // Handler for department selection
  const handleFilterChange = (newDepartment: Department | string) => {
    setSelectedDepartment(newDepartment === "All" ? undefined : newDepartment as Department);
  };

  // Handler for search
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };




  const deptItems = Object.keys(Department).map((key) => (
    <MenuItem key={key} value={key}>
      {Department[key]}
    </MenuItem>
  ));


  return (
    <Grid paddingTop={5} paddingX={5}>
      {user?.role === "admin" || user?.role === "superadmin" ? (
        <Grid item container direction="row">
          <Grid container spacing={2.5}>
            <Grid item >
              {/* searchbar*/}
              <Box sx={{ width: 250 }}>
                <TextField
                  color="secondary"
                  fullWidth
                  placeholder="Search teacher by name"
                  value={searchQuery}
                  onChange={handleSearch} />
              </Box>
            </Grid>
            <Grid item>
              <Box sx={{ width: 150 }}>
                {/* filter */}
                <Select
                  fullWidth
                  defaultValue="All"
                  onChange={(e) => handleFilterChange(e.target.value as Department | string)}
                  id="department"
                  color="secondary"
                >
                  {deptItems}
                </Select>
              </Box>
            </Grid>
            <Grid item>
              <Box sx={{ pl: 64, pt: 2 }}>
                <AddTeachersButton />
              </Box>
            </Grid>
            <Grid item flexGrow={1}> <TeacherManagementTable teachers={teachersList!} /></Grid>
          </Grid>
        </Grid>
      ) : (
        <AdminError />
      )}
      <Toaster />
    </Grid>
  );
};

export default TeacherManagementPage;
