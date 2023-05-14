/* eslint-disable @next/next/no-img-element */
import { Paper, Table, styled } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { SemesterType } from "@prisma/client";
import { ErrorAlert, SuccessAlert } from "@web-app/components/alerts";
import { trpc } from "@web-app/utils/trpc";
import type { inferMutationInput } from "@web-app/utils/trpc";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { P, match } from "ts-pattern";

type UpdateStudentInput = inferMutationInput<"student.update">;

type StudentProfileCardProps = {
  id: string;
  studentIdNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
};

type Props = {
  [P in keyof StudentProfileCardProps]: P extends "id"
    ? string
    : StudentProfileCardProps[P] | null;
} & {
  userInfo: {
    course: string;
    enrollmentType: "Bridging" | "Regular";
    yearLevel: number;
    semesterType: SemesterType;
  };
};

type AlertState = {
  open: boolean;
  message: string;
};
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function StudentProfileCard({
  id,
  studentIdNumber,
  firstName,
  lastName,
  email,
  phoneNumber,
  address,
  userInfo,
}: Props) {
  const [errorState, setErrorState] = useState<AlertState>({
    open: false,
    message: "",
  });
  const [successState, setSuccessState] = useState<AlertState>({
    open: false,
    message: "",
  });
  const {
    mutate: updateStudent,
    isError,
    error,
  } = trpc.useMutation(["student.update"]);
  const formik = useFormik<Omit<Props, "id" | "userInfo">>({
    initialValues: {
      studentIdNumber,
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
    },
    onSubmit: (values) => {
      const newValues: UpdateStudentInput = {
        ...values,
        id,
        middleName: null,
      };
      updateStudent(newValues, {
        onSuccess: () => {
          setSuccessState({
            open: true,
            message: "Student updated successfully",
          });
        },
      });
    },
  });

  useEffect(() => {
    if (isError) {
      setErrorState({
        open: true,
        message: error?.message || "Something went wrong",
      });
    }
  }, [isError, error]);

  return (
    <>
      <Card>
        <CardHeader title={"Student Profile"} />

        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Item>
              <img
                src="https://res.cloudinary.com/dmro06tbx/image/upload/v1655572255/images_hlpjxg.png"
                className="StudentIcon"
                alt="..."
              />
            </Item>
          </Grid>
          <Grid item xs={8}>
            <Item className="flex flex-col gap-5">
              <Table className="table table-sm">
                <tbody>
                  <td>
                    <b>Name : </b>
                    {match([formik.values.firstName, formik.values.lastName])
                      .with([null, null], () => "N/A")
                      .with([null, P.string], ([, last]) => last)
                      .with([P.string, null], ([first]) => first)
                      .with(
                        [P.string, P.string],
                        ([first, last]) => `${first} ${last}`,
                      )
                      .otherwise(() => "N/A")}
                  </td>
                  <td>
                    <b>Student ID: </b>
                    {formik.values.studentIdNumber}
                  </td>
                </tbody>
              </Table>
              <Table className="table table-sm">
                <tbody>
                  <td>
                    <b>Enrollment Type : </b> {userInfo.enrollmentType}
                  </td>
                  <td>
                    <b>Current Course: </b>
                    {userInfo.course}
                  </td>
                  <td>
                    <b>Current Year Level: </b>
                    {userInfo.yearLevel}
                  </td>
                  <td className="capitalize">
                    <b>Current Semester: </b>
                    {userInfo.semesterType.toLowerCase()}
                  </td>
                </tbody>
              </Table>
            </Item>
          </Grid>
        </Grid>
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <Grid container direction="row" spacing={3}>
              <Grid item xs={6}>
                <TextField
                  name="studentIdNumber"
                  label="Student ID"
                  fullWidth
                  variant="standard"
                  value={formik.values.studentIdNumber}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="firstName"
                  label="First Name"
                  fullWidth
                  variant="standard"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="lastName"
                  label="Last Name"
                  fullWidth
                  variant="standard"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="email"
                  type="email"
                  id="outlined-required"
                  label="Email"
                  fullWidth
                  variant="standard"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="phoneNumber"
                  type="tel"
                  id="outlined-required"
                  label="Phone"
                  fullWidth
                  variant="standard"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="address"
                  id="outlined-required"
                  label="Address"
                  fullWidth
                  variant="standard"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                />
              </Grid>
            </Grid>
            <Button
              sx={{ mt: 3, mb: 2 }}
              color="secondary"
              variant="contained"
              fullWidth
              type="submit"
            >
              Edit
            </Button>
          </form>
        </CardContent>
      </Card>
      <ErrorAlert
        message={errorState.message}
        handleClose={() => setErrorState({ open: false, message: "" })}
        open={errorState.open}
      />
      <SuccessAlert
        message={successState.message}
        handleClose={() => setSuccessState({ open: false, message: "" })}
        open={successState.open}
      />
    </>
  );
}
