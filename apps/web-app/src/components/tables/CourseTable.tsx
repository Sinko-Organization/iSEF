/* eslint-disable unicorn/no-array-callback-reference */
import { O, pipe } from "@mobily/ts-belt";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { getUserInfo } from "@web-app/helpers";
import type { ErrorResult, SuccessResult } from "@web-app/helpers/getUserInfo";
import type { inferQueryOutput } from "@web-app/utils/trpc";
import Link from "next/link";
import type { FC } from "react";

interface CourseTableProps {
  students: inferQueryOutput<"course.getStudentsV2">;
}

const CourseTable: FC<CourseTableProps> = ({ students }) => {
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
              <Link href={`/student?id=${student.id}`} key={student.id}>
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
                    {student.studentIdNumber}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ textAlign: "center", borderLeft: "1px solid #ddd" }}
                  >
                    {isNotNullAndEmpty(student.firstName)
                      ? student.firstName
                      : "---"}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ textAlign: "center", borderLeft: "1px solid #ddd" }}
                  >
                    {isNotNullAndEmpty(student.lastName)
                      ? student.lastName
                      : "---"}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ textAlign: "center", borderLeft: "1px solid #ddd" }}
                  >
                    {pipe(
                      student.studentRecords,
                      O.fromNullable,
                      O.map(getUserInfo),
                      O.flatMap(handleUserInfo),
                      O.map((info) => info.enrollmentType),
                      O.match(
                        (info) => info as string,
                        () => "Unknown",
                      ),
                    )}
                  </TableCell>
                </TableRow>
              </Link>
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

const handleUserInfo = (userInfo: ErrorResult | SuccessResult) => {
  const isSuccess = typeof userInfo !== "string";
  return isSuccess ? userInfo : O.None;
};

const isNotNullAndEmpty = (value: string | null) => {
  return value !== null && value !== "";
};

export default CourseTable;
