import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
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
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Student ID</TableCell>
            <TableCell align="right">First Name</TableCell>
            <TableCell align="right">Last Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student) => (
            <Link href={`/student?id=${student.id}`} key={student.id}>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {student.studentIdNumber}
                </TableCell>
                <TableCell align="right">
                  {student.firstName ?? "---"}
                </TableCell>
                <TableCell align="right">{student.lastName ?? "---"}</TableCell>
              </TableRow>
            </Link>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CourseTable;
