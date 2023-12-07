import AccountCircle from "@mui/icons-material/AccountCircle";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import AdminError from "@web-app/components/errors/AdminError";
import { EducationLoader } from "@web-app/components/loaders";
import { TeacherManagementTable } from "@web-app/components/tables";
import { trpc } from "@web-app/utils/trpc";
import { NextPage } from "next";
import React from "react";
import toast, { Toaster } from "react-hot-toast";

const employment = [
  {
    label: "full-time",
    value: "full-time",
  },
  {
    label: "part-time",
    value: "part-time",
  },
];

const department = [
  {
    label: "SE",
    value: "SE"
  },
  {
    label: "CE",
    value: "CE"
  }
]

const TeacherManagementPage: NextPage = () => {
  const utils = trpc.useContext();

  const { data: user, error } = trpc.useQuery(["user.role"]);
  const { data: teachers, error: teachersError } = trpc.useQuery(
    ["teacher.getAll"],
    {},
  );
  //modals
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // remove teacher from database
  const { mutate: deleteTeacher } = trpc.useMutation(["teacher.delete"], {
    onSuccess: (teacher: { teacherId: string }) => {
      utils.invalidateQueries(["teacher.getAll"]);
      toast.success(`Teacher ID: ${teacher.teacherId} has been deleted`);
    },
    onError: () => {
      toast.error("Error deleting teacher record");
    },
  });

  //   Functions for props
  const removeTeacherRecord = (teacherId: string) => {
    deleteTeacher({
      teacherId,
    });
  };

  if (!teachers) {
    return <EducationLoader />;
  }
  return (
    <>
      {user?.role === "admin" || user?.role === "superadmin" ? (
        <div className="mx-32 fontsans mt-10">
          <Grid>
          <Button onClick={handleClickOpen}>Edit</Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle sx={{}}>Edit Teacher</DialogTitle>
            <DialogContent>
              <Grid
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  marginBottom: 3,
                }}
              >
                <Typography sx={{ marginRight: 3 }}>ID Number</Typography>
                <TextField id="input-with-sx" label="" variant="filled" />
              </Grid>
              <Grid
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  marginBottom: 3,
                }}
              >
                <Typography sx={{ marginRight: 3 }}>Name</Typography>
                <TextField id="input-with-sx" label="" variant="filled" />
              </Grid>
              <Grid
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  marginBottom: 3,
                }}
              >
                <Typography sx={{ marginRight: 3 }}>Employment</Typography>
                <TextField
                  id="input-with-sx"
                  sx={{ width: 220 }}
                  select
                  label=""
                  variant="filled"
                  SelectProps={{
                    native: true,
                  }}
                >
                  {" "}
                  {employment.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  marginBottom: 3,
                }}
              >
                <Typography sx={{ marginRight: 3 }}>Department</Typography>
                <TextField
                  id="input-with-sx"
                  sx={{ width: 220 }}
                  select
                  label=""
                  variant="filled"
                  SelectProps={{
                    native: true,
                  }}
                >
                  {" "}
                  {department.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button variant="contained"  onClick={handleClose}>Submit</Button>
            </DialogActions>
          </Dialog>
          </Grid>

          <TeacherManagementTable
            teachers={teachers!}
            removeTeacherRecord={removeTeacherRecord}
          />
        </div>
      ) : (
        <AdminError />
      )}
      <Toaster />
    </>
  );
};

export default TeacherManagementPage;
