import { Card, Grid, Typography } from "@mui/material";
import { Paper, Table, styled } from "@mui/material";   
import { useFormik } from "formik";
import { P, match } from "ts-pattern";


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

export default function TeacherProfileCard({
}) 
{
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
                         
                        </td>
                        <td className="text-left mb-2">
                          <b>Student ID:</b> 
                        </td>
                      </tr>
                      <tr>
                        <td className="text-left mb-2">
                          <b>Current Course:</b>
                        </td>
                        <td className="text-left mb-2">
                          <b>Current Year Level:</b> 
                        </td>
                      </tr>
                      <tr>
                        <td className="text-left mb-2">
                          <b>Enrollment Type:</b> 
                        </td>
                        <td className="text-left mb-2">
                          <b>Current Semester:</b>{" "}
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
