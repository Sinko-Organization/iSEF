/* eslint-disable @typescript-eslint/no-non-null-assertion */
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InfoTwoToneIcon from "@mui/icons-material/InfoTwoTone";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Tab,
} from "@mui/material";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import { CardContent } from "@mui/material";
import Typography from "@mui/material/Typography";
import { AddTeacherSubjects } from "../buttons";

export default function TeacherSubjectListCard() {

    const handleAddSubjectClick = () => {
        console.log("Add Subject Clicked");
    };

    return (
        <>
            <CardContent>
  
                        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
                            <AddTeacherSubjects />
                        </div>
                     
                <Accordion style={{ background: "#EDE7F6", marginBottom: "10px" }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="all-subjects-content"
                        id="all-subjects-header">
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
                            <b>First Semester</b>
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{ background: "white" }}>
                        <Table sx={{ minWidth: 650 }} aria-labels="simple table">

                            <TableHead>
                                <TableRow>
                                    <TableCell className="text-bold">Subject</TableCell>
                                    <TableCell className="text-bold">Subject Name</TableCell>
                                    <TableCell className="text-bold">Subject Code</TableCell>
                                    <TableCell className="text-bold">Units</TableCell>
                                    <TableCell className="text-bold">Room</TableCell>
                                </TableRow>
                            </TableHead>
                        </Table>
                    </AccordionDetails>
                </Accordion>

                <Accordion style={{ background: "#EDE7F6", marginBottom: "10px" }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="all-subjects-content"
                        id="all-subjects-header">
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
                            <b>Second Semester</b>
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{ background: "white" }}>
                        <Table sx={{ minWidth: 650 }} aria-labels="simple table">

                            <TableHead>
                                <TableRow>
                                    <TableCell className="text-bold">Subject</TableCell>
                                    <TableCell className="text-bold">Subject Name</TableCell>
                                    <TableCell className="text-bold">Subject Code</TableCell>
                                    <TableCell className="text-bold">Units</TableCell>
                                    <TableCell className="text-bold">Room</TableCell>
                                </TableRow>
                            </TableHead>
                        </Table>
                    </AccordionDetails>
                </Accordion>

  
                <Accordion style={{ background: "#EDE7F6" }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="all-subjects-content"
                        id="all-subjects-header">
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
                            <b>Summer</b>
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{ background: "white" }}>
                        <Table sx={{ minWidth: 650 }} aria-labels="simple table">

                            <TableHead>
                                <TableRow>
                                    <TableCell className="text-bold">Subject</TableCell>
                                    <TableCell className="text-bold">Subject Name</TableCell>
                                    <TableCell className="text-bold">Subject Code</TableCell>
                                    <TableCell className="text-bold">Units</TableCell>
                                    <TableCell className="text-bold">Room</TableCell>
                                </TableRow>
                            </TableHead>
                        </Table>
                    </AccordionDetails>
                </Accordion>
            </CardContent>
        </>
    );

}