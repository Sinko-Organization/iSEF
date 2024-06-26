import { TableContainer, TableRow } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import { inferQueryOutput as InferQueryOutput } from "@web-app/utils/trpc";
import { FC } from "react";

interface TeacherDetailsProps {
  teacher: InferQueryOutput<"teacher.getAll">;
}

const TeacherDetails: FC<TeacherDetailsProps> = ({ teacher }) => {
  if (!teacher || !teacher[0]) {
    return null;
  }

  const {
    teacherId,
    firstName,
    middleName,
    lastName,
    employment,
    department,
    birthday,
  } = teacher[0];

  const today = new Date();
  const birthYear = new Date(birthday).getFullYear();
  const age = today.getFullYear() - birthYear;

  const formatFullName = () => {
    if (middleName) {
      return `${firstName} ${middleName}. ${lastName}`;
    }
    return `${firstName} ${lastName}`;
  };

  return (
    <div>
      <Paper
        className="mt-10"
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          width: "80%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow key={teacherId}>
                {/* ID Number */}
                <TableRow style={{ backgroundColor: "#F5F5F5" }}>
                  <TableCell
                    style={{
                      backgroundColor: "#F5F5F5",
                      padding: "10px",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    ID Number
                  </TableCell>
                  <TableCell
                    style={{ backgroundColor: "#ffffff" }}
                    colSpan={50}
                  >
                    {teacherId}
                  </TableCell>
                  {/* Name */}
                  <TableCell
                    style={{
                      backgroundColor: "#F5F5F5",
                      padding: "10px",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    Name
                  </TableCell>
                  <TableCell style={{ backgroundColor: "#ffffff" }}>
                    {formatFullName()}
                  </TableCell>
                </TableRow>
                {/* Age */}
                <TableRow style={{ backgroundColor: "#F5F5F5" }}>
                  <TableCell
                    style={{
                      padding: "10px",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    Age
                  </TableCell>
                  <TableCell
                    style={{ backgroundColor: "#ffffff" }}
                    colSpan={50}
                  >
                    {age}
                  </TableCell>

                  <div style={{ marginLeft: "auto" }}>
                    {/* Department */}
                    <TableCell
                      style={{
                        backgroundColor: "#F5F5F5",
                        padding: "10px",
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      Department
                    </TableCell>
                    <TableCell style={{ backgroundColor: "#ffffff" }}>
                      {department}
                    </TableCell>
                  </div>
                </TableRow>
                {/* Employment */}
                <TableRow>
                  <TableCell
                    style={{
                      backgroundColor: "#F5F5F5",
                      padding: "10px",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    Employment
                  </TableCell>
                  <TableCell style={{ backgroundColor: "#ffffff" }}>
                    {employment}
                  </TableCell>
                </TableRow>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Paper
        className="mt-10"
        sx={{
          boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.25)",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow
                style={{ backgroundColor: "#F5F5F5", fontFamily: "Arial" }}
              >
                <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                  Subject Code
                </TableCell>
                <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                  Subject Title
                </TableCell>
                <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                  Units/Hour
                </TableCell>
              </TableRow>
            </TableHead>

          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default TeacherDetails;
