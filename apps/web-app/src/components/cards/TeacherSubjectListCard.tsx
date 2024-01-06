import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InfoTwoToneIcon from "@mui/icons-material/InfoTwoTone";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    TableFooter,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
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
import { SubjectStatuses } from "@web-app/server/router/subject/types";
import { trpc } from "@web-app/utils/trpc";
import type { inferQueryOutput } from "@web-app/utils/trpc";
import { useState } from "react";
import type { FC } from "react";


type SubjectDetails =
  | inferQueryOutput<"subject.getAll">[number]
  | null;

export default function TeacherSubjectListCard() {

    return (
        <>
            <CardContent>
                <Accordion style={{ backgroundColor: "#EDE7F6", marginBottom: "20px"  }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        style={{ backgroundColor: "#EDE7F6" }}
                    >
                        <Typography
                            sx={{ marginLeft: "0.5in", marginTop: "0.3in" }}
                            className="text-center text-lg"
                            style={{ fontFamily: "Times New Roman", fontSize: "18px" }}
                        >
                            <b>FIRST SEMESTER</b>
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{ background: "white" }}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Subject Code</TableCell>
                                    <TableCell align="center">Subject Name</TableCell>
                                    <TableCell align="center">Units</TableCell>
                                </TableRow>
                            </TableHead>
                        </Table>
                    </AccordionDetails>
                </Accordion>

                <Accordion style={{ backgroundColor: "#EDE7F6", marginBottom: "20px"  }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        style={{ backgroundColor: "#EDE7F6" }}
                    >
                        <Typography
                            sx={{ marginLeft: "0.5in", marginTop: "0.3in" }}
                            className="text-center text-lg"
                            style={{ fontFamily: "Times New Roman", fontSize: "18px" }}
                        >
                            <b>SECOND SEMESTER</b>
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{ background: "white" }}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Subject Code</TableCell>
                                    <TableCell align="center">Subject Name</TableCell>
                                    <TableCell align="center">Units</TableCell>
                                </TableRow>
                            </TableHead>
                        </Table>
                    </AccordionDetails>
                </Accordion>

                <Accordion style={{ backgroundColor: "#EDE7F6", marginBottom: "20px"  }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        style={{ backgroundColor: "#EDE7F6" }}
                    >
                        <Typography
                            sx={{ marginLeft: "0.5in", marginTop: "0.3in" }}
                            className="text-center text-lg"
                            style={{ fontFamily: "Times New Roman", fontSize: "18px" }}
                        >
                            <b>SUMMER</b>
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{ background: "white" }}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Subject Code</TableCell>
                                    <TableCell align="center">Subject Name</TableCell>
                                    <TableCell align="center">Units</TableCell>
                                </TableRow>
                            </TableHead>
                        </Table>
                    </AccordionDetails>
                </Accordion>
            </CardContent>
        </>
    )
}

