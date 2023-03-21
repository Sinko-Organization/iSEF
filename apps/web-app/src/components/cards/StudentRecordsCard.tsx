import { pipe } from "@mobily/ts-belt";
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
type Record = Records[number];

type Props = {
  records: Records;
};
type Result = {
  title: string;
  grade: string | number;
  color: string;
};

export const groupBy = (arr: Records, key: any) => {
  // eslint-disable-next-line unicorn/no-array-reduce
  return arr.reduce((acc: any, obj: any) => {
    const groupKey = obj[key];
    acc[groupKey] = acc[groupKey] || [];
    acc[groupKey].push(obj);
    return acc;
  }, {});
};

export const roundedSemGwa = (semRecords: Records) => {
  const gwa =
    sumBy(semRecords, (record) => record.grade * record.subject.units) /
    sumBy(semRecords, (record) => record.subject.units);

  return Number.parseFloat(gwa.toFixed(2));
};

export default function StudentProfileCard({ records }: Props) {
  const hasRecords = records.length > 0;
  const hasInc = records.some((record) => record.grade === 0);

  const sortedRecords = groupBy(records, "semesterType");
  // returns {FIRST:{...}, SECOND:{...}, SUMMER:{...}}

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
          {hasRecords ? (
            Object.keys(sortedRecords).map((key: string) => (
              <Table
                key={`${key}`}
                sx={{ minWidth: 650 }}
                aria-label="simple table"
              >
                <TableHead>
                  <div>Semester: {key}</div>
                  <div>
                    School Year: {sortedRecords[key][0].schoolYear.startYear} -{" "}
                    {sortedRecords[key][0].schoolYear.endYear}
                  </div>
                  <TableRow>
                    <TableCell className="text-bold">Grade</TableCell>
                    <TableCell className="text-bold">Subject</TableCell>
                    <TableCell className="text-bold">Stub Code</TableCell>
                    <TableCell className="text-bold">Units</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedRecords[key].map((record: Record) => (
                    <TableRow key={record.id}>
                      <TableCell className="text-bold">
                        {record.grade}
                      </TableCell>
                      <TableCell className="text-bold">
                        {record.subject.name}
                      </TableCell>
                      <TableCell className="text-bold">
                        {record.subject.stubCode}
                      </TableCell>
                      <TableCell className="text-bold">
                        {record.subject.units}
                      </TableCell>
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
                      GWA:{` `}
                    </Typography>
                    {hasInc
                      ? displayGrade({
                          title: "Incomplete",
                          grade: "INC",
                          color: "red",
                        })
                      : pipe(
                          roundedSemGwa(sortedRecords[key]),
                          evaluateGrade,
                          displayGrade,
                        )}
                  </TableRow>
                </TableFooter>
              </Table>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">
              No records found
            </Typography>
          )}
        </CardContent>
      </Card>
    </>
  );
}

const displayGrade = (result: Result) => {
  const { title, grade, color } = result;
  return (
    <Tooltip title={title}>
      <Typography
        className="cursor-pointer"
        sx={{
          color,
          display: "inline",
        }}
      >
        {grade}
      </Typography>
    </Tooltip>
  );
};

const evaluateGrade = (grade: number): Result => {
  if (grade === 0) {
    return {
      title: "Incomplete",
      grade: "INC",
      color: "red",
    };
  } else if (grade <= 5 && grade > 3) {
    return {
      title: "Fail",
      grade,
      color: "red",
    };
  } else if (grade <= 3 && grade >= 1) {
    return {
      title: "Pass",
      grade,
      color: "green",
    };
  } else {
    return {
      title: "Invalid grade",
      grade: "N/A",
      color: "red",
    };
  }
};
