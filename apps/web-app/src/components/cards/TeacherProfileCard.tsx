import { Card, Grid, Typography } from "@mui/material";
import { Paper, Table, styled } from "@mui/material";
import { trpc } from "@web-app/utils/trpc";
import { useFormik } from "formik";
import { P, match } from "ts-pattern";
import EducationLoader from "../loaders/EducationLoader";
import EditTeacherButton from "../buttons/EditTeacherButton";
import RemoveTeacherButton from "../buttons/RemoveTeachersButton";



const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

interface Props {
  teacherID: string;
}

export default function TeacherProfileCard({ teacherID
}: Props) {

  const { data: teacher, error } = trpc.useQuery(["teacher.get", { teacherId: teacherID }]);

  if (!teacher) {
    return <EducationLoader />
  }

  return (
    <>
      <Card variant="outlined" sx={{ borderRadius: "16px" }}>
        <Typography
          sx={{ marginLeft: "0.5in", marginTop: "0.3in" }}
          className="text-center text-lg"
          style={{ fontFamily: "Times New Roman", fontSize: "25px" }}
        >
          TEACHER PROFILE
        </Typography>
        <Grid container spacing={0.1}>
          <Grid item xs={2}>
            <Typography sx={{ margin: "0.2in" }}>
              <Item>
                <img
                  src="https://res.cloudinary.com/dmro06tbx/image/upload/v1655572255/images_hlpjxg.png"
                  className="TeacherIcon"
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
                        <td></td>
                        <td></td>
                        <td>
                          <EditTeacherButton teacherId={teacherID} />
                          <RemoveTeacherButton teacherId={teacherID} />
                        </td>
                      </tr>
                      <tr>
                        <td className="text-left mb-2">
                          <b>Name:</b>{
                            isNotNullAndEmpty(teacher!.middleName)
                              ? `${teacher!.firstName} ${teacher!.middleName![0]}. ${teacher!.lastName
                              }` : `${teacher!.firstName} ${teacher!.lastName}`}

                        </td>
                        <td className="text-left mb-2">
                          <b>Teacher ID:</b> {teacherID}
                        </td>
                      </tr>
                      <tr>
                        <td className="text-left mb-2">
                          <b>Department:</b> {teacher!.department}
                        </td>
                        <td className="text-left mb-2">
                          <b>Employment:</b> {teacher!.employment === "fulltime" ? "Full-Time" : "Part-Time"}
                        </td>
                      </tr>
                      <tr>
                        <td className="text-left mb-2">
                          <b>Date of Birth:</b> {teacher!.birthday.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Typography>
              </Item>
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </>
  )
}

const isNotNullAndEmpty = (value: string | null) => {
  return value !== null && value !== "";
};
