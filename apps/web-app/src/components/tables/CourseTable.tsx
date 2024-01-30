/* eslint-disable unicorn/no-array-callback-reference */
import { O, pipe } from "@mobily/ts-belt";
import { Box, Tab, TableSortLabel, Toolbar, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { getUserInfo } from "@web-app/helpers";
import type { ErrorResult, SuccessResult } from "@web-app/helpers/getUserInfo";
import { NonNullableValues } from "@web-app/types/generics";
import type { inferQueryOutput } from "@web-app/utils/trpc";
import Link from "next/link";
import router from "next/router";
import { useState, type FC, MouseEvent } from "react";
import { match } from "ts-pattern";

type SubjectListType = inferQueryOutput<"subject.getAll">;
type Unpacked<T> = T extends (infer U)[] ? U : T;
type SubjectTypeRaw = Unpacked<SubjectListType>;
type SubjectType = NonNullableValues<SubjectTypeRaw>;



interface SubjectList {
  subjectList: SubjectType[];


}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string | object },
  b: { [key in Key]: number | string | object },
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

interface HeadCell {
  disablePadding: boolean;
  id: string;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "stubCode",
    numeric: true,
    disablePadding: true,
    label: "SUBJECT CODE"
  },
  {
    id: "name",
    numeric: true,
    disablePadding: true,
    label: "SUBJECT TITLE"
  },
  {
    id: "department",
    numeric: true,
    disablePadding: true,
    label: "DEPARTMENT"
  },
  {
    id: "curriculum",
    numeric: true,
    disablePadding: true,
    label: "CURRICULUM"
  },
]

type Order = "asc" | "desc";

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}



function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: string) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead sx={{ backgroundColor: "#CABFE9" }}>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sx={{
              fontSize: "15 px",
              fontWeight: "bold",
              textAlign: "center",
              borderRight: "1px solid #ddd",
              fontFamily: "Times New Roman",
              // flex: 'fixed'
            }}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? <Box component="span"></Box> : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}





const SubjectTable: FC<SubjectList> = ({ subjectList }) => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<string>("firstName");
  const [selected] = useState<readonly string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    router.push(`subject?id=${id}`);
  };
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string,
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // const handleChangePage = (event: unknown, newPage: number) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (
  //   event: React.ChangeEvent<HTMLInputElement>,
  // ) => {
  //   setRowsPerPage(Number.parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  const isSelected = (name: string) => selected.includes(name);

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
          backgroundColor: "#B2A1E1",
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
          // variant="h6"
          id="tableTitle"
          component="div"
        >
          <div className="font-bold">Courses</div>
        </Typography>
      </Toolbar>
      <TableContainer>
        <Table sx={{ minWidth: 1000 }} aria-label="simple table">
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={0}
          />
        </Table>
        <TableBody>
        {subjectList.length === 0 && (
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
          {subjectList
            .sort(getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => {
              const isItemSelected = isSelected(row.id);

              return (
                <>
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{
                      cursor: "pointer",
                    }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{
                        textAlign: "center",
                        borderRight: "1px solid #ddd",
                      }}
                    >
                     {row.stubCode}
                    </TableCell>
                    <TableCell>
                      {row.name}
                    </TableCell>
                    <TableCell>
                      ---
                      //department
                    </TableCell>
                    <TableCell>
                      //curriculum
                    </TableCell>
                  </TableRow >
                      
                </>
              )
            })
          }
        </TableBody>
      </TableContainer>
      {/* <TableContainer>
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
                        (info) => (
                          <div
                            className={`font-bold ${match(info)
                              .with("Regular", () => "text-blue-600")
                              .with("Bridging", () => "text-green-600")
                              .exhaustive()}
                          `}
                          >
                            {info}
                          </div>
                        ),
                        () => <div className="text-red-600">Unknown</div>,
                      ),
                    )}
                  </TableCell>
                </TableRow>
              </Link>
            ))}
            {/* Added since last row has no vertical line */}
      {/* <TableRow
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
        </Table >
      </TableContainer > * /} */}
    </Paper >
  );
};



const handleUserInfo = (userInfo: ErrorResult | SuccessResult) => {
  const isSuccess = typeof userInfo !== "string";
  return isSuccess ? userInfo : O.None;
};

const isNotNullAndEmpty = (value: string | null) => {
  return value !== null && value !== "";
};

export default SubjectTable;
