/* eslint-disable @next/next/no-img-element */
import { Paper, Table, Typography, styled } from "@mui/material";
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
      <Card variant="outlined" sx={{ borderRadius: "16px" }}>
        <Typography
          sx={{ marginLeft: "0.5in", marginTop: "0.3in" }}
          className="text-center text-lg"
          style={{ fontFamily: "Times New Roman", fontSize: "25px" }}
        >
          STUDENT PROFILE
        </Typography>
        <Grid container spacing={0.1}>
          <Grid item xs={2}>
            <Typography sx={{ margin: "0.2in" }}>
              <Item>
                <img
                  src="https://res.cloudinary.com/dmro06tbx/image/upload/v1655572255/images_hlpjxg.png"
                  className="StudentIcon"
                  alt="..."
                />
              </Item>
            </Typography>
          </Grid>

          <Grid item xs={9}>
            <Typography sx={{ marginTop: "0.5in" }}>
              <Item className="justify-center font-times-new-roman">
                <Typography
                  sx={{ marginLeft: "0.5in" }}
                  style={{ fontFamily: "Times New Roman" }}
                >
                  <Table className="table table-sm">
                    <tbody>
                      <tr>
                        <td className="text-left mb-2">
                          <b>Name:</b>{" "}
                          {match([
                            formik.values.lastName,
                            formik.values.firstName,
                          ])
                            .with([null, null], () => "N/A")
                            .with([null, P.string], ([, last]) => last)
                            .with([P.string, null], ([first]) => first)
                            .with(
                              [P.string, P.string],
                              ([first, last]) => `${last}, ${first}`,
                            )
                            .otherwise(() => "N/A")
                            .toUpperCase()}
                        </td>
                        <td className="text-left mb-2">
                          <b>Student ID:</b> {formik.values.studentIdNumber}
                        </td>
                      </tr>
                      <tr>
                        <td className="text-left mb-2">
                          <b>Current Course:</b> {userInfo.course}
                        </td>
                        <td className="text-left mb-2">
                          <b>Current Year Level:</b> {userInfo.yearLevel}
                        </td>
                      </tr>
                      <tr>
                        <td className="text-left mb-2">
                          <b>Enrollment Type:</b> {userInfo.enrollmentType}
                        </td>
                        <td className="text-left mb-2">
                          <b>Current Semester:</b>{" "}
                          {userInfo.semesterType.toLowerCase()}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Typography>
              </Item>
            </Typography>
          </Grid>
        </Grid>
        {/* </Card> */}
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
