
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
    <>
      {user?.role === "admin" || user?.role === "superadmin" ? (
        <div className="mx-32 fontsans mt-10">
          <Grid container justifyContent="space-between">
            <Grid item xs={4} style={{ textAlign: "center" }} >
              {/* searchbar*/}
              <TextField placeholder="Search by name" value={searchQuery} onChange={handleSearch} />
            </Grid>
            <Box>
              {/* filter */}
              <Select
                defaultValue="All"
                onChange={(e) => handleFilterChange(e.target.value as Department | string)}
                id="department"
                color="secondary"
              >
                {deptItems}
              </Select>
            </Box>
            <Box>
              <AddTeachersButton />
            </Box>
          </Grid>
          <TeacherManagementTable teachers={teachersList!} />
        </div>
      ) : (
        <AdminError />
      )}
      <Toaster />
    </>
  );
};

export default TeacherManagementPage;
