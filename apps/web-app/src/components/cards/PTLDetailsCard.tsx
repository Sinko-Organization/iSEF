import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { EducationLoader } from "../loaders";
import { trpc } from "@web-app/utils/trpc";


interface Props {
    id: string;
}

export default function PTLDetailsCard({ id }: Props) {

    // Query to get PTL data
    const { data: PTLdata, status: PTLDataStatus } = trpc.useQuery([
        "proposedTeachingLoad.get",
        { PTLId: id },
    ]);

    if (!PTLdata) {
        return <EducationLoader />
    }


    return (
        <Card style={{ maxWidth: 400, margin: 'auto' }}>
            <CardHeader
                title={"Proposed Teaching Load Details"} />
            <CardContent>
                <Typography variant="body2" color="textSecondary">
                    <strong>Teacher Id: {PTLdata.teacherId}</strong>
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    <strong>SubCode: {PTLdata.subCode}</strong>
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    <strong>Lec Hours: {PTLdata.lecHours}</strong>
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    <strong>Lab Hours: {PTLdata.labHours}</strong>
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    <strong>Remarks: {PTLdata.timeRemarks}</strong>
                </Typography>
            </CardContent>
        </Card>
    )
}