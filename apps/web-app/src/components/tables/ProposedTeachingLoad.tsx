import { Box, Grid, SelectChangeEvent, TextField, MenuItem } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";



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



const ProposedTeachingLoadTable = ({ }) => {
    return (
        <Grid>
            <Paper
                className="mt-10"
                sx={{
                    boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.25)",
                    borderRadius: 2,
                    overflow: "hidden",
                }}>

                { }
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={cellStyle}>Subject Code</TableCell>
                                <TableCell style={cellStyle}>Subject</TableCell>
                                <TableCell style={cellStyle}>Teacher ID</TableCell>
                                <TableCell style={cellStyle}>Sections</TableCell>
                                <TableCell style={cellStyle}>Lec Hours</TableCell>
                                <TableCell style={cellStyle}>Lab Hours</TableCell>
                                <TableCell style={cellStyle}>Remarks</TableCell>
                            </TableRow>
                        </TableHead>
                    </Table>
                </TableContainer>
            </Paper>
        </Grid>
    );
}

export default ProposedTeachingLoadTable;