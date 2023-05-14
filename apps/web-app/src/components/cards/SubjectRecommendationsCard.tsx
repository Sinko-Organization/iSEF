/* eslint-disable prefer-const */

/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable @typescript-eslint/no-non-null-assertion */
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
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { SubjectInfoModal } from "@web-app/components/modals";
import type { SuccessResult } from "@web-app/helpers/getUserInfo";
import { getTotalCreditUnits } from "@web-app/helpers/getUserInfo";
import { engineeringDependencies } from "@web-app/models/subject-dependencies";
import type { Courses } from "@web-app/models/subject-dependencies/types";
import { findSubjectDetails } from "@web-app/models/subject-dependencies/utils";
import { SubjectStatuses } from "@web-app/server/router/subject/types";
import type { inferQueryOutput } from "@web-app/utils/trpc";
import { trpc } from "@web-app/utils/trpc";
import { useState } from "react";
import type { FC } from "react";

type Props = {
  studentId: string;
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
  | inferQueryOutput<"subject.getRecommendedSubjectsV2">[number]
  | null;

type SubjectDetailsV2 = inferQueryOutput<"subject.getRecommendedSubjectsV2">;

export default function StudentProfileCard({
  studentId,
  enrollmentType,
  course,
  userInfo,
}: Props) {
  const [, setMessages] = useState<Messages>([]);
  const [subjectDetails, setSubjectDetails] = useState<SubjectDetails>(null);
  const [isHoverModalOpen, setIsHoverModalOpen] = useState<boolean>(false);
  const [version, setVersion] = useState<string>("1");

  const courseDependencies =
    engineeringDependencies[userInfo.course][Number.parseInt(version)]!;

  const creditUnits = getTotalCreditUnits({
    course,
    enrollmentType,
    semesterType: userInfo.semesterType,
    version: Number.parseInt(version),
    yearLevel: userInfo.yearLevel,
  });

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

  const validRecommendends = recommendedV2.filter(
    (subj) => subj.status === "Valid",
  );

  const formattedSubjects = getRecommendedSubs(
    recommendedV2
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
      .filter((subj) => subj.status === "Valid")
      .filter((subj) => {
        const subDetail = findSubjectDetails(subj.stubCode, courseDependencies);
        if (!subDetail) {
          return false;
        }
        const coreqs = subDetail.coRequisites;
        let isValid = true;

        for (const coreq of coreqs) {
          if (!validRecommendends.some((subj) => subj.stubCode === coreq)) {
            isValid = false;
          }
        }

        return isValid;
      }),
    creditUnits ?? 0,
  );

  const totalCurrentUnits = formattedSubjects.reduce((acc, curr) => {
    return acc + curr.units;
  }, 0);

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
          title="Recommended Subjects"
          action={
            <div className="flex align-middle flex-row gap-5">
              <div className="my-auto font-normal">
                Total Allowed Units: {creditUnits ?? "--"}
              </div>
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
                  <TableCell className="text-bold">Year Level</TableCell>
                  <TableCell className="text-bold">Semester Type</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {formattedSubjects.map((subj, idx) => (
                  <TableRow
                    key={`${subj.id}-${subj.name}-${idx}`}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>
                      <Tooltip className="cursor-pointer" title={subj.name}>
                        <div onClick={clickSubjectDetail(subj.messages, subj)}>
                          {subj.name}
                        </div>
                      </Tooltip>
                    </TableCell>
                    <TableCell>{subj.stubCode}</TableCell>
                    <TableCell>{subj.units}</TableCell>
                    <TableCell>{subj.yearLevel}</TableCell>
                    <TableCell className="capitalize">
                      {subj.semesterType.toLowerCase()}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Total: {totalCurrentUnits} / {creditUnits ?? "--"}
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          ) : (
            <Typography variant="body2" color="text.secondary">
              No records found
            </Typography>
          )}
        </CardContent>
      </Card>
      <SubjectInfoModal
        isOpen={isHoverModalOpen}
        setIsOpen={setIsHoverModalOpen}
        courseDependencies={courseDependencies.filter(
          (dep) => dep.enrollmentType === enrollmentType,
        )}
        subjectDetails={subjectDetails}
      />
    </>
  );
}

const getRecommendedSubs = (subs: SubjectDetailsV2, creditUnits: number) => {
  let result: SubjectDetailsV2 = [];
  let totalUnits = 0;

  for (const sub of subs) {
    if (totalUnits + sub.units <= creditUnits) {
      result.push(sub);
      totalUnits += sub.units;
    }
  }

  return result;
};
