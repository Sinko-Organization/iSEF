/* eslint-disable unicorn/no-nested-ternary */
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import type { SxProps } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import type { DependencyListV2 } from "@web-app/models/subject-dependencies/types";
import {
  findSubjectCorequisites,
  findSubjectDetails,
} from "@web-app/models/subject-dependencies/utils";
import { SubjectStatuses } from "@web-app/server/router/subject/types";
import type { inferQueryOutput } from "@web-app/utils/trpc";
import type { FC } from "react";
import { match } from "ts-pattern";

import { getOrdinalSuffix } from "./utils";

const style: SxProps = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
  overflowY: "auto",
};

const iconStyle = {
  color: "green",
  fontSize: "32px",
  marginRight: "8px",
};

const SubjectModal: FC<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  messages: (string | SubjectStatuses)[];
  currentYearLevel: number;
  courseDependencies: DependencyListV2;
  subjectDetails:
    | inferQueryOutput<"subject.getRecommendedSubjectsV2">[number]
    | null;
}> = ({
  isOpen,
  setIsOpen,
  messages,
  courseDependencies,
  subjectDetails,
  currentYearLevel,
}) => {
  const details = findSubjectDetails(
    subjectDetails?.stubCode ?? "",
    courseDependencies,
  );

  const coreqDetails = findSubjectCorequisites(
    subjectDetails?.stubCode ?? "",
    courseDependencies,
  );

  const handleClose = () => setIsOpen(false);

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ display: "flex", alignItems: "center" }}
        >
          {messages.some((message) => {
            if (typeof message !== "string" && "type" in message) {
              return message.type === "Failed";
            }
            return false;
          }) ? (
            <>
              <CancelIcon sx={{ ...iconStyle, color: "red" }} />
              <span>Subject failed!</span>
            </>
          ) : messages.includes("Not Taken") ? (
            <>
              <ReportProblemIcon
                sx={{ ...iconStyle, color: "orange", fontSize: "28px" }}
              />
              <span>Subject not yet taken.</span>
            </>
          ) : (
            <>
              <CheckCircleIcon sx={iconStyle} />
              <span>Subject passed!</span>
            </>
          )}
        </Typography>

        <Typography
          id="modal-modal-description"
          variant="body1"
          sx={{ marginTop: "40px" }}
        >
          <strong>Dependencies:</strong>
          {details?.prerequisites.length &&
          details?.prerequisites.length > 0 ? (
            <Table sx={{ marginTop: "8px", alignItems: "center" }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Stub Code</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {details.prerequisites.map((prereq) => {
                  const prereqDetails = findSubjectDetails(
                    prereq,
                    courseDependencies,
                  );

                  if (!prereqDetails) {
                    return <></>;
                  }
                  return (
                    <>
                      <TableRow>
                        <TableCell>{prereqDetails.name ?? "---"}</TableCell>
                        <TableCell>{prereqDetails.subjectCode}</TableCell>
                        <TableCell>
                          {messages.some((message) =>
                            match(message)
                              .with(
                                { type: "Failed Prerequisite" },
                                (subject) => {
                                  return subject.failedPrerequisites.includes(
                                    prereqDetails.subjectCode,
                                  );
                                },
                              )
                              .otherwise(() => false),
                          ) ? (
                            <div className="flex flex-row gap-1 font-bold text-red-600">
                              <CancelIcon sx={{ color: "red" }} />
                              Not Passed
                            </div>
                          ) : (
                            <div className="flex flex-row gap-1 font-bold text-green-600">
                              <CheckCircleIcon sx={{ color: "green" }} /> Passed
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    </>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <Box sx={{ marginTop: "8px", fontWeight: "semibold" }}>
              No dependencies for this subject.
            </Box>
          )}
        </Typography>

        {/* <Typography
          id="modal-modal-description"
          variant="body1"
          sx={{ marginTop: "16px", my: "40px" }}
        >
          <strong>Year Standing:</strong>
          {messages
            .filter((message) => {
              if (
                typeof message !== "string" &&
                message.type === "Low Year Standing"
              ) {
                return true;
              }
              return false;
            })
            .map((message) =>
              match(message)
                .with({ type: "Low Year Standing" }, (subject) => (
                  <Table sx={{ marginTop: "8px" }}>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          Subject Standing
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          Current Year Level
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          Status
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          {subject.yearStanding === "ALL"
                            ? "ALL"
                            : getOrdinalSuffix(subject.yearStanding) + " year"}
                        </TableCell>
                        <TableCell>
                          {getOrdinalSuffix(subject.currentYearLevel) + " year"}
                        </TableCell>
                        <TableCell>
                          {match(subject.yearStanding)
                            .with("ALL", () => (
                              <div className="flex flex-row gap-1 font-bold text-green-600">
                                <CheckCircleIcon sx={{ color: "green" }} />
                                Can Be Taken
                              </div>
                            ))
                            .otherwise(() => {
                              if (typeof subject.yearStanding === "string") {
                                return "Can't be taken";
                              }
                              const { yearStanding, currentYearLevel } =
                                subject;
                              const canBeTaken =
                                currentYearLevel >= yearStanding;

                              return canBeTaken ? (
                                <div className="flex flex-row gap-1 font-bold text-green-600">
                                  <CheckCircleIcon sx={{ color: "green" }} />
                                  Can Be Taken
                                </div>
                              ) : (
                                <div className="flex flex-row gap-1 font-bold text-red-600">
                                  <CancelIcon sx={{ color: "red" }} />
                                  Can&apos;t be taken
                                </div>
                              );
                            })}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                ))
                .otherwise(() => <div>No Year Standing</div>),
            )}
          {messages.filter((message) => {
            if (
              typeof message !== "string" &&
              message.type === "Low Year Standing"
            ) {
              return true;
            }
            return false;
          }).length === 0 && <div className="mt-2">No Year Standing</div>}
        </Typography> */}

        <Typography
          id="modal-modal-description"
          variant="body1"
          sx={{ marginTop: "16px", my: "40px" }}
        >
          <strong>Year Standing:</strong>
          {details?.yearStanding !== undefined ? (
            <Table sx={{ marginTop: "8px" }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Subject Standing
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Current Year Level
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    {details.yearStanding === "ALL"
                      ? "ALL"
                      : getOrdinalSuffix(details.yearStanding) + " year"}
                  </TableCell>
                  <TableCell>
                    {getOrdinalSuffix(currentYearLevel) + " year"}
                  </TableCell>
                  <TableCell>
                    {match(details.yearStanding)
                      .with("ALL", () => (
                        <div className="flex flex-row gap-1 font-bold text-green-600">
                          <CheckCircleIcon sx={{ color: "green" }} />
                          Can Be Taken
                        </div>
                      ))
                      .otherwise(() => {
                        if (typeof details.yearStanding === "string") {
                          return "Can't be taken";
                        }
                        const { yearStanding } = details;

                        const canBeTaken =
                          yearStanding !== undefined
                            ? currentYearLevel >= yearStanding
                            : false;

                        return canBeTaken ? (
                          <div className="flex flex-row gap-1 font-bold text-green-600">
                            <CheckCircleIcon sx={{ color: "green" }} />
                            Can Be Taken
                          </div>
                        ) : (
                          <div className="flex flex-row gap-1 font-bold text-red-600">
                            <CancelIcon sx={{ color: "red" }} />
                            Can&apos;t be taken
                          </div>
                        );
                      })}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          ) : (
            <div className="mt-2">No Year Standing</div>
          )}
        </Typography>

        <Typography
          id="modal-modal-description"
          variant="body1"
          sx={{ marginTop: "40px" }}
        >
          <strong>Corequisites:</strong>
          {coreqDetails.length > 0 ? (
            <Table sx={{ marginTop: "8px", alignItems: "center" }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Stub Code</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {coreqDetails.map((coreq) => {
                  return (
                    <>
                      <TableRow>
                        <TableCell>{coreq.name ?? "---"}</TableCell>
                        <TableCell>{coreq.subjectCode}</TableCell>
                      </TableRow>
                    </>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <Box sx={{ marginTop: "8px", fontWeight: "semibold" }}>
              No corequisites for this subject.
            </Box>
          )}
        </Typography>
      </Box>
    </Modal>
  );
};

export default SubjectModal;
