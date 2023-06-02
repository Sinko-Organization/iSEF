import {Toolbar, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
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
      <Toolbar
        sx={{
          backgroundColor: "#5499C7",
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          borderBottom: "1px solid #ddd",
          color: "white",
          textAlign: "center",
        }}
      >
        <Typography
          sx={{
            flex: "1 1 100%",
            fontFamily: "Times New Roman",
            fontSize: "20px",
          }}
        >
          COURSES
        </Typography>
      </Toolbar>
      <TableHead sx={{ backgroundColor: "#A9CCE3" }}>
        <TableRow>
          <TableCell
            sx={{
              fontSize: "13 px",
              fontWeight: "bold",
              textAlign: "center",
              borderRight: "1px solid #ddd",
              fontFamily: "Times New Roman",
              letterSpacing: "0.5px",
              // flex: 'fixed'
            }}
          >
            TOTAL POPULATION: {totalPopulation}
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell colSpan={3}>
            <div className="flex flex-wrap justify-center">
              {rows
                .filter((row) => row.population > 0)
                .map((row) => (
                  <div
                    key={row.id}
                    className="w-1/3 p-4"
                    style={{ maxWidth: "300px" }}
                  >
                    <Link href={`/course?id=${row.id}`}>
                      <div className="border border-gray-300 rounded-lg p-4 h-full flex flex-col justify-center items-center hover:bg-gray-100 cursor-pointer shadow-lg">
                        <div className="text-center">{row.name}</div>
                        <div className="text-sm mt-2 text-center">
                          {" "}
                          Population: {row.population}
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
      {/* </Table> */}
      {/* // </TableContainer> */}
    </Paper>
  );
};

export default DashboardTable;
