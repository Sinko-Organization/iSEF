import { Box, Grid, SelectChangeEvent, TextField, MenuItem } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { type inferQueryOutput } from "@web-app/utils/trpc";
import { useState, type FC } from "react";
import { Search } from "@mui/icons-material";
import { useRouter } from "next/router";

interface SubjectTableProps {
  subjects: inferQueryOutput<"subjectList.getAll">;
}

type Subject = {
  id: string;
  title: string;
  subCode: string;
  units: number;
  credits: number;
  curriculum: string;
}

// function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator<Key extends keyof any>(
//   order: Order,
//   orderBy: Key,
// ): (
//   a: { [key in Key]: number | string | object },
//   b: { [key in Key]: number | string | object },
// ) => number {
//   return order === "desc"
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// interface HeadCell {
//   disablePadding: boolean;
//   id: string;
//   label: string;
//   numeric: boolean;
// }

// const headCells: readonly HeadCell[] = [
//   {
//     id: "stubCode",
//     numeric: true,
//     disablePadding: true,
//     label: "SUBJECT CODE"
//   },
//   {
//     id: "name",
//     numeric: true,
//     disablePadding: true,
//     label: "SUBJECT TITLE"
//   },
//   {
//     id: "units",
//     numeric: true,
//     disablePadding: true,
//     label: "UNITS"
//   },
//   {
//     id: "curriculum",
//     numeric: true,
//     disablePadding: true,
//     label: "CURRICULUM"
//   },
// ]

// type Order = "asc" | "desc";

// interface EnhancedTableProps {
//   numSelected: number;
//   onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
//   order: Order;
//   orderBy: string;
//   rowCount: number;
// }


// function EnhancedTableHead(props: EnhancedTableProps) {
//   const { order, orderBy, onRequestSort } = props;
//   const createSortHandler =
//     (property: string) => (event: React.MouseEvent<unknown>) => {
//       onRequestSort(event, property);
//     };

//   return (
//     <TableHead sx={{ backgroundColor: "#CABFE9" }}>
//       <TableRow>
//         {headCells.map((headCell) => (
//           <TableCell
//             key={headCell.id}
//             sx={{
//               fontSize: "15 px",
//               fontWeight: "bold",
//               textAlign: "center",
//               borderRight: "1px solid #ddd",
//               fontFamily: "Times New Roman",
//               // flex: 'fixed'
//             }}
//             sortDirection={orderBy === headCell.id ? order : false}
//           >
//             <TableSortLabel
//               active={orderBy === headCell.id}
//               direction={orderBy === headCell.id ? order : "asc"}
//               onClick={createSortHandler(headCell.id)}
//             >
//               {headCell.label}
//               {orderBy === headCell.id ? <Box component="span"></Box> : null}
//             </TableSortLabel>
//           </TableCell>
//         ))}
//       </TableRow>
//     </TableHead>
//   );
// }

const SubjectTable: FC<SubjectTableProps> = ({
  subjects,
}) => {

  const router = useRouter();

  // const [order, setOrder] = useState<Order>("asc");
  // const [orderBy, setOrderBy] = useState<string>("firstName");
  // const [selected] = useState<readonly string[]>([]);

  // const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(5);
  // const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
  //   router.push(`subject?id=${id}`);
  // };
  // const handleRequestSort = (
  //   event: React.MouseEvent<unknown>,
  //   property: string,
  // ) => {
  //   const isAsc = orderBy === property && order === "asc";
  //   setOrder(isAsc ? "desc" : "asc");
  //   setOrderBy(property);
  // };

  const [searchText, setSearchText] = useState("");
  const [filteredList, setFilteredList] = useState<Subject[]>(subjects);

  const curriculum = ["2022-2023", "2023-2024"]
  const curriculumList = curriculum.map(() => (
    <MenuItem >
      {curriculum}
    </MenuItem>
  ));

  const handleFilterChange = (e: SelectChangeEvent) => {
    let selectedCurriculum = e.target.value;

    if (selectedCurriculum === "All") {
      setFilteredList(subjects)
    }
    else {
      setFilteredList(subjects.filter(subject => subject.curriculum! === selectedCurriculum))
    }
  }

  const getSearchedSubjects = (searchText: string, subjectsList: Subject[]) => {

    if (!searchText) {
      return subjectsList
    }
    return subjectsList.filter(subject => subject.title.includes(searchText) || subject.subCode.includes(searchText))
  }

  const filteredSubjects = getSearchedSubjects(searchText, filteredList)

  // const handleChangePage = (event: unknown, newPage: number) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (
  //   event: React.ChangeEvent<HTMLInputElement>,
  // ) => {
  //   setRowsPerPage(Number.parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  // const isSelected = (name: string) => selected.includes(name);

  return (
    <Grid >
      {/*searchbar */}
      <Grid container justifyContent="flex-start">
        <Box>
          <Search /><input type="text" onChange={(e) => setSearchText(e.target.value)} />
        </Box>
      </Grid>
      {/* filter */}
      <Grid container justifyContent="flex-start">
        <Box>
          <TextField
            defaultValue="All"
            onChange={handleFilterChange}
            id="curriculum"
            select
            color="secondary"
          >
            <MenuItem value="All">All</MenuItem>
            {curriculumList}
          </TextField>
        </Box>
      </Grid>

      <Grid container justifyContent="flex-end">
        <Box>
          Add Subject Button
          {/* <AddSubjectButton /> */}
        </Box>
      </Grid>
      <Paper
        className="mt-10"
        sx={{
          boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.25)",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        {/* <Toolbar
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
            <div className="font-bold">SUBJECTS</div>
          </Typography>
        </Toolbar> */}

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Subject Code</TableCell>
                <TableCell>Subject Title</TableCell>
                <TableCell>Units</TableCell>
                <TableCell>Curriculum</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSubjects.map((subject) => {
                return (
                  <TableRow
                    key={subject.id}
                    hover
                  >
                    <TableCell>{subject.subCode}</TableCell>
                    <TableCell>{subject.title}</TableCell>
                    <TableCell>{subject.units}</TableCell>
                    <TableCell>{subject.curriculum}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper >
    </Grid >
  );
};



// const handleUserInfo = (userInfo: ErrorResult | SuccessResult) => {
//   const isSuccess = typeof userInfo !== "string";
//   return isSuccess ? userInfo : O.None;
// };

// const isNotNullAndEmpty = (value: string | null) => {
//   return value !== null && value !== "";
// };

export default SubjectTable;