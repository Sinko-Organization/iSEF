import type { NextPage } from "next";
import { Box, Grid, MenuItem, Select, TextField, Button } from "@mui/material";
import { Department } from "@prisma/client";
import { AddCustomScheduleButton, AddScheduleButton, AddTeachersButton } from "@web-app/components/buttons";
import AdminError from "@web-app/components/errors/AdminError";
import { EducationLoader } from "@web-app/components/loaders";
import { TeacherManagementTable } from "@web-app/components/tables";
import { trpc } from "@web-app/utils/trpc";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const SchedulePage: NextPage = () => {
    return (
        <div className="mx-32 fontsans mt-10">
        <Grid container justifyContent="space-between">
            <Grid item xs={4} style={{ textAlign: "center" }} >
              {/* searchbar or filter*/}
              
              <TextField placeholder="Search teacher by name" />
            </Grid>
            <Box>
              {/* filter */}
              <Select
                defaultValue="All"
                // onChange={(e) => handleFilterChange(e.target.value as Department | string)}
                id="department"
                color="secondary"
              >
                {/* {deptItems} */}
              </Select>
            </Box>
            <Box sx = {{ marginTop: 1 }}>
              <AddScheduleButton />
            </Box>

        </Grid>

        <Grid container justifyContent="right">
            <Box sx = {{ marginTop: 3}}>
            <AddCustomScheduleButton />
            </Box>
        </Grid>
        </div>


    );
    };

    export default SchedulePage;