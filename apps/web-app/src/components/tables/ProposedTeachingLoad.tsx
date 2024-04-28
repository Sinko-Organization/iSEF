import { Box, Grid, SelectChangeEvent, TextField, MenuItem, CircularProgress, Toolbar, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { inferQueryOutput, trpc } from "@web-app/utils/trpc";
import { FC } from "react";
import { EducationLoader } from "../loaders";
import router from "next/router";

interface ProposedTeachingLoadTableProps {
    PTLs: inferQueryOutput<"proposedTeachingLoad.getAll">;
}

const cellStyle: React.CSSProperties = {
    backgroundColor: "#CABFE9",
    fontSize: "16px",
    fontWeight: "bold",
    padding: "10px",
    color: "black",
    border: "1px solid #ddd",
    borderRadius: 2,
    fontFamily: "Times New Roman",
    textAlign: "center"
};



const ProposedTeachingLoadTable: FC<ProposedTeachingLoadTableProps> = ({ PTLs }) => {
    console.log(PTLs)

    const handlePTLSelect = (PTLId: string) => {
        router.push(`/proposed-teaching-load/${PTLId}`);

    };

    if (!PTLs) {
        return <EducationLoader />
    }

    return (
        <Grid>
            <Paper
                className="mt-10"
                sx={{
                    boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.25)",
                    borderRadius: 2,
                    overflow: "hidden",
                }}>

                <Toolbar
                    sx={{
                        backgroundColor: "#B2A1E1",
                        pl: { sm: 2 },
                        pr: { xs: 1, sm: 1 },
                        borderBottom: "1px solid #ddd",
                        color: "white",
                        textAlign: "center",
                    }}
                >
                    <Typography
                        sx={{
                            flex: "1 1 100%",
                            fontFamily: "Times New Roman",
                            fontSize: "20px",
                        }}
                        // variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        <div className="font-bold"> PROPOSED TEACHING LOAD </div>
                    </Typography>
                </Toolbar>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={cellStyle}>Subject Code</TableCell>
                                <TableCell style={cellStyle}>Teacher ID</TableCell>
                                <TableCell style={cellStyle}>Sections</TableCell>
                                <TableCell style={cellStyle}>Lec Hours</TableCell>
                                <TableCell style={cellStyle}>Lab Hours</TableCell>
                                <TableCell style={cellStyle}>Remarks</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {PTLs!.map((PTL) => {
                                return (
                                    <TableRow
                                        key={PTL.id}
                                        onClick={() =>
                                            handlePTLSelect(PTL.id.toString())
                                        }
                                        hover
                                    >
                                        <TableCell
                                            style={{
                                                textAlign: "center",
                                                fontFamily: "Arial",
                                                border: "1px solid #e5e7eb",
                                                borderRadius: 2,
                                            }}
                                        >
                                            {PTL.subCode}
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                textAlign: "center",
                                                fontFamily: "Arial",
                                                border: "1px solid #e5e7eb",
                                                borderRadius: 2,
                                            }}
                                        >
                                            {PTL.teacherId}
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                textAlign: "center",
                                                fontFamily: "Arial",
                                                border: "1px solid #e5e7eb",
                                                borderRadius: 2,
                                            }}
                                        >
                                            {PTL.sections}
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                textAlign: "center",
                                                fontFamily: "Arial",
                                                border: "1px solid #e5e7eb",
                                                borderRadius: 2,
                                            }}
                                        >
                                            {PTL.lecHours}
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                textAlign: "center",
                                                fontFamily: "Arial",
                                                border: "1px solid #e5e7eb",
                                                borderRadius: 2,
                                            }}
                                        >
                                            {PTL.labHours}
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                textAlign: "center",
                                                fontFamily: "Arial",
                                                border: "1px solid #e5e7eb",
                                                borderRadius: 2,
                                            }}
                                        >
                                            {PTL.timeRemarks}
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Grid>
    );
}

export default ProposedTeachingLoadTable;