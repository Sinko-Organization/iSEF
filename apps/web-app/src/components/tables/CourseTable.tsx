import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { getUserInfo } from "@web-app/helpers";
import { useCurriculumStore } from "@web-app/stores";
import { trpc } from "@web-app/utils/trpc";
import Link from "next/link";
import type { FC } from "react";

interface CourseTableProps {
  students: {
    id: string;
    studentIdNumber: string;
    firstName: string | null;
    lastName: string | null;
  }[];
}

const CourseTable: FC<CourseTableProps> = ({ students }) => {
  const { schoolYear } = useCurriculumStore();
  return (
    <Paper
      className="mt-10"
      sx={{
        boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.25)",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: "#F5F5F5" }}>
            <TableRow>
              <TableCell
                sx={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  textAlign: "center",
                  borderRight: "1px solid #ddd",
                }}
              >
                Student ID
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  textAlign: "center",
                  borderLeft: "1px solid #ddd",
                }}
              >
                First Name
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  textAlign: "center",
                  borderLeft: "1px solid #ddd",
                }}
              >
                Last Name
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  textAlign: "center",
                  borderLeft: "1px solid #ddd",
                }}
              >
                Enrollment Type
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={3}
                  sx={{
                    textAlign: "center",
                    fontSize: "1.25rem",
                    fontWeight: "bold",
                  }}
                >
                  No records found
                </TableCell>
              </TableRow>
            )}
            {students.map((student) => (
              <CourseTableCell
                key={student.id}
                student={{
                  ...student,
                  schoolYear,
                }}
              />
            ))}
            {/* Added since last row has no vertical line */}
            <TableRow
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                cursor: "pointer",
                display: "none",
              }}
              hover
            >
              <TableCell
                component="th"
                scope="row"
                sx={{
                  textAlign: "center",
                  borderRight: "1px solid #ddd",
                }}
              ></TableCell>
              <TableCell
                align="right"
                sx={{ textAlign: "center", borderLeft: "1px solid #ddd" }}
              ></TableCell>
              <TableCell
                align="right"
                sx={{ textAlign: "center", borderLeft: "1px solid #ddd" }}
              ></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

interface CourseTableCellProps {
  student: CourseTableProps["students"][number] & {
    schoolYear: number;
  };
}

const CourseTableCell: FC<CourseTableCellProps> = ({ student }) => {
  const { id, firstName, lastName, schoolYear, studentIdNumber } = student;

  const { data: studentData } = trpc.useQuery([
    "studentData.details",
    {
      studentId: id,
      schoolYear: schoolYear === 0 ? undefined : schoolYear,
    },
  ]);

  if (!studentData) {
    return <></>;
  }

  const userInfo = getUserInfo(studentData.studentRecords);
  const isSuccess = typeof userInfo !== "string";

  return (
    <>
      {isSuccess && (
        <Link href={`/student?id=${id}`} key={id}>
          <TableRow
            sx={{
              "&:last-child td, &:last-child th": { border: 0 },
              cursor: "pointer",
            }}
            hover
          >
            <TableCell
              component="th"
              scope="row"
              sx={{
                textAlign: "center",
                borderRight: "1px solid #ddd",
              }}
            >
              {studentIdNumber}
            </TableCell>
            <TableCell
              align="right"
              sx={{ textAlign: "center", borderLeft: "1px solid #ddd" }}
            >
              {isNotNullAndEmpty(firstName) ? firstName : "---"}
            </TableCell>
            <TableCell
              align="right"
              sx={{ textAlign: "center", borderLeft: "1px solid #ddd" }}
            >
              {isNotNullAndEmpty(lastName) ? lastName : "---"}
            </TableCell>
            <TableCell
              align="right"
              sx={{ textAlign: "center", borderLeft: "1px solid #ddd" }}
            >
              {userInfo.enrollmentType}
            </TableCell>
          </TableRow>
        </Link>
      )}
    </>
  );
};

const isNotNullAndEmpty = (value: string | null) => {
  return value !== null && value !== "";
};

export default CourseTable;
