import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableFooter from "@mui/material/TableFooter";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import type { inferQueryOutput } from "@web-app/utils/trpc";
import { sumBy } from "lodash";

type Records = inferQueryOutput<"studentData.details">["studentRecords"];
type Props = {
  records: Records;
};

const sampleRecords: Records = [
  {
    schoolYear: {
      id: "1",
      startYear: 2021,
      endYear: 2022,
    },
    course: {
      id: "1",
      name: "BSIT",
    },
    subject: {
      id: "1",
      name: "Introduction to Programming",
      stubCode: "ITP 101",
      units: 3,
    },
    grade: 0,
    id: "1",
  },
];

export default function StudentProfileCard({ records }: Props) {
  return (
    <>
      <Card>
        <CardHeader
          sx={{
            fontWeight: "bold",
          }}
          title={"Student Records"}
        />
        <CardContent>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="text-bold">Grade</TableCell>
                <TableCell className="text-bold">Subject</TableCell>
                <TableCell className="text-bold">Stub Code</TableCell>
                <TableCell className="text-bold">Units</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records.map((record, idx) => (
                <TableRow
                  key={`${record.id}-${record.subject.name}-${idx}`}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    {(record.grade <= 5 && record.grade >= 3) ||
                    record.grade === 0 ? (
                      <Tooltip title={record.grade === 0 ? "INC" : "Fail"}>
                        <Typography
                          className="cursor-pointer"
                          sx={{
                            color: "red",
                            fontWeight: "bold",
                            display: "inline",
                          }}
                        >
                          {record.grade === 0 ? "INC" : record.grade}
                        </Typography>
                      </Tooltip>
                    ) : (
                      <Typography
                        className="cursor-pointer"
                        sx={{
                          color: "green",
                          fontWeight: "bold",
                          display: "inline",
                        }}
                      >
                        {record.grade}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>{record.subject.name}</TableCell>
                  <TableCell>{record.subject.stubCode}</TableCell>
                  <TableCell>{record.subject.units}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter
              sx={{
                mt: 2,
              }}
            >
              <TableRow>
                <Typography sx={{ fontWeight: "bold", display: "inline" }}>
                  GPA:
                </Typography>
                {sumBy(
                  records,
                  (record) => record.grade * record.subject.units,
                ) / sumBy(records, (record) => record.subject.units)}
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
