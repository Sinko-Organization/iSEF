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

  const renderCourseCard = (row: any) => (
    <div className="w-1/3 p-4">
      <Link href={`/course?id=${row.id}`}>
        <div className="border border-gray-300 rounded-lg p-4 h-full flex flex-col justify-center items-center hover:bg-gray-100 cursor-pointer shadow-lg">
          <div className="text-center">{row.name}</div>
          <div className="text-sm mt-2 text-center"> Population: {row.population}</div>
        </div>
      </Link>
    </div>
  );

  const renderCourseRows = () => {
    const courseRows: JSX.Element[] = [];
    let currentRow: JSX.Element[] = [];

    rows.forEach((row, index) => {
      if (row.population === 0) return;

      currentRow.push(renderCourseCard(row));

      if ((index + 1) % 3 === 0) {
        courseRows.push(
          <div key={index} className="flex">
            {currentRow.map((card) => card)}
          </div>
        );
        currentRow = [];
      }
    });

    if (currentRow.length > 0) {
      courseRows.push(
        <div key="last-row" className="flex">
          {currentRow.map((card) => card)}
        </div>
      );
    }

    return courseRows;
  };

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
          <TableHead sx={{ backgroundColor: "#EBDEF0" }}>
            <TableRow>
              {/* <TableCell
                colSpan={3}
                className="text-center font-bold border-b"
              >
                <div className="flex justify-center">Courses</div>
              </TableCell> */}
            </TableRow>
            <TableRow>
              <TableCell
                colSpan={3}
                align="center"
                className="text-sm"
              >
               Courses <br></br> Total Population: <b>{totalPopulation} students</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell colSpan={3}>
                {renderCourseRows().map((row) => row)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default DashboardTable;
