import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useCourseStore, useHonorsFilterStore } from "@web-app/stores";
import type { NonNullableValues } from "@web-app/types/generics";
import type { inferQueryOutput } from "@web-app/utils/trpc";
import { useRouter } from "next/router";
import { useState } from "react";
import type { FC } from "react";

type HonorsListType = inferQueryOutput<"honors.getAll">;
type Unpacked<T> = T extends (infer U)[] ? U : T;
type HonorsTypeRaw = Unpacked<HonorsListType>;
type HonorsType = NonNullableValues<HonorsTypeRaw>;

interface HonorsList {
  honorsList: HonorsType[];
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

type Order = "asc" | "desc";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    id: "studentIdNumber",
    numeric: false,
    disablePadding: true,
    label: "ID",
  },
  {
    id: "lastName",
    numeric: true,
    disablePadding: false,
    label: "LAST NAME",
  },
  {
    id: "firstName",
    numeric: true,
    disablePadding: false,
    label: "FIRST NAME",
  },
  {
    id: "course",
    numeric: true,
    disablePadding: false,
    label: "COURSE",
  },
  {
    id: "gwa",
    numeric: true,
    disablePadding: false,
    label: "GWA",
  },
];

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

const HonorsListTable: FC<HonorsList> = ({ honorsList }) => {
  const router = useRouter();

  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<string>("firstName");
  const [selected] = useState<readonly string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { course: courseId } = useCourseStore();
  const { yearLevel } = useHonorsFilterStore();

  const printToPDF = () => {
    if (courseId && yearLevel) {
      router.push("/pdf");
    } else {
      console.error("No course or year level selected");
    }
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string,
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    router.push(`student?id=${id}`);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name: string) => selected.includes(name);

  return (
    <>
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
            <div className="font-bold">HONOR&apos;S LIST</div>
          </Typography>
          <Tooltip title="Print to PDF" onClick={printToPDF}>
            <IconButton aria-label="print to pdf">
              <PictureAsPdfIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
        <TableContainer>
          <Table sx={{ minWidth: 1000 }} aria-label="simple table">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={honorsList.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                rows.sort(getComparator(order, orderBy)).slice() */}
              {honorsList
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  const isItemSelected = isSelected(row.firstName);

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
                          {row.studentIdNumber}
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{
                            textAlign: "center",
                            borderRight: "1px solid #ddd",
                          }}
                        >
                          {row.lastName}
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{
                            textAlign: "center",
                            borderRight: "1px solid #ddd",
                          }}
                        >
                          {row.firstName}
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{
                            textAlign: "center",
                            borderRight: "1px solid #ddd",
                          }}
                        >
                          {row.studentRecords[0]?.course.name ?? "No Course"}
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{
                            textAlign: "center",
                            borderRight: "1px solid #ddd",
                          }}
                        >
                          {row.gwa.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    </>
                  );
                })}
              {/* Added since last row has no vertical line */}
              <TableRow
                sx={{
                  cursor: "pointer",
                  display: "none",
                }}
                hover
              >
                <TableCell
                  align="right"
                  sx={{ textAlign: "center" }}
                ></TableCell>
                <TableCell
                  align="right"
                  sx={{ textAlign: "center" }}
                ></TableCell>
                <TableCell
                  align="right"
                  sx={{ textAlign: "center" }}
                ></TableCell>
                <TableCell
                  align="right"
                  sx={{ textAlign: "center" }}
                ></TableCell>
                <TableCell
                  align="right"
                  sx={{ textAlign: "center" }}
                ></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 15, 20, 25]}
          component="div"
          count={honorsList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default HonorsListTable;
