import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Link from "next/link";
import type { FC } from "react";

interface DashboardTableProps {
  rows: {
    id: string;
    name: string;
    population: number;
  }[];
}

const DashboardTable: FC<DashboardTableProps> = ({ rows }) => {
  const totalPopulation = rows.reduce((acc, curr) => acc + curr.population, 0);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Courses</TableCell>
            <TableCell align="right">
              Total Population: <b>{totalPopulation} students</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            if (row.population === 0) return;
            return (
              <Link href={`/course?id=${row.id}`} key={row.id}>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.population}</TableCell>
                </TableRow>
              </Link>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DashboardTable;
