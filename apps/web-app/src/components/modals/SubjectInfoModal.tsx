/* eslint-disable unicorn/no-nested-ternary */
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import type { DependencyListV2 } from "@web-app/models/subject-dependencies/types";
import { findSubjectCorequisites } from "@web-app/models/subject-dependencies/utils";
import type { inferQueryOutput } from "@web-app/utils/trpc";
import type { FC } from "react";

const style = {
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
};

const iconStyle = {
  color: "green",
  fontSize: "32px",
  marginRight: "8px",
};

const SubjectInfoModal: FC<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  courseDependencies: DependencyListV2;
  subjectDetails:
    | inferQueryOutput<"subject.getRecommendedSubjects">[number]
    | null;
}> = ({ isOpen, setIsOpen, courseDependencies, subjectDetails }) => {
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
          <CheckCircleIcon sx={iconStyle} />
          <span>Subject Detail</span>
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

export default SubjectInfoModal;
