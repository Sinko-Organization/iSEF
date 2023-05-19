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
                  width: "50%",
                  borderRight: "1px solid #ddd",
                }}
              >
                Courses
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  textAlign: "center",
                  width: "50%",
                  borderLeft: "1px solid #ddd",
                }}
              >
                Total Population: <b>{totalPopulation} students</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {totalPopulation === 0 && (
              <TableRow>
                <TableCell
                  colSpan={2}
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
            {rows.map((row) => {
              if (row.population === 0) return;
              return (
                <Link href={`/course?id=${row.id}`} key={row.id}>
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
                      {row.name}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ textAlign: "center", borderLeft: "1px solid #ddd" }}
                    >
                      {row.population}
                    </TableCell>
                  </TableRow>
                </Link>
              );
            })}
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
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default DashboardTable;
