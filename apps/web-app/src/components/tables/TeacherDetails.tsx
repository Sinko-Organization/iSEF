import React from "react";
import { FC } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { inferQueryOutput as InferQueryOutput } from "@web-app/utils/trpc";
import { Formik } from "formik";


interface TeacherDetailsProps {
    teacher: InferQueryOutput<"teacher.getAll">;
}

const TeacherDetails: FC<TeacherDetailsProps> = ({ teacher }) => {
    if (!teacher || !teacher[0]) {
        return null;
    }

    const { teacherId, firstName, middleName, lastName, employment,department, birthday } = teacher[0];

    const today = new Date();
    const birthYear = new Date(birthday).getFullYear();
    const age = today.getFullYear() - birthYear;

    const formatFullName = () => {
        if (middleName) {
            return `${firstName} ${middleName}. ${lastName}`;
        }
        return `${firstName} ${lastName}`;
    };

    return (
        <Paper
            className="mt-10"
            sx={{
                boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.25)",
                borderRadius: 2,
                overflow: "hidden",
            }}
        >
            <TableContainer>
                <Table>
                    <TableBody>
                        <TableRow key={teacherId}>
                            <tbody>
                                <tr>

                                    <td className="text-left mb-4" >
                                        <b>ID Number:</b> {teacherId}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-left mb-2">
                                        <b>Age:</b> {age}
                                    </td>
                                    <td className="text-left mb-2">
                                        <b>Name:</b> {formatFullName()}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-left mb-2">
                                        <b>Employment:</b> {employment}
                                    </td>
                                    <td className="text-left mb-2">
                                        <b>Department:</b>{" "}
                                        {department}
                                    </td>
                                </tr>
                            </tbody>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default TeacherDetails;