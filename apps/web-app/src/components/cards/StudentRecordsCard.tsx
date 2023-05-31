import { Disclosure } from "@headlessui/react";
import { pipe } from "@mobily/ts-belt";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
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

export const hasInc = (semRecords: Records) => {
  return semRecords.some((record) => record.grade === 0);
};

export default function StudentProfileCard({ records }: Props) {
  const hasRecords = records.length > 0;

  const sortedRecords = groupBy(records, "semesterType");

  return (
    <>
      <Typography
        sx={{ marginLeft: "0.5in", marginTop: "0.3in" }}
        className="text-center text-lg"
        style={{ fontFamily: "Times New Roman", fontSize: "20px" }}
      >
        STUDENT RECORD
      </Typography>
      <CardContent>
        {hasRecords ? (
          Object.keys(sortedRecords).map((key: string) => (
            <Disclosure key={key}>
              {({ open }) => (
                <>
                  <Card className="mb-5">
                    <Accordion style={{ background: "#EDE7F6" }}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`${key}-content`}
                        id={`${key}-header`}
                      >
                        <Typography
                          sx={{
                            marginLeft: "0.5in",
                            textAlign: "left",
                          }}
                          style={{
                            fontFamily: "Times New Roman",
                            fontSize: "18px",
                          }}
                        >
                          <b> SCHOOL YEAR:</b>
                          {"\u00A0".repeat(5)}
                          {sortedRecords[key][0].schoolYear.startYear} -{" "}
                          {sortedRecords[key][0].schoolYear.endYear}
                          <br />
                          <b>SEMESTER: </b>
                          {"\u00A0".repeat(12)}
                          {key}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails style={{ background: "white" }}>
                        <CardContent>
                          <Table
                            sx={{ minWidth: 650 }}
                            aria-label="simple table"
                          >
                            <TableHead>
                              <TableRow>
                                <TableCell className="text-bold">
                                  Grade
                                </TableCell>
                                <TableCell className="text-bold">
                                  Subject
                                </TableCell>
                                <TableCell className="text-bold">
                                  Stub Code
                                </TableCell>
                                <TableCell className="text-bold">
                                  Units
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {sortedRecords[key].map((record: Record) => (
                                <TableRow key={record.id}>
                                  <TableCell
                                    sx={{
                                      color: getColor(record.grade),
                                      cursor: "pointer",
                                    }}
                                    className="text-bold"
                                  >
                                    <Tooltip title={getStatus(record.grade)}>
                                      <span>
                                        {record.grade === 0
                                          ? "INC"
                                          : record.grade}
                                      </span>
                                    </Tooltip>
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
                                <Typography
                                  sx={{ fontWeight: "bold", display: "inline" }}
                                >
                                  GWA:{` `}
                                </Typography>
                                {hasInc(sortedRecords[key])
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
                        </CardContent>
                      </AccordionDetails>
                    </Accordion>
                  </Card>
                </>
              )}
            </Disclosure>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">
            No records found
          </Typography>
        )}
      </CardContent>
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

const getColor = (grade: number) => {
  if (grade === 0) {
    return "red";
  } else if (grade <= 5 && grade > 3) {
    return "red";
  } else if (grade <= 3 && grade >= 1) {
    return "green";
  } else {
    return "red";
  }
};

const getStatus = (grade: number) => {
  if (grade === 0) {
    return "Failed";
  } else if (grade <= 5 && grade > 3) {
    return "Failed";
  } else if (grade <= 3 && grade >= 1) {
    return "Passed";
  } else {
    return "Failed";
  }
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
