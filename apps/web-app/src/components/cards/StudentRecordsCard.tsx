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
import { trpc } from "@web-app/utils/trpc";
import { sumBy } from "lodash";
import { useEffect } from "react";

type Records = inferQueryOutput<"studentData.details">["studentRecords"];
type Props = {
  records: Records;
  studentId: string;
  semesterType: "FIRST" | "SECOND" | "SUMMER";
};
type Result = {
  title: string;
  grade: string | number;
  color: string;
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
    grade: 2,
    id: "1",
  },
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
    grade: 5,
    id: "1",
  },
];

export default function StudentProfileCard({
  records,
  studentId,
  semesterType,
}: Props) {
  const hasRecords = records.length > 0;
  const hasInc = records.some((record) => record.grade === 0);
  const gwa =
    sumBy(records, (record) => record.grade * record.subject.units) /
    sumBy(records, (record) => record.subject.units);
  const roundedGWA = Number.parseFloat(gwa.toFixed(2));

  const { data: recommended } = trpc.useQuery([
    "subject.getRecommendedSubjects",
    {
      studentId,
      semesterType,
      studentRecords: records.map((record) => ({
        id: record.id,
        subjectId: record.subject.id,
        remark: record.grade <= 3 ? "Passed" : "Failed",
      })),
      courseId: records[0]?.course.id ?? "",
      schoolYearId: records[0]?.schoolYear.id ?? "",
    },
  ]);

  useEffect(() => {
    if (recommended) {
      console.log(recommended);
    }
  }, [recommended]);

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
                      {pipe(record.grade, evaluateGrade, displayGrade)}
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
                    GWA:{` `}
                  </Typography>
                  {hasInc
                    ? displayGrade({
                        title: "Incomplete",
                        grade: "INC",
                        color: "red",
                      })
                    : pipe(roundedGWA, evaluateGrade, displayGrade)}
                </TableRow>
              </TableFooter>
            </Table>
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
