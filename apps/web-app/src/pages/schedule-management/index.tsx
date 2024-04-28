import type { NextPage } from "next";
import { Box, Grid, MenuItem, Select, TextField, Button } from "@mui/material";
import { Department } from "@prisma/client";
import { AddCustomScheduleButton, AddScheduleButton, AddTeachersButton } from "@web-app/components/buttons";
import AdminError from "@web-app/components/errors/AdminError";
import { EducationLoader } from "@web-app/components/loaders";
import { TeacherManagementTable } from "@web-app/components/tables";
import { trpc } from "@web-app/utils/trpc";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Calendar from "@web-app/components/tables/Calendar";

import SaveCalendar from "@web-app/components/buttons/SaveCalendar";


const SchedulePage: NextPage = () => {

  return (
    <Grid paddingTop={5} paddingX={5}>
      <Grid container >
        <Grid container >
          {/* searchbar or filter*/}
          <Box sx={{ width: 250 }}>
            <TextField
              fullWidth
              color="secondary"
              placeholder="Search teacher by name" />
          </Box>
          {/* filter */}
          <Box sx={{ width: 250, pl: 2.5 }}>
            <TextField
              select
              fullWidth
              label="Department"
              color="secondary"
            // onChange={(e) => handleFilterChange(e.target.value as Department | string)}
            >
            </TextField>
          </Box>
          <Grid item>
            <Box sx={{ ml: 43, pt: 1 }}>
              <AddCustomScheduleButton />
            </Box>
          </Grid>
          <Grid>
            <Box sx={{ ml: 3, pt: 1 }}>
              <AddScheduleButton />
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Calendar />
      </Grid>
      <Grid item container justifyContent="flex-end" paddingTop={3}>
        <SaveCalendar />
      </Grid>


    </Grid >



  );
};

export default SchedulePage;