import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import type { SelectChangeEvent } from "@mui/material/Select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import type { Courses } from "@web-app/models/subject-dependencies/types";
import { trpc } from "@web-app/utils/trpc";
import { useState } from "react";
import type { FC } from "react";
import { P, match } from "ts-pattern";

type Props = {
  studentId: string;
  semesterType: "FIRST" | "SECOND" | "SUMMER";
  enrollmentType: "Regular" | "Bridging";
  course: Courses;
};

type SelectionProps = {
  version: string;
  handleChange: (event: SelectChangeEvent) => void;
};

export const BasicSelect: FC<SelectionProps> = ({ version, handleChange }) => {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel>Version</InputLabel>
        <Select value={version} label="Version" onChange={handleChange}>
          <MenuItem value={"1"}>2018-2019</MenuItem>
          <MenuItem value={"2"}>2022-2023</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default function StudentProfileCard({
  studentId,
  enrollmentType,
  course,
}: Props) {
  const [version, setVersion] = useState<string>("1");

  const handleChange = (event: SelectChangeEvent) => {
    setVersion(event.target.value as string);
  };

  const { data: recommendedV2 } = trpc.useQuery([
    "subject.getRecommendedSubjectsV2",
    {
      studentId,
      enrollmentType,
      course,
      versionNumber: Number.parseInt(version),
    },
  ]);

  if (!recommendedV2) {
    return <></>;
  }

  return (
    <>
      <Card>
        <CardHeader
          sx={{
            fontWeight: "bold",
          }}
          title={"All Subjects"}
          action={<BasicSelect version={version} handleChange={handleChange} />}
        />
        <CardContent>
          {recommendedV2 ? (
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className="text-bold">Subject</TableCell>
                  <TableCell className="text-bold">Subject Code</TableCell>
                  <TableCell className="text-bold">Units</TableCell>
                  <TableCell className="text-bold">Status</TableCell>
                  <TableCell className="text-bold">Year Level</TableCell>
                  <TableCell className="text-bold">Semester Type</TableCell>
                  <TableCell className="text-bold">Message</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recommendedV2
                  .sort((a, b) => {
                    if (a.yearLevel !== b.yearLevel) {
                      return a.yearLevel - b.yearLevel;
                    }

                    if (a.semesterType !== b.semesterType) {
                      const semesterTypeOrder = ["FIRST", "SECOND", "SUMMER"];
                      return (
                        semesterTypeOrder.indexOf(a.semesterType) -
                        semesterTypeOrder.indexOf(b.semesterType)
                      );
                    }

                    return a.name.localeCompare(b.name);
                  })
                  .map((subj, idx) => (
                    <TableRow
                      key={`${subj.id}-${subj.name}-${idx}`}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{subj.name}</TableCell>
                      <TableCell>{subj.stubCode}</TableCell>
                      <TableCell>{subj.units}</TableCell>
                      <TableCell>{subj.status}</TableCell>
                      <TableCell>{subj.yearLevel}</TableCell>
                      <TableCell className="capitalize">
                        {subj.semesterType.toLowerCase()}
                      </TableCell>
                      <TableCell>
                        {subj.messages
                          .map((message) =>
                            match(message)
                              .with(P.string, (str) => str)
                              .with(
                                { type: "Failed Prerequisite" },
                                (res) =>
                                  "(Failed Prerequisities: " +
                                  res.failedPrerequisites
                                    .map((prereq) => prereq)
                                    .join(", ") +
                                  ")",
                              )
                              .with(
                                { type: "Low Year Standing" },
                                (res) =>
                                  `(Year Standing: ${res.yearStanding}, Current Year Level: ${res.currentYearLevel})`,
                              )
                              .with(
                                { type: "Failed" },
                                (res) => `(Failed: ${res.grade})`,
                              )
                              .exhaustive(),
                          )
                          .join(", ")}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
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
