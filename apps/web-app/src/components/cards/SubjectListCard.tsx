/* eslint-disable @typescript-eslint/no-non-null-assertion */
import InfoTwoToneIcon from "@mui/icons-material/InfoTwoTone";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
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
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { SubjectModal } from "@web-app/components/modals";
import type { SuccessResult } from "@web-app/helpers/getUserInfo";
import { engineeringDependencies } from "@web-app/models/subject-dependencies";
import type { Courses } from "@web-app/models/subject-dependencies/types";
import { SubjectStatuses } from "@web-app/server/router/subject/types";
import { trpc } from "@web-app/utils/trpc";
import type { inferQueryOutput } from "@web-app/utils/trpc";
import { useState } from "react";
import type { FC } from "react";
import { match } from "ts-pattern";

type Props = {
  studentId: string;
  semesterType: "FIRST" | "SECOND" | "SUMMER";
  enrollmentType: "Regular" | "Bridging";
  course: Courses;
  userInfo: SuccessResult;
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

type Messages = (string | SubjectStatuses)[];
type SubjectDetails =
  | inferQueryOutput<"subject.getRecommendedSubjects">[number]
  | null;

export default function StudentProfileCard({
  studentId,
  enrollmentType,
  course,
  userInfo,
}: Props) {
  const [messages, setMessages] = useState<Messages>([]);
  const [subjectDetails, setSubjectDetails] = useState<SubjectDetails>(null);
  const [isHoverModalOpen, setIsHoverModalOpen] = useState<boolean>(false);
  const [version, setVersion] = useState<string>("1");

  const courseDependencies = engineeringDependencies[userInfo.course][
    Number.parseInt(version)
  ]!.filter((dep) => dep.enrollmentType === enrollmentType);

  const handleChange = (event: SelectChangeEvent) => {
    setVersion(event.target.value as string);
  };

  const { data: recommendedV2 } = trpc.useQuery([
    "subject.getRecommendedSubjects",
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

  const clickSubjectDetail =
    (messages: Messages, subject: SubjectDetails) => () => {
      setMessages(messages);
      setSubjectDetails(subject);
      setIsHoverModalOpen(true);
    };

  return (
    <>
      <Card>
        <CardHeader
          sx={{
            fontWeight: "bold",
          }}
          title={"All Subjects"}
          action={
            <div className="flex flex-row gap-5">
              <BasicSelect version={version} handleChange={handleChange} />
            </div>
          }
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
                  {/* <TableCell className="text-bold">Message</TableCell> */}
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
                      key={`${subj.name}-${idx}`}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>
                        <Tooltip title="Subject Info">
                          <InfoTwoToneIcon
                            onClick={clickSubjectDetail(subj.messages, subj)}
                            color="secondary"
                            className="mr-2"
                          />
                        </Tooltip>
                        {subj.name}
                      </TableCell>
                      <TableCell>{subj.stubCode}</TableCell>
                      <TableCell>{subj.units}</TableCell>
                      <TableCell
                        sx={{
                          cursor: "pointer",
                        }}
                      >
                        <Tooltip
                          title={match(subj.status)
                            .with("Valid", () => "🟢 Subject can be taken")
                            .with("Invalid", () => "🔴 Subject cannot be taken")
                            .exhaustive()}
                        >
                          <Button
                            sx={{
                              color: subj.status === "Valid" ? "green" : "red",
                            }}
                          >
                            {subj.status}
                          </Button>
                        </Tooltip>
                      </TableCell>
                      <TableCell>{subj.yearLevel}</TableCell>
                      <TableCell className="capitalize">
                        {subj.semesterType.toLowerCase()}
                      </TableCell>
                      {/* <TableCell>
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
                      </TableCell> */}
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
      <SubjectModal
        messages={messages}
        isOpen={isHoverModalOpen}
        setIsOpen={setIsHoverModalOpen}
        courseDependencies={courseDependencies}
        subjectDetails={subjectDetails}
        currentYearLevel={userInfo.yearLevel}
      />
    </>
  );
}
